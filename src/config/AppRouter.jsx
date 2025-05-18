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

export function AppRouter() {
    return (
        <>
            <Header />
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<HomeScreen />} />
                <Route path="/result" element={<OrderSuccess />} />
                <Route path="/checkout" element={<CheckoutConfirmation />} />
                <Route path="/cart/:id" element={<CartPage />} />
                <Route path="/test" element={<LaptopDetail />} />
                <Route path="/voucher" element={<VoucherPage />} />
                <Route path="/history/:id" element={<PurchaseHistory />} />
                <Route
                    path="/admin/*"
                    element={
                        <PrivateRoute>
                            <AdminLayout />
                        </PrivateRoute>
                    }
                />
            </Routes>
            <Footer />
        </>
    );
}
