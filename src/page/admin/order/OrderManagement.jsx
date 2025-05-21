import React, { useState, useEffect } from "react";
import { 
  Table, 
  Button, 
  Input, 
  Row, 
  Col, 
  Modal, 
  Form, 
  message, 
  Typography, 
  Select, 
  Card, 
  Tag, 
  Divider,
  Space,
  Descriptions,
  Pagination,
  ConfigProvider,
  Empty,
  DatePicker // Thêm import DatePicker
} from "antd";
import { 
  SearchOutlined, 
  EditOutlined, 
  EyeOutlined, 
  SortAscendingOutlined, 
  SortDescendingOutlined,
  ExclamationCircleFilled,
  CalendarOutlined // Thêm import icon Calendar
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getAllOrders, updateOrderStatus } from "../../../Redux/actions/OrderItemThunk";
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

// Helper function to map status to color
const getStatusColor = (status) => {
  const statusColors = {
    CANCELLED: "red",
    COMPLETED: "green",
    CONFIRMED: "blue",
    PENDING: "orange",
    SHIPPED: "purple"
  };
  return statusColors[status] || "default";
};

// Helper function to map payment status to color
const getPaymentStatusColor = (status) => {
  const statusColors = {
    FAILED: "red",
    PAID: "green",
    REFUNDED: "orange",
    UNPAID: "gold"
  };
  return statusColors[status] || "default";
};

// Helper function to format address
const formatAddress = (info) => {
  if (!info || !info.ward) return "N/A";
  const { detailAddress, ward } = info;
  return `${detailAddress}, ${ward.name}, ${ward.district.name}, ${ward.district.province.name}`;
};

const OrderManagement = () => {
  // State for orders data
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  
  // Filtering and sorting state
  const [searchText, setSearchText] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  
  // Modal state
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isStatusUpdateVisible, setIsStatusUpdateVisible] = useState(false);
  
  // Form for status update
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  // Thêm state cho lọc theo ngày tháng
  const [dateRange, setDateRange] = useState(null);
  
  // Load order data
  useEffect(() => {
    fetchOrders();
  }, [currentPage, pageSize, searchText, paymentMethod, paymentStatus, orderStatus, sortField, sortDirection, dateRange]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      
      // Lấy ra startDate và endDate từ dateRange
      let startDate = null;
      let endDate = null;
      
      if (dateRange && dateRange.length === 2) {
        startDate = dateRange[0].format('YYYY-MM-DD');
        endDate = dateRange[1].format('YYYY-MM-DD');
      }
      
      const res = await dispatch(getAllOrders(
        startDate,
        endDate,
        orderStatus,
        paymentMethod,
        paymentStatus,
        currentPage,
        pageSize,
        sortField,
        sortDirection
      ));
      
      if (res && res.content) {
        setOrders(res.content);
        setTotalElements(res.totalElements);
      } else {
        messageApi.warning("Không có đơn hàng nào");
      }
    } catch (error) {
      messageApi.error("Đã xảy ra lỗi khi tải dữ liệu");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setSearchText('');
    setPaymentMethod(null);
    setPaymentStatus(null);
    setOrderStatus(null);
    setSortField("createdAt");
    setSortDirection("desc");
    setDateRange(null); // Reset dateRange
    setCurrentPage(1);
  };
  
  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    setCurrentPage(1);
  };

  const handleViewDetails = (order) => {
    setCurrentOrder(order);
    setIsDetailModalVisible(true);
  };

  const handleStatusUpdateModal = (order) => {
    setCurrentOrder(order);
    form.setFieldsValue({ status: order.status });
    setIsStatusUpdateVisible(true);
  };

  const handleStatusUpdate = async () => {
    try {
      const values = await form.validateFields();
      
      setLoading(true);
      const response = await dispatch(updateOrderStatus(currentOrder.id, { status: values.status }));
      
      if (response) {
        messageApi.success("Cập nhật trạng thái đơn hàng thành công");
        fetchOrders();
        setIsStatusUpdateVisible(false);
      } else {
        messageApi.error("Không thể cập nhật trạng thái đơn hàng");
      }
    } catch (error) {
      messageApi.error("Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleSortFieldChange = (value) => {
    setSortField(value);
    setCurrentPage(1);
  };

  const handleSortDirectionChange = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    setCurrentPage(1);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return dayjs(dateString).format('DD/MM/YYYY HH:mm');
  };

  // Table columns configuration
  const columns = [
    {
      title: 'STT',
      key: 'index',
      width: 60,
      align: 'center',
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (id) => <span>#{id}</span>,
    },
    {
      title: "Khách hàng",
      dataIndex: "user",
      key: "user",
      width: 150,
      render: (user) => <span>{user?.fullName || "N/A"}</span>,
    },
    {
      title: "Người nhận",
      dataIndex: "infoUserReceive",
      key: "recipient",
      width: 150,
      render: (info) => <span>{info?.fullName || "N/A"}</span>,
    },

    {
      title: "Phương thức",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      width: 110,
      render: (method) => <span>{method}</span>,
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      width: 120,
      render: (status) => (
        <Tag color={getPaymentStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      render: (date) => formatDate(date),
    },
    {
      title: "Cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: 150,
      render: (date) => date ? formatDate(date) : "-",
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      width: 100,
      align: 'center',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            icon={<EyeOutlined />} 
            onClick={() => handleViewDetails(record)}
            size="middle"
            title="Xem chi tiết"
            style={{ borderRadius: '4px' }}
          />
          <Button 
            type="primary"
            style={{ background: '#52c41a', borderRadius: '4px' }}
            icon={<EditOutlined />}
            onClick={() => handleStatusUpdateModal(record)}
            size="middle"
            title="Cập nhật trạng thái"
          />
        </Space>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: '#1890ff',
            headerColor: 'white',
          },
        },
      }}
    >
      <div style={{ padding: 24, background: '#fff' }}>
        {contextHolder}
        
        {/* Title */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 32
        }}>
          <Title 
            level={2} 
            style={{ 
              margin: 0, 
              fontWeight: 800
            }}
          >
            Quản lý đơn hàng
          </Title>
        </div>
        
        {/* Search and Filters */}
        <div style={{ 
          marginBottom: 24,
          display: 'flex', 
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          {/* Thêm RangePicker cho lọc theo khoảng thời gian */}
          <RangePicker
            placeholder={['Từ ngày', 'Đến ngày']}
            style={{ width: 280 }}
            value={dateRange}
            onChange={handleDateRangeChange}
            format="DD/MM/YYYY"
            allowClear
            size="large"
          />
          
          <Select
            placeholder="Phương thức thanh toán"
            style={{ width: 180 }}
            allowClear
            onChange={(value) => setPaymentMethod(value)}
            value={paymentMethod}
            size="large"
          >
            <Option value="COD">COD</Option>
            <Option value="VNPAY">VNPAY</Option>
            <Option value="IN_APP">IN_APP</Option>
          </Select>
          
          <Select
            placeholder="Trạng thái thanh toán"
            style={{ width: 180 }}
            allowClear
            onChange={(value) => setPaymentStatus(value)}
            value={paymentStatus}
            size="large"
          >
            <Option value="FAILED">FAILED</Option>
            <Option value="PAID">PAID</Option>
            <Option value="REFUNDED">REFUNDED</Option>
            <Option value="UNPAID">UNPAID</Option>
          </Select>
          
          <Select
            placeholder="Trạng thái đơn hàng"
            style={{ width: 180 }}
            allowClear
            onChange={(value) => setOrderStatus(value)}
            value={orderStatus}
            size="large"
          >
            <Option value="CANCELLED">CANCELLED</Option>
            <Option value="COMPLETED">COMPLETED</Option>
            <Option value="CONFIRMED">CONFIRMED</Option>
            <Option value="PENDING">PENDING</Option>
            <Option value="SHIPPED">SHIPPED</Option>
          </Select>
        
        </div>
        
        {/* Custom Pagination and Sorting Controls */}
        <div style={{ 
          marginBottom: 16,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span>Sắp xếp theo:</span>
            <Select 
              value={sortField} 
              onChange={handleSortFieldChange}
              style={{ width: 180 }}
              size="middle"
            >
                <Option value="createdAt">Ngày tạo</Option>
              <Option value="id">Mã đơn hàng</Option>
              <Option value="updatedAt">Ngày cập nhật</Option>
            </Select>
            
            <Button 
              onClick={handleSortDirectionChange}
              icon={sortDirection === 'asc' ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
              size="middle"
            >
              {sortDirection === 'asc' ? 'Tăng dần' : 'Giảm dần'}
            </Button>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span>Hiển thị:</span>
            <Select 
              value={pageSize} 
              onChange={(value) => handlePageSizeChange(currentPage, value)}
              style={{ width: 80 }}
              size="middle"
            >
              <Option value={5}>5</Option>
              <Option value={10}>10</Option>
              <Option value={20}>20</Option>
              <Option value={50}>50</Option>
            </Select>
            <span>mục / trang</span>
          </div>
        </div>
        
        {/* Orders Table */}
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          loading={loading}
          pagination={false}
          bordered
        />
        
        {/* Custom Pagination Component */}
        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalElements}
            onChange={handlePageChange}
            showQuickJumper={true}
            locale={{ 
              jump_to: "Đến trang", 
              page: "" 
            }}
            showSizeChanger={false}
            showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} mục`}
          />
        </div>
        
        {/* Order Details Modal */}
        <Modal
          title={`Chi tiết đơn hàng #${currentOrder?.id}`}
          open={isDetailModalVisible}
          onCancel={() => setIsDetailModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setIsDetailModalVisible(false)}>
              Đóng
            </Button>,
            <Button 
              key="update" 
              type="primary"
              onClick={() => {
                setIsDetailModalVisible(false);
                handleStatusUpdateModal(currentOrder);
              }}
            >
              Cập nhật trạng thái
            </Button>,
          ]}
          width={800}
        >
          {currentOrder && (
            <>
              <Descriptions title="Thông tin đơn hàng" bordered>
                <Descriptions.Item label="Trạng thái" span={3}>
                  <Tag color={getStatusColor(currentOrder.status)}>
                    {currentOrder.status}
                  </Tag>
                </Descriptions.Item>
                
                <Descriptions.Item label="Phương thức thanh toán" span={1}>
                  {currentOrder.paymentMethod}
                </Descriptions.Item>
                
                <Descriptions.Item label="Trạng thái thanh toán" span={2}>
                  <Tag color={getPaymentStatusColor(currentOrder.paymentStatus)}>
                    {currentOrder.paymentStatus}
                  </Tag>
                </Descriptions.Item>
                
                <Descriptions.Item label="Ngày tạo" span={1}>
                  {dayjs(currentOrder.createdAt).format("DD/MM/YYYY HH:mm")}
                </Descriptions.Item>
                
                <Descriptions.Item label="Cập nhật lần cuối" span={2}>
                  {currentOrder.updatedAt 
                    ? dayjs(currentOrder.updatedAt).format("DD/MM/YYYY HH:mm") 
                    : "Chưa cập nhật"}
                </Descriptions.Item>
                
                <Descriptions.Item label="Ghi chú" span={3}>
                  {currentOrder.note || "Không có ghi chú"}
                </Descriptions.Item>
              </Descriptions>
              
              <Divider />
              
              {/* Thêm phần hiển thị sản phẩm đã đặt */}
              <Title level={4}>Sản phẩm đã đặt</Title>
              {currentOrder.orderItems && currentOrder.orderItems.length > 0 ? (
                <>
                  {currentOrder.orderItems.map((item, index) => (
                    <Card 
                      key={index} 
                      style={{ marginBottom: 16 }}
                      bodyStyle={{ padding: 16 }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: 80, height: 80, marginRight: 16 }}>
                          <img 
                            src={item.productImage} 
                            alt={item.productName}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          />
                        </div>
                        
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                              <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{item.productName}</div>
                              <div style={{ color: '#666', fontSize: 13 }}>Mã: {item.productCode}</div>
                              <div style={{ color: '#666', fontSize: 13 }}>Màu: {item.productColor}</div>
                            </div>
                            
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontWeight: 'bold', color: '#ff4d4f' }}>
                                {new Intl.NumberFormat('vi-VN', { 
                                  style: 'currency', 
                                  currency: 'VND',
                                  maximumFractionDigits: 0
                                }).format(item.priceAtOrderTime)}
                              </div>
                              <div style={{ color: '#666', fontSize: 13 }}>Số lượng: {item.quantity}</div>
                              <div style={{ fontWeight: 'bold', marginTop: 4 }}>
                                Thành tiền: {new Intl.NumberFormat('vi-VN', { 
                                  style: 'currency', 
                                  currency: 'VND',
                                  maximumFractionDigits: 0
                                }).format(item.priceAtOrderTime * item.quantity)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                  
                  {/* Hiển thị tổng tiền */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    marginTop: 16,
                    marginBottom: 24
                  }}>
                    <Card 
                      style={{ width: 300 }}
                      bodyStyle={{ padding: 16 }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span>Tổng tiền sản phẩm:</span>
                        <span style={{ fontWeight: 'bold' }}>
                          {new Intl.NumberFormat('vi-VN', { 
                            style: 'currency', 
                            currency: 'VND',
                            maximumFractionDigits: 0
                          }).format(currentOrder.orderItems.reduce((total, item) => 
                            total + (item.priceAtOrderTime * item.quantity), 0)
                          )}
                        </span>
                      </div>
                      
                      {currentOrder.discount && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                          <span>Giảm giá:</span>
                          <span style={{ fontWeight: 'bold', color: '#52c41a' }}>
                            -{new Intl.NumberFormat('vi-VN', { 
                              style: 'currency', 
                              currency: 'VND',
                              maximumFractionDigits: 0
                            }).format(currentOrder.discount)}
                          </span>
                        </div>
                      )}
                      
                      <Divider style={{ margin: '8px 0' }} />
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 'bold' }}>Tổng thanh toán:</span>
                        <span style={{ fontWeight: 'bold', fontSize: 18, color: '#ff4d4f' }}>
                          {new Intl.NumberFormat('vi-VN', { 
                            style: 'currency', 
                            currency: 'VND',
                            maximumFractionDigits: 0
                          }).format(
                            currentOrder.orderItems.reduce((total, item) => 
                              total + (item.priceAtOrderTime * item.quantity), 0) - 
                              (currentOrder.discount || 0)
                          )}
                        </span>
                      </div>
                    </Card>
                  </div>
                </>
              ) : (
                <Empty description="Không có sản phẩm" />
              )}
              
              <Divider />
              
              <Row gutter={16}>
                <Col span={12}>
                  <Card 
                    title="Thông tin người mua" 
                    bordered={false}
                    style={{ height: '100%' }}
                  >
                    <p><strong>Tên:</strong> {currentOrder.user?.fullName || "N/A"}</p>
                  </Card>
                </Col>
                
                <Col span={12}>
                  <Card 
                    title="Thông tin người nhận" 
                    bordered={false}
                    style={{ height: '100%' }}
                  >
                    <p><strong>Tên:</strong> {currentOrder.infoUserReceive?.fullName || "N/A"}</p>
                    <p><strong>Email:</strong> {currentOrder.infoUserReceive?.email || "N/A"}</p>
                    <p><strong>SĐT:</strong> {currentOrder.infoUserReceive?.phoneNumber || "N/A"}</p>
                    <p><strong>Địa chỉ:</strong> {formatAddress(currentOrder.infoUserReceive)}</p>
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </Modal>
        
        {/* Status Update Modal */}
        <Modal
          title="Cập nhật trạng thái đơn hàng"
          open={isStatusUpdateVisible}
          onCancel={() => setIsStatusUpdateVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsStatusUpdateVisible(false)}>
              Hủy
            </Button>,
            <Button 
              key="submit" 
              type="primary" 
              loading={loading}
              onClick={handleStatusUpdate}
            >
              Cập nhật
            </Button>,
          ]}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <ExclamationCircleFilled style={{ color: '#faad14', fontSize: '22px' }} />
            <p style={{ margin: 0 }}>
              Bạn đang cập nhật trạng thái đơn hàng <strong>#{currentOrder?.id}</strong>
            </p>
          </div>
          
          <Form
            form={form}
            layout="vertical"
            initialValues={{ status: currentOrder?.status }}
          >
            <Form.Item
              name="status"
              label="Trạng thái đơn hàng"
              rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
            >
              <Select>
                <Option value="CANCELLED">CANCELLED</Option>
                <Option value="COMPLETED">COMPLETED</Option>
                <Option value="CONFIRMED">CONFIRMED</Option>
                <Option value="PENDING">PENDING</Option>
                <Option value="SHIPPED">SHIPPED</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </ConfigProvider>
  );
};

export default OrderManagement;