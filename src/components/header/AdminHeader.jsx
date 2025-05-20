import React from 'react';
import './adminHeader.scss';
import { FiMenu } from 'react-icons/fi'; // Import menu icon from react-icons

const AdminHeader = ({ onToggleSidebar, isSidebarOpen }) => {
  const user = {
    name: "Admin User",
    avatar: "https://i.pravatar.cc/150?img=3" // Placeholder avatar image
  };

  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="sidebar-toggle" 
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <FiMenu size={20} />
        </button>
      </div>
      
      <div className="header-right">
        <div className="user-profile">
          <span className="user-name">{user.name}</span>
          <div className="user-avatar">
            <img src={user.avatar} alt={user.name} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;