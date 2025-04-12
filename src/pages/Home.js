import NavBar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import Footer from "../features/common/Footer";
import BottomNav from "../features/common/BottomNav";

function Home() {
    return ( 
        <div className="pb-16">
            <NavBar>
                <ProductList></ProductList>
            </NavBar>
            <Footer></Footer>
            <BottomNav />
        </div>
     );
}

export default Home;