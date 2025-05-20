import StatsCard from '../../../components/card/StatsCard';
import UserStats from '../../../components/card/UserStats';
import '../../style/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p className="dashboard-subtitle">Quản lý tổng quan hệ thống laptop</p>
      
      <div className="stats-row">
        <StatsCard 
          title="Tổng số laptop" 
          value="120" 
          change="+10 trong tháng này" 
          positive 
        />
        <StatsCard 
          title="Tổng số nhãn hàng" 
          value="15" 
          change="+2 trong tháng này" 
          positive 
        />
        <StatsCard 
          title="Tổng số thể loại" 
          value="8" 
          change="+1 trong tháng này" 
          positive 
        />
      </div>
      
      <div className="content-row">
        <UserStats />
        
        <div className="revenue-card">
          <h3>Doanh thu</h3>
          <div className="revenue-item">
            <span>Tháng này</span>
            <strong>245,000,000 VNĐ</strong>
          </div>
          <div className="revenue-item">
            <span>Tháng trước</span>
            <strong>210,000,000 VNĐ</strong>
          </div>
          <div className="revenue-growth">
            <span>Tăng trưởng</span>
            <strong className="positive">+16.7%</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;