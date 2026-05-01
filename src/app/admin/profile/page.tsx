"use client";


export default function AdminProfilePage() {
  return (
    <div className="admin-profile-container">
      <h1 className="admin-page-title">Admin Settings</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
        
        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>Public Profile</h3>
          <div className="admin-form">
             <label>Full Name</label>
             <input type="text" defaultValue="Ali Engineer" className="admin-input" />
             <label>Email Address</label>
             <input type="email" defaultValue="ali@software.com" className="admin-input" />
             <button className="admin-btn">Update Profile</button>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>Security</h3>
          <div className="admin-form">
             <label>New Password</label>
             <input type="password" placeholder="••••••••" className="admin-input" />
             <button className="admin-btn" style={{ background: '#64748b' }}>Change Password</button>
          </div>
        </div>

      </div>
    </div>
  );
}

