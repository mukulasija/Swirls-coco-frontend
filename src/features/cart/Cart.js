import { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteItemFromCartAsync,
  selectCartLoaded,
  selectCartStatus,
  selectItems,
  updateCartAsync,
} from './cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Grid } from 'react-loader-spinner';
import Modal from '../common/Modal';
import { toast } from 'react-toastify';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector(selectItems);
  const status = useSelector(selectCartStatus);
  const cartLoaded = useSelector(selectCartLoaded)
  const [openModal, setOpenModal] = useState(null);
  const [stockIssues, setStockIssues] = useState([]);

  useEffect(() => {
    // Validate stock levels when cart items load
    if (items.length > 0) {
      const issues = [];
      
      items.forEach(item => {
        if (item.product.stock === 0) {
          issues.push({ id: item.id, message: `${item.product.title} is out of stock`, severity: 'error' });
        } else if (item.quantity > item.product.stock) {
          issues.push({ 
            id: item.id, 
            message: `Only ${item.product.stock} units of ${item.product.title} available`, 
            severity: 'warning' 
          });
          
          // Auto-adjust quantity to available stock
          dispatch(updateCartAsync({id: item.id, quantity: item.product.stock}));
        }
      });
      
      setStockIssues(issues);
      
      // Show toast notifications for stock issues
      issues.forEach(issue => {
        if (issue.severity === 'error') {
          toast.error(issue.message);
        } else {
          toast.warning(issue.message);
        }
      });
    }
  }, [items, dispatch]);

  const totalAmount = items.reduce(
    (amount, item) => item.product.discountPrice * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, item) => {
    const newQuantity = +e.target.value;
    
    // Check if the new quantity exceeds available stock
    if (newQuantity > item.product.stock) {
      toast.error(`Only ${item.product.stock} items available in stock`);
      return;
    }
    
    dispatch(updateCartAsync({id:item.id, quantity: newQuantity}));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  // Check if any items have stock issues that would prevent checkout
  const hasStockIssues = stockIssues.some(issue => issue.severity === 'error');

  return (
    <>
      {!items.length && cartLoaded && <Navigate to="/" replace={true}></Navigate>}

      <div className="min-h-screen bg-pink-50">
        <div className="mx-auto mt-6 sm:mt-12 bg-white max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
              Cart
            </h1>
            <div className="flow-root">
              {status === 'loading' ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-pink-100 backdrop-blur-sm">
                  <div className="flex flex-col items-center space-y-4">
                    <Grid
                      height="80"
                      width="80"
                      color="#EC4899"
                      ariaLabel="grid-loading"
                      radius="12.5"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                    <div className="text-xl font-semibold text-pink-900">
                      Loading Cart...
                    </div>
                    <div className="text-sm text-pink-500">
                      Please wait while we fetch your cart items
                    </div>
                  </div>
                </div>
              ) : null}
              <ul className="space-y-4 sm:space-y-6">
                {items.map((item) => {
                  // Check if this item has stock issues
                  const stockIssue = stockIssues.find(issue => issue.id === item.id);
                  const isOutOfStock = item.product.stock === 0;
                  
                  return (
                  <li key={item.id} className="flex py-6">
                    <div className="h-32 w-32 sm:h-40 sm:w-40 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 sm:ml-6 flex flex-1 flex-col">
                      <div>
                        <div className="flex flex-col">
                          <div className="flex justify-between items-center">
                            <h3 className="text-sm sm:text-base text-gray-700 font-medium">
                              <a href={item.product.id}>{item.product.title}</a>
                            </h3>
                          </div>
                          <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500">
                            <span className="mr-1">Rs. {item.product.discountPrice}</span>
                            <span className="mx-1">×</span>
                            <span className="mx-1">{item.quantity}</span>
                            <span className="mx-1">=</span>
                            <span className="font-medium text-pink-900">Rs. {item.product.discountPrice * item.quantity}</span>
                          </div>
                        </div>
                        {stockIssue && (
                          <div className="mt-2 px-3 py-2 rounded-md">
                            <p className={`text-sm ${stockIssue.severity === 'error' ? 'text-pink-700 bg-pink-50' : 'text-pink-600 bg-pink-50'}`}>
                              {stockIssue.message}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <label
                            htmlFor="quantity"
                            className="text-sm font-medium text-gray-900"
                          >
                            Qty
                          </label>
                          <select
                            onChange={(e) => handleQuantity(e, item)}
                            value={item.quantity}
                            disabled={isOutOfStock}
                            className={`
                              rounded-md border-pink-300 py-1 px-2 text-sm sm:text-base
                              ${isOutOfStock ? 'bg-pink-50 cursor-not-allowed' : 'bg-white'}
                            `}
                          >
                            {[...Array(Math.min(5, item.product.stock || 1)).keys()].map(num => (
                              <option key={num + 1} value={num + 1}>
                                {num + 1}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex items-center space-x-4">
                          <Modal
                            title={`Delete ${item.product.title}`}
                            message="Are you sure you want to delete this Cart item?"
                            dangerOption="Delete"
                            cancelOption="Cancel"
                            dangerAction={(e) => handleRemove(e, item.id)}
                            cancelAction={() => setOpenModal(null)}
                            showModal={openModal === item.id}
                          />
                          <button
                            onClick={(e) => setOpenModal(item.id)}
                            type="button"
                            className="text-sm sm:text-base font-medium text-pink-600 hover:text-pink-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                )})}
              </ul>
            </div>
          </div>

          <div className="border-t border-pink-200 bg-pink-50 px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-2 text-lg font-medium text-pink-900">
              <p>Subtotal</p>
              <p>Rs. {totalAmount}</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-2 text-lg font-medium text-pink-900">
              <p>Total Items in Cart</p>
              <p>{totalItems} items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            {hasStockIssues && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">
                  Some items in your cart are out of stock. Please remove them before proceeding to checkout.
                </p>
              </div>
            )}
            <div className="mt-6">
              <button
                type="button"
                className="mt-6 w-full sm:w-auto px-6 py-3 text-base font-medium text-white bg-pink-600 rounded-md shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                onClick={() => navigate('/checkout')}
                disabled={hasStockIssues}
              >
                {hasStockIssues ? 'Resolve Stock Issues' : 'Proceed to Checkout'}
              </button>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row justify-center items-center text-center text-sm text-gray-500 space-y-2 sm:space-y-0">
              <p>
                or
                <br></br>
                <Link to="/">
                  <button
                    type="button"
                    className="font-medium text-pink-600 hover:text-pink-500"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
