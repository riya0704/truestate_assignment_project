import { useState, useEffect } from 'react';

const Sidebar = ({ activeSection, onSectionChange, isMobileOpen, onClose }) => {
  const [servicesExpanded, setServicesExpanded] = useState(true);
  const [invoicesExpanded, setInvoicesExpanded] = useState(true);

  const handleSectionClick = (section) => {
    onSectionChange(section);
    if (onClose) onClose();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileOpen && !e.target.closest('.sidebar') && !e.target.closest('.mobile-menu-toggle')) {
        if (onClose) onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileOpen, onClose]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '/images/chart-square.png' },
    { id: 'nexus', label: 'Nexus', icon: '/images/profile-2user.png' },
    { id: 'intake', label: 'Intake', icon: '/images/play-circle.png' },
  ];

  const servicesItems = [
    { id: 'pre-active', label: 'Pre-active', icon: '/images/play-circle.png' },
    { id: 'active', label: 'Active', icon: '/images/check.png' },
    { id: 'blocked', label: 'Blocked', icon: '/images/close-circle.png' },
    { id: 'closed', label: 'Closed', icon: '/images/tick-circle.png' },
  ];

  const invoicesItems = [
    { id: 'proforma', label: 'Proforma Invoices', icon: '/images/proforma.png' },
    { id: 'final', label: 'Final Invoices', icon: '/images/document-favorite.png' },
  ];

  return (
    <div className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        <img src="/images/logo.png" alt="Vault" className="sidebar-logo" />
        <div className="sidebar-title">
          <h2>Vault</h2>
          <p>Riya Verma</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          {menuItems.map(item => (
            <div
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleSectionClick(item.id)}
            >
              <img src={item.icon} alt={item.label} className="nav-icon" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div className="nav-section">
          <div
            className="nav-section-title clickable"
            onClick={() => setServicesExpanded(!servicesExpanded)}
          >
            <img src="/images/archive-book.png" alt="Services" className="nav-icon-small" />
            <span>Services</span>
            <span className={`toggle-icon ${servicesExpanded ? 'expanded' : ''}`}>
              ▼
            </span>
          </div>
          {servicesExpanded && servicesItems.map(item => (
            <div
              key={item.id}
              className={`nav-item sub-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleSectionClick(item.id)}
            >
              <img src={item.icon} alt={item.label} className="nav-icon-small" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div className="nav-section">
          <div
            className="nav-section-title clickable"
            onClick={() => setInvoicesExpanded(!invoicesExpanded)}
          >
            <img src="/images/document-text.png" alt="Invoices" className="nav-icon-small" />
            <span>Invoices</span>
            <span className={`toggle-icon ${invoicesExpanded ? 'expanded' : ''}`}>
              ▼
            </span>
          </div>
          {invoicesExpanded && invoicesItems.map(item => (
            <div
              key={item.id}
              className={`nav-item sub-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleSectionClick(item.id)}
            >
              <img src={item.icon} alt={item.label} className="nav-icon-small" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
