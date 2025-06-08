import React, { useState, useEffect } from 'react';
import { Zap, Star, Clock, Heart } from 'lucide-react';
import '../style/ProductSections.css';
import { Badge, Button, Card, Image, Tabs, message } from "antd";
import { useDispatch } from "react-redux";
import {getAllProductFeature, searchProducts} from "../../Redux/actions/ProductThunk";

const ProductSections = () => {
    const [flashSaleProducts, setFlashSaleProducts] = useState([]);
    const [bestsellerProducts, setBestsellerProducts] = useState([]);
    const [featureProducts, setFeatureProduct] = useState([]);
    const [loading, setLoading] = useState({
        flashSale: false,
        bestseller: false,
        feature : false,
        new: false,
        trending: false
    });
    const [error, setError] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState('24:00:00');
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(() => {
        const savedUser = localStorage.getItem('USER_LOGIN');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    // Format price to VND
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    // Calculate time remaining until midnight
    const updateCountdown = () => {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);

        const diff = midnight - now;

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeRemaining(
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
    };

    // Fetch all products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch flash sale products
                setLoading(prev => ({...prev, flashSale: true}));
                const flashSaleResponse = await dispatch(searchProducts( {size: 4 }));
                setFlashSaleProducts(flashSaleResponse?.content || []);

                // Fetch bestseller products
                setLoading(prev => ({...prev, bestseller: true}));
                const bestsellerResponse = await dispatch(searchProducts( {size: 8 }));
                setBestsellerProducts(bestsellerResponse?.content || []);

                setLoading(prev => ({...prev, feature: true}));
                const feature = await dispatch(getAllProductFeature(userData?.id || 0));
                setFeatureProduct(feature?.content || []);


            } catch (err) {
                setError("Lỗi khi tải dữ liệu sản phẩm");
                message.error("Lỗi khi tải dữ liệu sản phẩm");
            } finally {
                setLoading({
                    flashSale: false,
                    bestseller: false,
                    new: false,
                    trending: false
                });
            }
        };

        fetchProducts();

        updateCountdown();
        const timer = setInterval(updateCountdown, 1000);

        return () => clearInterval(timer);
    }, [dispatch]);

    return (
        <>
            <section className="featured-products-section">
                <div className="container">
                    <div className="section-header">
                        <div className="title-wrapper">
                            <h2 className="section-title">Sản phẩm có thể bạn quan tâm</h2>
                        </div>
                    </div>

                    {loading.featured ? (
                        <div className="loading-container">Đang tải sản phẩm nổi bật...</div>
                    ) : error ? (
                        <div className="error-container">{error}</div>
                    ) : (
                        <div className="products-grid">
                            {featureProducts.slice(0, 4).map((product) => (
                                <Card key={product.id} className="product-card"
                                      onClick={() => window.location.href = `/products/${product.id}`}
                                >
                                    <div className="image-container">
                                        {product.discountPercentage && (
                                            <Badge
                                                className="discount-badge">-{Math.round(product.discountPercentage)}%</Badge>
                                        )}
                                        <Image
                                            src={product.productVariant?.imageUrl || '/products/default-laptop.jpg'}
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
                                        <h3 className="product-name">
                                            {product.name} {product.code && product.code} {product.cpu && product.cpu} {product.gpu && product.gpu} {product.ram && product.ram}
                                        </h3>

                                        <div className="price-container-home">
                                <span className="current-price-home">
                                    {formatPrice(product.price || 0)}
                                </span>
                                            {product.discountPercentage && (
                                                <span className="old-price-home">
                                        {formatPrice(product.price * (1 + product.discountPercentage / 100))}
                                    </span>
                                            )}
                                        </div>
                                        <div className="rating-container">
                                            <div className="rating">
                                                <Star className="star-icon"/>
                                                <span>{product.ratingAverage?.toFixed(1) || '5.0'}</span>
                                            </div>
                                            <span className="divider">|</span>
                                            <span className="sold">Đã bán {product.salesCount || 0}+</span>
                                        </div>
                                    </Card>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Flash Sale Section */}
            <section className="flash-sale-section">
                <div className="container">
                    <div className="section-header">
                        <div className="title-wrapper">
                            <Zap className="flash-icon"/>
                            <h2 className="section-title-home">Flash Sale</h2>
                        </div>
                        <div className="countdown-timer">
                            <Clock className="timer-icon"/>
                            <span>Kết thúc sau:</span>
                            <span className="time-remaining">{timeRemaining}</span>
                        </div>
                    </div>

                    {loading.flashSale ? (
                        <div className="loading-container">Đang tải sản phẩm flash sale...</div>
                    ) : error ? (
                        <div className="error-container">{error}</div>
                    ) : (
                        <div className="products-grid">
                            {flashSaleProducts.slice(0, 4).map((product) => (
                                <Card key={product.id} className="product-card"
                                      onClick={() => window.location.href = `/products/${product.id}`}
                                >
                                    <div className="image-container">
                                        {product.discountPercentage && (
                                            <Badge
                                                className="discount-badge">-{Math.round(product.discountPercentage)}%</Badge>
                                        )}
                                        <Image
                                            src={product.productVariant.imageUrl || '/products/default-laptop.jpg'}
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
                                        <h3 className="product-name">
                                            {product.name} {product.code} {product.cpu} {product.gpu} {product.ram}
                                        </h3>

                                        <div className="price-container-home">
                                            <span className="current-price-home">
                                                {formatPrice(product.price || 0)}
                                            </span>
                                            <span className="old-price-home">
                                                    {formatPrice(product.price * 1.1)}
                                                </span>
                                        </div>
                                        <div className="rating-container">
                                            <div className="rating">
                                                <Star className="star-icon"/>
                                                <span>{product.ratingAverage?.toFixed(1) || '5.0'}</span>
                                            </div>
                                            <span className="divider">|</span>
                                            <span className="sold">Đã bán {product.salesCount || 0}+</span>
                                        </div>
                                    </Card>
                                </Card>
                            ))}
                        </div>
                    )}

                    <div className="view-all-container">
                        <Button
                            variant="outline"
                            className="view-all-button"
                            onClick={() => window.location.href = '/flash-sale'}
                        >
                            Xem tất cả
                        </Button>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="featured-products-section">
                <div className="container">
                    <div className="tabs-header">
                        <h2 className="section-title">Sản Phẩm Nổi Bật</h2>
                    </div>
                    <div className="products-grid">
                        {bestsellerProducts.slice(0, 8).map((product) => (
                            <Card key={product.id} className="product-card"
                                  onClick={() => window.location.href = `/products/${product.id}`}
                            >
                                <div className="image-container">
                                    <Image
                                        src={product.productVariant.imageUrl || '/products/default-laptop.jpg'}
                                        alt={product.name}
                                        width={300}
                                        preview={false}
                                        height={200}
                                        className="product-image"
                                    />
                                </div>
                                <Card bordered={false} className="product-content">
                                    {product.name} {product.code} {product.cpu} {product.gpu} {product.ram}
                                    <div className="price-container-home">
                                                    <span className="current-price-home">
                                                        {formatPrice(product?.price || 0)}
                                                    </span>
                                        <span className="old-price-home">
                                                           {formatPrice(product.price * 1.1)}
                                                        </span>
                                    </div>
                                    <div className="rating-container">
                                        <div className="rating">
                                            <Star className="star-icon"/>
                                            <span>{product.ratingAverage?.toFixed(1) || '5.0'}</span>
                                        </div>
                                        <span className="divider">|</span>
                                        <span className="sold">Đã bán {product.salesCount || 0}+</span>
                                    </div>
                                </Card>
                            </Card>
                        ))}
                    </div>

                    <div className="view-all-container">
                        <Button
                            variant="outline"
                            size="lg"
                            className="view-all-button"
                            onClick={() => window.location.href = '/search'}
                        >
                            Xem tất cả sản phẩm
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductSections;