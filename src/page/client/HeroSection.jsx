import React from 'react';
import { Button, Carousel, Menu, Row, Col } from 'antd';
import {
    LaptopOutlined,
    MobileOutlined,
    TabletOutlined,
    AudioOutlined,
    CameraOutlined,
    HddOutlined,
    UsbOutlined,
    AppleOutlined
} from '@ant-design/icons';
import banner1 from '../../assets/10284957.jpg';
import banner2 from '../../assets/5990174.jpg';
import banner3 from '../../assets/122.jpg';
import '../style/HeroSection.css';

const { SubMenu } = Menu;

const HeroSection = () => {
    const banners = [
        {
            id: 1,
            title: "Laptop Gaming Cao Cấp",
            subtitle: "Trải nghiệm gaming đỉnh cao với hiệu năng vượt trội",
            image: banner1,
            buttonText: "Mua ngay",
        },
        {
            id: 2,
            title: "Laptop Văn Phòng",
            subtitle: "Nhẹ nhàng, mỏng gọn, hiệu năng ổn định cho công việc",
            image: banner2,
            buttonText: "Khám phá",
        },
        {
            id: 3,
            title: "Phụ Kiện Chính Hãng",
            subtitle: "Đầy đủ phụ kiện laptop với giá tốt nhất thị trường",
            image: banner3,
            buttonText: "Xem ngay",
        },
    ];

    const categories = [
        {
            key: 'laptop',
            icon: <LaptopOutlined />,
            label: 'Laptop & Máy tính',
            children: [
                { key: 'gaming', label: 'Laptop Gaming' },
                { key: 'office', label: 'Laptop Văn phòng' },
                { key: 'ultrabook', label: 'Ultrabook/Macbook' },
                { key: 'workstation', label: 'Máy trạm' },
            ],
        },
        {
            key: 'phone',
            icon: <MobileOutlined />,
            label: 'Điện thoại',
            children: [
                { key: 'smartphone', label: 'Smartphone' },
                { key: 'tablet', label: 'Máy tính bảng' },
                { key: 'accessory', label: 'Phụ kiện' },
            ],
        },
        {
            key: 'components',
            icon: <HddOutlined />,
            label: 'Linh kiện PC',
        },
        {
            key: 'audio',
            icon: <AudioOutlined />,
            label: 'Âm thanh',
        },
        {
            key: 'peripheral',
            icon: <UsbOutlined />,
            label: 'Thiết bị ngoại vi',
        },
        {
            key: 'camera',
            icon: <CameraOutlined />,
            label: 'Camera & An ninh',
        },
    ];

    return (
        <div className="modern-hero-container">
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <div className="modern-category-filter">
                        <div className="filter-header">
                            <h3 className="filter-title">
                                <span className="title-icon">☰</span>
                                DANH MỤC SẢN PHẨM
                            </h3>
                        </div>
                        <Menu
                            mode="inline"
                            defaultOpenKeys={['laptop', 'phone']}
                            className="category-menu"
                        >
                            {categories.map(category => (
                                category.children ? (
                                    <SubMenu
                                        key={category.key}
                                        icon={category.icon}
                                        title={category.label}
                                        className="menu-item"
                                    >
                                        {category.children.map(child => (
                                            <Menu.Item key={child.key} className="submenu-item">
                                                {child.label}
                                            </Menu.Item>
                                        ))}
                                    </SubMenu>
                                ) : (
                                    <Menu.Item
                                        key={category.key}
                                        icon={category.icon}
                                        className="menu-item"
                                    >
                                        {category.label}
                                    </Menu.Item>
                                )
                            ))}
                        </Menu>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                    <Carousel
                        autoplay
                        effect="fade"
                        className="modern-hero-carousel"
                        dotPosition="bottom"
                    >
                        {banners.map((banner) => (
                            <div key={banner.id} className="hero-slide">
                                <div
                                    className="hero-image"
                                    style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), url(${banner.image})`}}
                                >
                                    <div className="hero-content">
                                        <h1 className="hero-title">{banner.title}</h1>
                                        <p className="hero-subtitle">{banner.subtitle}</p>
                                        <div className="hero-buttons">
                                            <Button
                                                type="primary"
                                                size="large"
                                                shape="round"
                                                className="primary-button"
                                            >
                                                {banner.buttonText}
                                            </Button>
                                            <Button
                                                size="large"
                                                shape="round"
                                                className="secondary-button"
                                            >
                                                Tìm hiểu thêm
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </Col>
            </Row>
        </div>
    );
};

export default HeroSection;