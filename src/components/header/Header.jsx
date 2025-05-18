import React, {useState, useEffect, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Badge, Button, Input, Carousel, Dropdown, Menu, notification} from 'antd';
import {
    Menu as MenuIcon,
    Search,
    User,
    Heart,
    ShoppingCart,
    ChevronDown,
    Phone,
    LogOut,
    TicketPercent,
    Key,
    History,
} from 'lucide-react';
import './Header.css';
import logo from '../../assets/log.jpg';
import LoginModal from "../../page/account/LoginModal";
import RegisterModal from "../../page/account/RegisterModal";
import ChangePasswordModal from "../../page/account/ChangePasswordModal";
import {NotificationContext} from "../NotificationProvider";
const Header = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
    const [userData, setUserData] = useState(() => {
        const savedUser = localStorage.getItem('USER_LOGIN');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const navigate = useNavigate();
    const notification = useContext(NotificationContext);

    const handleLoginClick = () => {
        setShowLoginModal(true);
        setShowRegisterModal(false);
    };

    const closeLoginModal = () => {
        setShowLoginModal(false);
    };

    const closeRegisterModal = () => {
        setShowRegisterModal(false);
    };

    const switchToRegister = () => {
        setShowLoginModal(false);
        setShowRegisterModal(true);
    };

    const switchToLogin = () => {
        setShowRegisterModal(false);
        setShowLoginModal(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('USER_LOGIN');
        localStorage.removeItem('TOKEN');
        setUserData(null);
        navigate('/');
    };

    const toggleChangePasswordModal = () => {
        setIsChangePasswordModalOpen(!isChangePasswordModalOpen);
    };

    const handleLoginSuccess = (userData) => {
        setUserData(userData);
        setShowLoginModal(false);
    };

    const handleRegisterSuccess = () => {
        setShowRegisterModal(false);
        setShowLoginModal(true);
    };

    // User dropdown menu
    const userMenu = (
        <Menu>
            <Menu.Item key="profile" icon={<User size={16} />}>
                <Link to="/account/profile">Thông tin tài khoản</Link>
            </Menu.Item>
            <Menu.Item
                key="orders"
                icon={<History size={16} />}
                onClick={() => window.location.href = `/history/${userData.id}`}
            >
                Lịch sử mua hàng
            </Menu.Item>
            <Menu.Item
                key="change-password"
                icon={<Key size={16} />}
                onClick={toggleChangePasswordModal}
            >
                Đổi mật khẩu
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
                key="logout"
                icon={<LogOut size={16} />}
                onClick={handleLogout}
            >
                Đăng xuất
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            {/* Top Bar */}
            <div className="top-bar">
                <div className="container">
                    <div className="top-links">
                        <span className="contact-link">
                            <Phone className="phone-icon" />
                            Hotline: 1800-123-4567
                        </span>
                        <Link to="/stores" className="top-link">Cửa hàng</Link>
                        <Link to="/policy" className="top-link">Chính sách</Link>
                    </div>

                    <div className="auth-links">
                        {userData ? (
                            <span className="welcome-message">
                                Xin chào, <strong>{userData.fullName || userData.email}</strong>
                            </span>
                        ) : (
                            <>
                                <span className="top-link" onClick={handleLoginClick}>Đăng nhập</span>
                                <span className="divider">|</span>
                                <span className="top-link" onClick={switchToRegister}>Đăng ký</span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className="main-header">
                <div className="container">
                    <div className="header-left">
                        <Button type="text" className="mobile-menu-button">
                            <MenuIcon className="menu-icon" />
                        </Button>

                        <Link to="/" className="logo-link">
                            <img
                                src={logo}
                                alt="TechLaptop Logo"
                                className="logo-image"
                            />
                            <span className="logo-text">TechLaptop</span>
                        </Link>
                    </div>

                    <div className="search-container">
                        <div className="search-wrapper">
                            <Search className="search-icon" />
                            <Input
                                placeholder="Tìm kiếm laptop, phụ kiện..."
                                className="search-input"
                            />
                        </div>
                    </div>

                    <div className="header-right">
                        {userData ? (
                            <Dropdown overlay={userMenu} placement="bottomRight">
                                <Button type="text" className="header-icon">
                                    <User className="icon" />
                                </Button>
                            </Dropdown>
                        ) : (
                            <Button
                                type="text"
                                className="header-icon"
                                onClick={handleLoginClick}
                            >
                                <User className="icon" />
                            </Button>
                        )}

                        <Button
                            type="text"
                            className="header-icon"
                            onClick={() => {
                                window.location.href = `/voucher`;
                            }}
                        >
                            <TicketPercent className="icon" />
                        </Button>

                        <Button
                            type="text"
                            className="cart-button"
                            onClick={() => {
                                if (!userData?.id) {
                                    notification.error({
                                        message: 'Thông báo',
                                        description: `Vui lòng đăng nhập!`,
                                        placement: 'topRight',
                                    });
                                    return;
                                }
                                window.location.href = `/cart/${userData.id}`;
                            }}
                        >
                            <Badge count={3} className="cart-badge">
                                <ShoppingCart className="icon" />
                            </Badge>
                        </Button>

                    </div>
                </div>

                {/* Navigation */}

            </header>

            {/* Hero Banner with Carousel */}


            {/* Authentication Modals */}
            <LoginModal
                isOpen={showLoginModal}
                onClose={closeLoginModal}
                onSwitchToRegister={switchToRegister}
                onLoginSuccess={handleLoginSuccess}
            />

            <RegisterModal
                isOpen={showRegisterModal}
                onClose={closeRegisterModal}
                onSwitchToLogin={switchToLogin}
                onRegisterSuccess={handleRegisterSuccess}
            />

            <ChangePasswordModal
                isOpen={isChangePasswordModalOpen}
                onClose={toggleChangePasswordModal}
            />
        </>
    );
};

export default Header;