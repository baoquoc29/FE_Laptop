import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AdminLayout from "../layouts/AdminLayout";
import Header from "../components/header/Header";
import HomeScreen from "../page/client/HomeScreen";
import CartPage from "../page/client/CartPage";
import Footer from "../components/footer/Footer"; // Đảm bảo bạn có file Footer riêng
import '../App.scss';
import PurchaseHistory from "../page/client/PurchaseHistory";
import OrderSuccess from "../page/client/OrderSuccess";
import CheckoutConfirmation from "../page/client/CheckoutConfirmation";
import LaptopDetail from "../page/client/LaptopDetail";
import VoucherPage from "../page/client/VoucherPage";
import LaptopGrid from "../page/client/LaptopGrid";
import DialogflowMessenger from "../page/client/DialogflowMessenger";
import Dashboard from '../page/admin/dashboard/Dashbarđ';
import BrandManagement from '../page/admin/brand/BrandManagement';
import CategoryManagement from '../page/admin/category/CategoryManagement';
import ChatManager from "../page/admin/ChatManager";
import DiscountManagement from '../page/admin/discount/DiscountManagement';
import UserManagement from '../page/admin/user/UserManagement';
import ProductManagement from '../page/admin/product/ProductManagement';
import CreateProduct from '../page/admin/product/CreateProduct';
import OrderManagement from '../page/admin/order/OrderManagement';
import AdminProductDetail from '../page/admin/product/AdminProductDetail';

export function AppRouter() {
   return (
    <Routes>
      {/* User Routes with Header and Footer */}
      <Route
        path="/*"
        element={
          <>
            <Header />
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/result" element={<OrderSuccess />} />
                <Route path="/checkout" element={<CheckoutConfirmation />} />
                <Route path="/cart/:id" element={<CartPage />} />
                <Route path="/products/:id" element={<LaptopDetail />} />
                <Route path="/voucher" element={<VoucherPage />} />
                <Route path="/history/:id" element={<PurchaseHistory />} />
                <Route path="/search/:text" element={<LaptopGrid />} />
                <Route path="/search" element={<LaptopGrid />} />
                <Route path="/test" element={<DialogflowMessenger />} />
            </Routes>
            <Footer />
          </>
        }
      />
      {/* Admin Routes with AdminLayout */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute >
            <AdminLayout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/brands" element={<BrandManagement />} />
                <Route path="/categories" element={<CategoryManagement />} />
                <Route path="/discounts" element={<DiscountManagement />} />
                <Route path="/users" element={<UserManagement />} />
                <Route path="/laptops" element={<ProductManagement />} />
                <Route path="/laptops/create" element={<CreateProduct />} />
                <Route path= "/categories" element={<CategoryManagement />} />
                <Route path= "/message" element={<ChatManager />} />
                <Route path= "/laptops/detail/:id" element={<AdminProductDetail />} />
                <Route path="/orders" element={<OrderManagement />} />
              </Routes>
            </AdminLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
