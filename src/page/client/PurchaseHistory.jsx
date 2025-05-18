import React, { useState } from "react"
import { ChevronDown, ChevronUp, Laptop, Package, Search, ShoppingBag, Truck, User } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom';
import "../style/PurchaseHistory.css"
import {Pagination} from "antd";

// Mock data for purchase history
const orders = [
    {
        id: "ORD-2023-1234",
        date: new Date(2023, 4, 15),
        status: "delivered",
        total: 25990000,
        items: [
            {
                id: 1,
                name: "MacBook Pro M2",
                price: 25990000,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=120",
            },
        ],
    },
    {
        id: "ORD-2023-1235",
        date: new Date(2023, 4, 16),
        status: "shipped",
        total: 25990000,
        items: [
            {
                id: 1,
                name: "MacBook Pro M2",
                price: 25990000,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=120",
            },
        ],
    },
    {
        id: "ORD-2023-1236",
        date: new Date(2023, 4, 17),
        status: "processing",
        total: 25990000,
        items: [
            {
                id: 1,
                name: "MacBook Pro M2",
                price: 25990000,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=120",
            },
        ],
    },
    {
        id: "ORD-2023-1237",
        date: new Date(2023, 4, 18),
        status: "delivered",
        total: 25990000,
        items: [
            {
                id: 1,
                name: "MacBook Pro M2",
                price: 25990000,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=120",
            },
        ],
    },
    {
        id: "ORD-2023-1238",
        date: new Date(2023, 4, 19),
        status: "cancelled",
        total: 25990000,
        items: [
            {
                id: 1,
                name: "MacBook Pro M2",
                price: 25990000,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=120",
            },
        ],
    },
    {
        id: "ORD-2023-1239",
        date: new Date(2023, 4, 20),
        status: "delivered",
        total: 25990000,
        items: [
            {
                id: 1,
                name: "MacBook Pro M2",
                price: 25990000,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=120",
            },
        ],
    },
    {
        id: "ORD-2023-1240",
        date: new Date(2023, 4, 21),
        status: "shipped",
        total: 25990000,
        items: [
            {
                id: 1,
                name: "MacBook Pro M2",
                price: 25990000,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=120",
            },
        ],
    }
];

const PurchaseHistory = () => {
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortOrder, setSortOrder] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;

    const filteredOrders = orders
        .filter((order) => {
            const matchesSearch =
                order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesStatus = statusFilter === "all" || order.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            return sortOrder === "newest"
                ? b.date.getTime() - a.date.getTime()
                : a.date.getTime() - b.date.getTime();
        });

    // Get current orders
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    const toggleOrderExpand = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
    };

    const StatusBadge = ({ status }) => {
        const statusConfig = {
            processing: { label: "Đang xử lý", className: "status-badge processing" },
            shipped: { label: "Đang giao hàng", className: "status-badge shipped" },
            delivered: { label: "Đã giao hàng", className: "status-badge delivered" },
            cancelled: { label: "Đã hủy", className: "status-badge cancelled" },
        };

        const config = statusConfig[status] || statusConfig.processing;

        return <span className={config.className}>{config.label}</span>;
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        setExpandedOrder(null); // Close any expanded order when changing pages
    };

    return (
        <div className="purchase">
            <main className="main-content">
                <div className="container-history">
                    <h1 className="page-title">Lịch sử mua hàng</h1>

                    <div className="tabs-container">
                        <div className="tabs-header">
                            <div className="tabs">
                                <button
                                    className={`tab ${statusFilter === "all" ? "active" : ""}`}
                                    onClick={() => {
                                        setStatusFilter("all");
                                        setCurrentPage(1); // Reset to first page when changing filters
                                    }}
                                >
                                    Tất cả
                                </button>
                                <button
                                    className={`tab ${statusFilter === "processing" ? "active" : ""}`}
                                    onClick={() => {
                                        setStatusFilter("processing");
                                        setCurrentPage(1);
                                    }}
                                >
                                    Đang xử lý
                                </button>
                                <button
                                    className={`tab ${statusFilter === "shipped" ? "active" : ""}`}
                                    onClick={() => {
                                        setStatusFilter("shipped");
                                        setCurrentPage(1);
                                    }}
                                >
                                    Đang giao
                                </button>
                                <button
                                    className={`tab ${statusFilter === "delivered" ? "active" : ""}`}
                                    onClick={() => {
                                        setStatusFilter("delivered");
                                        setCurrentPage(1);
                                    }}
                                >
                                    Đã giao
                                </button>
                            </div>

                            <div className="controls">
                                <div className="search-container-history">
                                    <Search className="search-icon-history" />
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm đơn hàng..."
                                        className="search-input-history"
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setCurrentPage(1); // Reset to first page when searching
                                        }}
                                    />
                                </div>

                                <select
                                    className="sort-select"
                                    value={sortOrder}
                                    onChange={(e) => {
                                        setSortOrder(e.target.value);
                                        setCurrentPage(1); // Reset to first page when changing sort order
                                    }}
                                >
                                    <option value="newest">Mới nhất</option>
                                    <option value="oldest">Cũ nhất</option>
                                </select>
                            </div>
                        </div>

                        <div className="tab-content-">
                            {filteredOrders.length === 0 ? (
                                <div className="empty-state">
                                    <ShoppingBag className="empty-icon" />
                                    <p className="empty-text">Không tìm thấy đơn hàng nào</p>
                                    <button className="primary-button">Tiếp tục mua sắm</button>
                                </div>
                            ) : (
                                <div className="orders-list">
                                    {currentOrders.map((order) => (
                                        <div key={order.id} className="order-card">
                                            <div
                                                className="order-summary"
                                                onClick={() => toggleOrderExpand(order.id)}
                                            >
                                                <div className="order-info">
                                                    <div className="order-meta">
                                                        <p className="order-id">{order.id}</p>
                                                        <p className="order-date">
                                                            {new Intl.DateTimeFormat("vi-VN").format(order.date)}
                                                        </p>
                                                    </div>
                                                    <StatusBadge status={order.status}/>
                                                </div>
                                                <div className="order-amount">
                                                    <div className="amount-details">
                                                        <p className="total-history">{formatPrice(order.total)}</p>
                                                        <p className="items-count">{order.items.length} sản phẩm</p>
                                                    </div>
                                                    {expandedOrder === order.id ? (
                                                        <ChevronUp className="chevron"/>
                                                    ) : (
                                                        <ChevronDown className="chevron"/>
                                                    )}
                                                </div>
                                            </div>

                                            {expandedOrder === order.id && (
                                                <div className="order-details">
                                                    <div className="details-section">
                                                        <h3 className="section-title-history">Chi tiết đơn hàng</h3>
                                                        <div className="details-grid">
                                                            <div className="detail-item">
                                                                <p className="detail-label">Ngày đặt hàng</p>
                                                                <p>{new Intl.DateTimeFormat("vi-VN").format(order.date)}</p>
                                                            </div>
                                                            <div className="detail-item">
                                                                <p className="detail-label">Trạng thái</p>
                                                                <StatusBadge status={order.status}/>
                                                            </div>
                                                            <div className="detail-item">
                                                                <p className="detail-label">Mã đơn hàng</p>
                                                                <p>{order.id}</p>
                                                            </div>
                                                            <div className="detail-item">
                                                                <p className="detail-label">Tổng tiền</p>
                                                                <p className="detail-value">{formatPrice(order.total)}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="products-section">
                                                        <h3 className="section-title-history">Sản phẩm</h3>
                                                        <div className="products-list">
                                                            {order.items.map((item) => (
                                                                <div key={item.id} className="product-item">
                                                                    <div className="product-image-container">
                                                                        <img
                                                                            src={item.image || "/placeholder.svg"}
                                                                            alt={item.name}
                                                                            className="product-image"
                                                                        />
                                                                    </div>
                                                                    <div className="product-info">
                                                                        <p className="product-name">{item.name}</p>
                                                                        <p className="product-quantity">Số
                                                                            lượng: {item.quantity}</p>
                                                                    </div>
                                                                    <div className="product-price">
                                                                        {formatPrice(item.price)}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="order-actions">
                                                        <div className="status-info">
                                                            {order.status === "processing" && (
                                                                <div className="status-message processing">
                                                                    <Package className="status-icon"/>
                                                                    <span>Đang chuẩn bị hàng</span>
                                                                </div>
                                                            )}
                                                            {order.status === "shipped" && (
                                                                <div className="status-message shipped">
                                                                    <Truck className="status-icon"/>
                                                                    <span>Đang vận chuyển</span>
                                                                </div>
                                                            )}
                                                            {order.status === "delivered" && (
                                                                <div className="status-message delivered">
                                                                    <Package className="status-icon"/>
                                                                    <span>Đã giao hàng thành công</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="action-buttons">
                                                            {order.status === "delivered" && (
                                                                <button className="secondary-button-history">Mua lại</button>
                                                            )}
                                                            <button className="secondary-button-history">Chi tiết</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    <div className="pagination-container">
                                        <Pagination
                                            current={currentPage}
                                            total={orders.length}
                                            pageSize={5}
                                            onChange={handlePageChange}
                                            showSizeChanger={false}
                                        />
                                    </div>
                                </div>
                                )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PurchaseHistory;