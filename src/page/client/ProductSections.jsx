import React from 'react';
import {Zap, Star, Clock, Heart} from 'lucide-react';
import '../style/ProductSections.css';
import {Badge, Button, Card, Image, Tabs} from "antd";
import source1 from "../../assets/gaming.jfif";
import source2 from "../../assets/dh.jpg";
import source3 from "../../assets/mongnhe.jpg";
import source4 from "../../assets/vanphong.jpg";
const ProductSections = () => {
    // Flash Sale Products
    const flashSaleProducts = [
        { id: 1, name: "Laptop Gaming ABC XYZ i7-12700H RTX 3070 16GB 1TB", price: 24990000, oldPrice: 29990000, rating: 4.9, sold: 120, discount: 20 },
        { id: 2, name: "Laptop Gaming DEF GHI i5-12500H RTX 3060 16GB 512GB", price: 18990000, oldPrice: 22990000, rating: 4.7, sold: 200, discount: 15 },
        { id: 3, name: "Laptop Ultrabook KLM NOP i7-1260P Iris Xe 16GB 512GB", price: 22990000, oldPrice: 25990000, rating: 4.8, sold: 85, discount: 10 },
        { id: 4, name: "Laptop Workstation QRS TUV i9-13900H RTX 4080 32GB 2TB", price: 44990000, oldPrice: 49990000, rating: 4.9, sold: 45, discount: 25 }
    ];

    // Featured Products
    const bestsellerProducts = Array(8).fill().map((_, i) => ({
        id: i+1,
        name: `Laptop Gaming Model ${i+1} i7-12700H RTX 3070 16GB 1TB`,
        price: 24990000 - (i * 1000000),
        oldPrice: 29990000 - (i * 1000000),
        rating: 4.9 - (i * 0.1),
        sold: 120 + (i * 20)
    }));

    const newProducts = Array(8).fill().map((_, i) => ({
        id: i+9,
        name: `Laptop Gaming Mới Model ${i+9} i9-13900H RTX 4080 32GB 2TB`,
        price: 34990000 - (i * 1500000),
        rating: 4.8 - (i * 0.1),
        sold: 50 + (i * 10)
    }));

    const trendingProducts = Array(8).fill().map((_, i) => ({
        id: i+17,
        name: `Laptop Gaming Xu Hướng Model ${i+17} i5-12500H RTX 3060 16GB 512GB`,
        price: 19990000 - (i * 800000),
        oldPrice: 22990000 - (i * 800000),
        rating: 4.7 - (i * 0.1),
        sold: 200 + (i * 30)
    }));

    // Format price to VND
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <>
            {/* Flash Sale Section */}
            <section className="flash-sale-section">
                <div className="container">
                    <div className="section-header">
                        <div className="title-wrapper">
                            <Zap className="flash-icon" />
                            <h2 className="section-title">Flash Sale</h2>
                        </div>
                        <div className="countdown-timer">
                            <Clock className="timer-icon" />
                            <span>Kết thúc sau:</span>
                            <span className="time-remaining">12:34:56</span>
                        </div>
                    </div>

                    <div className="products-grid">
                        {flashSaleProducts.map((product) => (
                            <Card key={product.id} className="product-card">
                                <div className="image-container">
                                    <Badge className="discount-badge">-{product.discount}%</Badge>
                                    <Image
                                        src={source1}
                                        preview={false}
                                        alt={product.name}
                                        width={300}
                                        height={200}
                                        className="product-image"
                                        onError={(e) => {
                                            e.target.src = '/products/default-laptop.jpg';
                                            e.target.onerror = null;
                                        }}
                                    />
                                </div>
                                <Card className="product-content">
                                    <h3 className="product-name">{product.name}</h3>
                                    <div className="price-container">
                                        <span className="current-price">{formatPrice(product.price)}</span>
                                        <span className="old-price">{formatPrice(product.oldPrice)}</span>
                                    </div>
                                    <div className="rating-container">
                                        <div className="rating">
                                            <Star className="star-icon" />
                                            <span>{product.rating}</span>
                                        </div>
                                        <span className="divider">|</span>
                                        <span className="sold">Đã bán {product.sold}+</span>
                                    </div>
                                    <Button className="add-to-cart-button">Thêm vào giỏ</Button>
                                </Card>
                            </Card>
                        ))}
                    </div>

                    <div className="view-all-container">
                        <Button variant="outline" className="view-all-button">
                            Xem tất cả
                        </Button>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="featured-products-section">
                <div className="container">
                    <Tabs defaultValue="bestseller" className="tabs-container">
                        <div className="tabs-header">
                            <h2 className="section-title">Sản Phẩm Nổi Bật</h2>
                            <Tabs
                                defaultActiveKey="bestseller"
                                items={[
                                    {
                                        key: 'bestseller',
                                        label: 'Bán chạy',
                                        children: <div>Hiển thị sản phẩm bán chạy</div>,
                                    },
                                    {
                                        key: 'new',
                                        label: 'Mới nhất',
                                        children: <div>Hiển thị sản phẩm mới nhất</div>,
                                    },
                                    {
                                        key: 'trending',
                                        label: 'Xu hướng',
                                        children: <div>Hiển thị sản phẩm xu hướng</div>,
                                    },
                                ]}
                            />

                        </div>

                        <Tabs value="bestseller" className="tab-content">
                            <div className="products-grid">
                                {bestsellerProducts.map((product) => (
                                    <Card key={product.id} className="product-card">
                                        <div className="image-container">
                                            <Image
                                                src={source3}
                                                alt={product.name}
                                                width={300}
                                                preview={false}
                                                height={200}
                                                className="product-image"
                                            />
                                        </div>
                                        <Card bordered={false} className="product-content">
                                            <h3 className="product-name">{product.name}</h3>
                                            <div className="price-container">
                                                <span className="current-price">{formatPrice(product.price)}</span>
                                                <span className="old-price">{formatPrice(product.oldPrice)}</span>
                                            </div>
                                            <div className="rating-container">
                                                <div className="rating">
                                                    <Star className="star-icon" />
                                                    <span>{product.rating.toFixed(1)}</span>
                                                </div>
                                                <span className="divider">|</span>
                                                <span className="sold">Đã bán {product.sold}+</span>
                                            </div>
                                            <Button className="add-to-cart-button">Thêm vào giỏ</Button>
                                        </Card>
                                    </Card>
                                ))}
                            </div>
                        </Tabs>

                    </Tabs>

                    <div className="view-all-container">
                        <Button variant="outline" size="lg" className="view-all-button">
                            Xem tất cả sản phẩm
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductSections;