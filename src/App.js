import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./components/Contact/Contact";
import NotFound from "./pages/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Provider } from "react-redux";
import store from "./redux/store";
import AdminDashboard from "./admin/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";
import CreatePost from "./admin/CreatePost";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import Layout from "./admin/global/Layout";
import EditPost from "./admin/EditPost";
import UserDashboard from "./user/UserDashboard";
//main
import BlogHome from "./pages/BlogHome";
import BlogPro from "./pages/BlogPro";
import SinglePro from "./pages/SinglePro";
import CreateProduct from "./admin/CreateProduct";
import EditProduct from "./admin/EditProduct";
import BuyContact from "./components/BuyContact";
import { useState } from "react";
import CreateItem from "./admin/CreateItem";
import EditItem from "./admin/EditItem";
import Products from "./pages/Products";
import CreateGallery from "./admin/CreateGallery";
import EditGallery from "./admin/EditGallery";
import ProductCart from "./components/Products/ProductCart";
import AdminLogin from "./pages/AdminLogin";
import LoginUser from "./pages/LoginSeller";
import CheckOut from "./pages/CheckOut";
import ShowUsers from "./pages/ShowUsers";
import { CartProvider } from "./hooks";
import Header from "./components/Shared/Header/Header";
import CartComponent from "./components/CartComponent";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./AuthContext";
import OrderSingle from "./admin/OrderSingle";
import Seller from "./components/Seller";
import Users from "./admin/Users/Users";
import Bkash from "./pages/Bkash";
import Dashboard from "./pages/Pos/Dashboard";
import Sales from "./pages/Pos/Sales/Sales";
import BarcodePrint from "./pages/Pos/BarcodePrint/BarcodePrint";
import SalesReport from "./pages/Pos/SalesReport/SalesReport";
import SalesCancel from "./pages/Pos/SalesCancel/SalesCancel";
import CustomerReport from "./pages/Pos/CustomerReport/CustomerReport";
import VatReport from "./pages/Pos/VatReport/VatReport";
import StockReport from "./pages/Pos/StockReport/StockReport";
import InvoiceReprint from "./pages/Pos/InvoiceReprint/InvoiceReprint";
import ShopReceive from "./pages/Pos/ShopReceive/ShopReceive";
import SupllierReturn from "./pages/Pos/SupllierReturn/SupllierReturn";
import EmployeeSetup from "./pages/Pos/EmployeeSetup/EmployeeSetup";
import CustomerSetup from "./pages/Pos/CustomerSetup/CustomerSetup";
import CustomerCreditCollection from "./pages/Pos/CustomerCreditCollection/CustomerCreditCollection";
import UserPermission from "./pages/Pos/UserPermission/UserPermission";
import UserManagement from "./pages/Pos/UserManagement/UserManagement";
import Attendance from "./pages/Pos/Attendance/Attendance";
import Counter from "./pages/Pos/Counter/Counter";
import Settings from "./pages/Pos/Settings/Settings";
import GroupSetup from "./pages/Pos/GroupSetup/GroupSetup";
import BrandSetup from "./pages/Pos/BrandSetup/BrandSetup";
import ProductInformation from "./pages/Pos/ProductInformation/ProductInformation";
import CreateTopBanner from "./admin/CreateTopBanner";
import SupplierSetup from "./pages/Pos/SupplierSetup/SupplierSetup";
import ShopProductAssigner from "./admin/ShopProductAssigner";
import ShopProductList from "./admin/ShopProductList";
import CreateWarehouseProduct from "./admin/CreateWarehouseProduct";
import WarehouseSale from "./pages/Pos/Sales/WarehouseSale";
import WarehouseSales from "./admin/WarehouseSales";
import SubBarcodeImage from "./pages/Pos/SubBarcodeImage/SubBarcodeImage";
import Booking from "./pages/Pos/Sales/Booking";
import ProductsShow from "./pages/ProductsShow";
import ProductsByBrand from "./pages/ProductsByBrand";
import ProductGroupByTitle from "./pages/ProductGroupByTitle";
import ProductByCategory from "./pages/ProductsByCategory";
import TopBrands from "./components/TopBrands/TopBrands";
import NewArrival from "./components/NewArrival/NewArrival";
import Stitched from "./components/Stitched/Stitched";
import Unstitched from "./components/Unstitched/Unstitched";
import PosRoute from "./PosRoute";
import ProductsShowList from "./pages/ProductsShowList";
import BadhundharaSales from "./pages/Pos/Sales/BadhundharaSales";
import Stock from "./pages/Pos/StockReport/Stock";

//HOC
const AdminDashboardHOC = Layout(AdminDashboard);

const CreatePostHOC = Layout(CreatePost);
const CreateWarehouseProductHOC = Layout(CreateWarehouseProduct);
const WarehouseSalesHOC = Layout(WarehouseSales);
const CreateItemHOC = Layout(CreateItem);
const CreateProductHOC = Layout(CreateProduct);
const CreateTopBannerHOC = Layout(CreateTopBanner);
const ProductAssignToShopHOC = Layout(ShopProductAssigner);
const ShopProductListHOC = Layout(ShopProductList);

const CreateGalleryHOC = Layout(CreateGallery);
const EditPostHOC = Layout(EditPost);
const EditItemHOC = Layout(EditItem);
const EditProductHOC = Layout(EditProduct);
const EditGalleryHOC = Layout(EditGallery);
const UserDashboardHOC = Layout(UserDashboard);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <ProSidebarProvider>
              {/* <ScrollButton /> */}
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <CartProvider>
                        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                      </CartProvider>
                      <Home searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    </>
                  }
                ></Route>
                <Route
                  path="/home"
                  element={
                    <>
                      <CartProvider>
                        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                      </CartProvider>
                      <Home searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                    </>
                  }
                ></Route>
                <Route
                  path="/products-gallery/:title"
                  element={
                    <>
                      <CartProvider>
                        <Header  searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                      </CartProvider>
                      <ProductGroupByTitle />
                    </>
                  }
                ></Route>
                <Route
                  path="/category/top-brands"
                  element={
                    <>
                      <CartProvider>
                        <Header  searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                      </CartProvider>
                      <TopBrands />
                    </>
                  }
                ></Route>
                <Route
                  path="/category/new-arrival"
                  element={
                    <>
                      <CartProvider>
                        <Header  searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                      </CartProvider>
                      <NewArrival />
                    </>
                  }
                ></Route>
                <Route
                  path="/category/stitched"
                  element={
                    <>
                      <CartProvider>
                        <Header  searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                      </CartProvider>
                      <Stitched />
                    </>
                  }
                ></Route>
                <Route
                  path="/category/unstitched"
                  element={
                    <>
                      <CartProvider>
                        <Header  searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                      </CartProvider>
                      <Unstitched />
                    </>
                  }
                ></Route>

                <Route path="/category/top-brands" element={<TopBrands />} />
                <Route path="/category/new-arrival" element={<NewArrival />} />
                <Route path="/category/stitched" element={<Stitched />} />
                <Route path="/category/unstitched" element={<Unstitched />} />


                {/* <Route path="/products/show" element={<ProductsShow />} /> */}
                <Route
                  path="/products/brand/:brand"
                  element={<ProductsByBrand />}
                />
                <Route
                  path="/product-list"
                  element={<ProductsShowList />}
                />
                <Route
                  path="/products-category"
                  element={<ProductByCategory />}
                />
                <Route
                  path="/products-gallery/:title"
                  element={<ProductGroupByTitle />}
                />

                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/seller-login" element={<LoginUser />}></Route>
                <Route path="/seller" element={<Seller />} />
                <Route path="/users" element={<Users />} />
                <Route path="/bkash-payment" element={<Bkash />} />
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                <Route path="/warehouse-sale" element={<WarehouseSale />} />

                {/* pos start */}
                {/* <Route path="/pos" element={<Dashboard />} /> */}
                {/* <Route
                  path="/pos"
                  element={
                    <PosRoute>
                      <Dashboard />
                    </PosRoute>
                  }
                /> */}

                {/* <Route path="/sales" element={<Sales />} />
                <Route path="/badhundhara-sales" element={<BadhundharaSales />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/barcode-print" element={<BarcodePrint />} />
                <Route
                  path="/sub-barcode-print"
                  element={<SubBarcodeImage />}
                /> */}
                {/* <Route path="/sales-report" element={<SalesReport />} />
                <Route path="/sales-cancel" element={<SalesCancel />} />
                <Route path="/customer-report" element={<CustomerReport />} />
                <Route path="/vat-report" element={<VatReport />} />
                <Route path="/stock-report" element={<StockReport />} />
                <Route path="/invoice-reprint" element={<InvoiceReprint />} />
                <Route path="/shop-receive" element={<ShopReceive />} />
                <Route path="/supplier-return" element={<SupllierReturn />} />
                <Route path="/employee-setup" element={<EmployeeSetup />} />
                <Route path="/customer-setup" element={<CustomerSetup />} />
                <Route
                  path="/credit-collection"
                  element={<CustomerCreditCollection />}
                /> */}
                {/* <Route path="/user-permission" element={<UserPermission />} />
                <Route path="/user-management" element={<UserManagement />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/counter" element={<Counter />} />
                <Route path="/settings" element={<Settings />} /> */}
                <Route path="/group-setup" element={<GroupSetup />} />
                <Route path="/brand-setup" element={<BrandSetup />} />
                <Route
                  path="/product-information"
                  element={<ProductInformation />}
                />
                <Route path="/supplier-setup" element={<SupplierSetup />} />

                 <Route path="/stock" element={<Stock />} />

                {/* pos end */}

                <Route path="/admin-login" element={<AdminLogin />}></Route>
                <Route path="/show-users" element={<ShowUsers />}></Route>
                <Route path="/order-single" element={<OrderSingle />}></Route>
                {/* <Route path="/product-assign-to-shop" element={<ShopProductAssigner />}></Route> */}

                <Route path="/" element={<BlogHome />} />
                <Route path="/bloghome" element={<BlogPro  searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>} />
                <Route path="/buycontact" element={<BuyContact />} />
                <Route path="/product-sample" element={<ProductCart />} />
                <Route
                  path="/checkout"
                  element={
                    <PrivateRoute>
                      <CartProvider>
                        <CheckOut />
                      </CartProvider>
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/login"
                  element={
                    <LogIn
                      element={
                        <LogIn setIsAuthenticated={setIsAuthenticated} />
                      }
                    />
                  }
                />
                <Route path="/register" element={<Register />} />

                <Route path="/medicine" element={<Products />} />

                <Route
                  path="/products/show"
                  element={
                    <CartProvider>
                      <Header  searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                
                      <ProductsShow/>
                    </CartProvider>
                    
                  }
                />
                <Route
                  path="/product/:id"
                  element={
                    <CartProvider>
                      <Header  searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                      <SinglePro />
                    </CartProvider>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <PrivateRoute>
                      <CartProvider>
                        <Header  searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                        <CartComponent />
                      </CartProvider>
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminRoute>
                      <AdminDashboardHOC />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/admin/post/create"
                  element={
                    <AdminRoute>
                      <CreatePostHOC />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/admin/warehouse-product/create"
                  element={
                    <AdminRoute>
                      <CreateWarehouseProductHOC />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/admin/item/create"
                  element={
                    <AdminRoute>
                      <CreateItemHOC />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/admin/product/create"
                  element={
                    <AdminRoute>
                      <CreateProductHOC />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/topBanner/create"
                  element={
                    <AdminRoute>
                      <CreateTopBannerHOC />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/admin/products/assign-products-to-shop"
                  element={
                    <AdminRoute>
                      <ProductAssignToShopHOC />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/shop-products-list"
                  element={
                    <AdminRoute>
                      <ShopProductListHOC />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/admin/gallery/create"
                  element={
                    <AdminRoute>
                      <CreateGalleryHOC />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/admin/post/edit/:id"
                  element={
                    <AdminRoute>
                      <EditPostHOC />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/item/edit/:id"
                  element={
                    <AdminRoute>
                      <EditItemHOC />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/product/edit/:id"
                  element={
                    <AdminRoute>
                      <EditProductHOC />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/gallery/edit/:id"
                  element={
                    <AdminRoute>
                      <EditGalleryHOC />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/user/dashboard"
                  element={
                    <UserRoute>
                      <UserDashboardHOC />
                    </UserRoute>
                  }
                />
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            </ProSidebarProvider>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
