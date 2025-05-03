import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo, updateUserAsync } from '../userSlice';
import { useForm } from 'react-hook-form';

export default function UserProfile() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [selectedViewIndex, setSelectedViewIndex] = useState(-1);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }; // for shallow copy issue
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  };
  const handleRemove = (e, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }; // for shallow copy issue
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    const address = userInfo.addresses[index];
    setValue('name', address.name);
    setValue('email', address.email);
    setValue('city', address.city);
    setValue('state', address.state);
    setValue('pinCode', address.pinCode);
    setValue('phone', address.phone);
    setValue('street', address.street);
  };

  const handleAdd = (address) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses, address] };
    dispatch(updateUserAsync(newUser));
    setShowAddAddressForm(false);
  };
  console.log(userInfo)
  return (
    <div className="bg-gray-50 min-h-screen py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Profile Information</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Personal information and address details.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {userInfo.email}
                </dd>
              </div>
              {userInfo.role === 'admin' && (
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Role</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <span className="inline-flex rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
                      {userInfo.role}
                    </span>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Your Addresses</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Manage your shipping and billing addresses.
              </p>
            </div>
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <button
                  onClick={(e) => {
                    setShowAddAddressForm(true);
                    setSelectedEditIndex(-1);
                  }}
                  type="submit"
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <svg className="-ml-0.5 mr-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add New Address
                </button>
              </div>
            </div>
          </div>
          {showAddAddressForm ? (
            <div className="mt-8">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <form
                    noValidate
                    onSubmit={handleSubmit((data) => {
                      handleAdd(data);
                      reset();
                    })}
                  >
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                          Full name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register('name', {
                              required: 'name is required',
                            })}
                            id="name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        {errors.name && (
                          <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            type="email"
                            {...register('email', {
                              required: 'email is required',
                            })}
                            id="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        {errors.email && (
                          <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                          Phone number
                        </label>
                        <div className="mt-2">
                          <input
                            type="tel"
                            {...register('phone', {
                              required: 'phone is required',
                            })}
                            id="phone"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        {errors.phone && (
                          <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register('street', {
                              required: 'street is required',
                            })}
                            id="street"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        {errors.street && (
                          <p className="mt-2 text-sm text-red-600">{errors.street.message}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-2">
                          <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register('city', {
                                required: 'city is required',
                              })}
                              id="city"
                              autoComplete="address-level2"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          {errors.city && (
                            <p className="mt-2 text-sm text-red-600">{errors.city.message}</p>
                          )}
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                            State / Province
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register('state', {
                                required: 'state is required',
                              })}
                              id="state"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          {errors.state && (
                            <p className="mt-2 text-sm text-red-600">{errors.state.message}</p>
                          )}
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                            ZIP / Postal code
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register('pinCode', {
                                required: 'pinCode is required',
                              })}
                              id="pinCode"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          {errors.pinCode && (
                            <p className="mt-2 text-sm text-red-600">{errors.pinCode.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedEditIndex(-1);
                          }}
                          type="button"
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Save Address
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : null}

          <p className="mt-0.5 text-sm text-gray-500">Your Addresses :</p>
          {userInfo.addresses.map((address, index) => (
            <div key={index}>
              {selectedEditIndex === index ? (
                <form
                  className="bg-white px-5 py-12 mt-12"
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    handleEdit(data, index);
                    reset();
                  })}
                >
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                        Personal Information
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Use a permanent address where you can receive mail.
                      </p>

                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Full name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register('name', {
                                required: 'name is required',
                              })}
                              id="name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.name && (
                              <p className="text-red-500">{errors.name.message}</p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-4">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              {...register('email', {
                                required: 'email is required',
                              })}
                              type="email"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.email && (
                              <p className="text-red-500">{errors.email.message}</p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Phone
                          </label>
                          <div className="mt-2">
                            <input
                              id="phone"
                              {...register('phone', {
                                required: 'phone is required',
                              })}
                              type="tel"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.phone && (
                              <p className="text-red-500">{errors.phone.message}</p>
                            )}
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="street-address"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Street address
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register('street', {
                                required: 'street is required',
                              })}
                              id="street"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.street && (
                              <p className="text-red-500">
                                {errors.street.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register('city', {
                                required: 'city is required',
                              })}
                              id="city"
                              autoComplete="address-level2"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.city && (
                              <p className="text-red-500">{errors.city.message}</p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="state"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            State / Province
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register('state', {
                                required: 'state is required',
                              })}
                              id="state"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.state && (
                              <p className="text-red-500">{errors.state.message}</p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="pinCode"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            ZIP / Postal code
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register('pinCode', {
                                required: 'pinCode is required',
                              })}
                              id="pinCode"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.pinCode && (
                              <p className="text-red-500">
                                {errors.pinCode.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        onClick={(e) => setSelectedEditIndex(-1)}
                        type="submit"
                        className="rounded-md px-3 py-2 text-sm font-semibold text-grey shadow-sm hover:bg-grey-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Edit Address
                      </button>
                    </div>
                  </div>
                </form>
              ) : null}
              <div 
                className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200 cursor-pointer hover:bg-gray-50"
                onClick={() => setSelectedViewIndex(selectedViewIndex === index ? -1 : index)}
              >
                <div className="flex gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {address.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.street}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.pinCode}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    Phone: {address.phone}
                  </p>
                  <p className="text-sm leading-6 text-gray-500">
                    {address.city}
                  </p>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditForm(index);
                    }}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(e, index);
                    }}
                    type="button"
                    className="font-medium text-red-600 hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
              {/* Full address details when clicked */}
              {selectedViewIndex === index && (
                <div className="mt-2 mb-4 p-4 bg-gray-50 rounded-md border border-gray-200 ml-5 mr-5">
                  <h3 className="text-md font-medium text-gray-900 mb-2">Full Address Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name:</p>
                      <p className="text-sm font-medium">{address.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email:</p>
                      <p className="text-sm font-medium">{address.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone:</p>
                      <p className="text-sm font-medium">{address.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Street:</p>
                      <p className="text-sm font-medium">{address.street}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">City:</p>
                      <p className="text-sm font-medium">{address.city}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">State:</p>
                      <p className="text-sm font-medium">{address.state}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">PIN Code:</p>
                      <p className="text-sm font-medium">{address.pinCode}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
