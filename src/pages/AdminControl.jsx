import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminControl.css";

const NAV_ITEMS = [
  { key: "users", label: "Users Control", icon: "◈" },
  { key: "images", label: "Image Control", icon: "⬡" },
  { key: "chat", label: "Chat Control", icon: "◎" },
];

export default function () {
  const [activeNav, setActiveNav] = useState("users");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  const [editForm, setEditForm] = useState({ fullName: "", email: "" });
  const [addForm, setAddForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/admin/users");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setUsers(data);
    } catch (err) {
      setError(err.message || "Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed.");
      setUsers(users.filter((u) => u.id !== id));
      setDeleteConfirm(null);
      showToast("User deleted successfully.");
    } catch {
      showToast("Failed to delete user.", "error");
    }
  };

  const handleEditSave = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/users/${editingUser.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editForm),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setUsers(
        users.map((u) => (u.id === editingUser.id ? { ...u, ...editForm } : u)),
      );
      setEditingUser(null);
      showToast("User updated successfully.");
    } catch (err) {
      showToast(err.message || "Failed to update user.", "error");
    }
  };

  const handleAdd = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setUsers([...users, data.user]);
      setShowAddModal(false);
      setAddForm({ fullName: "", email: "", password: "" });
      showToast("User added successfully.");
    } catch (err) {
      showToast(err.message || "Failed to add user.", "error");
    }
  };

  const filtered = users.filter(
    (u) =>
      u.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="admin-layout">
      {/* ══ SIDEBAR ══════════════════════════════════════════════ */}
      <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="brand-gem">⬡</div>
          {!collapsed && (
            <div className="brand-text">
              <span className="brand-name">ADMIN</span>
              <span className="brand-sub">control panel</span>
            </div>
          )}
        </div>

        <div className="sidebar-divider" />

        {/* Nav Items */}
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              className={`sidebar-item ${activeNav === item.key ? "active" : ""}`}
              onClick={() => setActiveNav(item.key)}
              title={collapsed ? item.label : ""}
            >
              <span className="item-icon">{item.icon}</span>
              {!collapsed && <span className="item-label">{item.label}</span>}
              {activeNav === item.key && !collapsed && (
                <span className="item-pip" />
              )}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="sidebar-footer">
          <div className="sidebar-divider" />
          <button
            className="sidebar-item logout"
            onClick={() => navigate("/login")}
            title={collapsed ? "Logout" : ""}
          >
            <span className="item-icon">⏻</span>
            {!collapsed && <span className="item-label">Logout</span>}
          </button>

          {/* Collapse toggle */}
          <button
            className="collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <span>{collapsed ? "›" : "‹"}</span>
          </button>
        </div>
      </aside>

      {/* ══ MAIN ═════════════════════════════════════════════════ */}
      <div className="admin-main">
        {/* Toast */}
        {toast && (
          <div className={`admin-toast ${toast.type}`}>
            {toast.type === "success" ? "✓" : "✕"} {toast.msg}
          </div>
        )}

        {/* Page Header */}
        <div className="admin-header">
          <div>
            <p className="admin-section-eyebrow">
              {NAV_ITEMS.find((n) => n.key === activeNav)?.icon}&nbsp;&nbsp;
              {activeNav.toUpperCase()}
            </p>
            <h1 className="admin-title">
              {NAV_ITEMS.find((n) => n.key === activeNav)?.label}
            </h1>
          </div>
          {activeNav === "users" && (
            <div className="admin-stat">
              <span className="stat-num">{users.length}</span>
              <span className="stat-label">Total Users</span>
            </div>
          )}
        </div>

        {/* ── Users Panel ── */}
        {activeNav === "users" && (
          <>
            <div className="admin-toolbar">
              <div className="admin-search-wrap">
                <span className="search-icon">⌕</span>
                <input
                  className="admin-search"
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button
                className="admin-add-btn"
                onClick={() => setShowAddModal(true)}
              >
                + Add User
              </button>
            </div>

            <div className="admin-table-wrap">
              {loading ? (
                <div className="admin-loading">
                  <div className="admin-spinner" />
                  <p>Loading users...</p>
                </div>
              ) : error ? (
                <div className="admin-error">{error}</div>
              ) : filtered.length === 0 ? (
                <div className="admin-empty">No users found.</div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Joined</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((user, i) => (
                      <tr key={user.id} className="admin-row">
                        <td className="admin-id">{i + 1}</td>
                        <td>
                          <div className="user-avatar-name">
                            <div className="user-avatar">
                              {(user.fullName ||
                                user.full_name ||
                                "?")[0].toUpperCase()}
                            </div>
                            <span>{user.fullName || user.full_name}</span>
                          </div>
                        </td>
                        <td className="user-email">{user.email}</td>
                        <td className="user-date">
                          {user.created_at
                            ? new Date(user.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                },
                              )
                            : "—"}
                        </td>
                        <td>
                          <div className="action-btns">
                            <button
                              className="btn-edit"
                              onClick={() => {
                                setEditingUser(user);
                                setEditForm({
                                  fullName: user.fullName || user.full_name,
                                  email: user.email,
                                });
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn-delete"
                              onClick={() => setDeleteConfirm(user)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* ── Placeholder panels ── */}
        {activeNav === "images" && (
          <div className="admin-placeholder">
            <div className="ph-icon">⬡</div>
            <h2>Image Control</h2>
            <p>Image management features coming soon.</p>
          </div>
        )}
        {activeNav === "chat" && (
          <div className="admin-placeholder">
            <div className="ph-icon">◎</div>
            <h2>Chat Control</h2>
            <p>Chat monitoring features coming soon.</p>
          </div>
        )}
      </div>

      {/* ══ MODALS ════════════════════════════════════════════════ */}

      {/* Edit */}
      {editingUser && (
        <div
          className="admin-modal-overlay"
          onClick={() => setEditingUser(null)}
        >
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Edit User</h2>
            <label>Full Name</label>
            <input
              value={editForm.fullName}
              onChange={(e) =>
                setEditForm({ ...editForm, fullName: e.target.value })
              }
              placeholder="Full Name"
            />
            <label>Email</label>
            <input
              value={editForm.email}
              onChange={(e) =>
                setEditForm({ ...editForm, email: e.target.value })
              }
              placeholder="Email"
            />
            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => setEditingUser(null)}
              >
                Cancel
              </button>
              <button className="btn-save" onClick={handleEditSave}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add */}
      {showAddModal && (
        <div
          className="admin-modal-overlay"
          onClick={() => setShowAddModal(false)}
        >
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add New User</h2>
            <label>Full Name</label>
            <input
              value={addForm.fullName}
              onChange={(e) =>
                setAddForm({ ...addForm, fullName: e.target.value })
              }
              placeholder="Full Name"
            />
            <label>Email</label>
            <input
              value={addForm.email}
              onChange={(e) =>
                setAddForm({ ...addForm, email: e.target.value })
              }
              placeholder="Email"
            />
            <label>Password</label>
            <input
              type="password"
              value={addForm.password}
              onChange={(e) =>
                setAddForm({ ...addForm, password: e.target.value })
              }
              placeholder="Password"
            />
            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button className="btn-save" onClick={handleAdd}>
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete */}
      {deleteConfirm && (
        <div
          className="admin-modal-overlay"
          onClick={() => setDeleteConfirm(null)}
        >
          <div
            className="admin-modal delete-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="delete-icon">⚠</div>
            <h2>Delete User?</h2>
            <p>
              Are you sure you want to delete{" "}
              <strong>
                {deleteConfirm.fullName || deleteConfirm.full_name}
              </strong>
              ? This cannot be undone.
            </p>
            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                className="btn-delete-confirm"
                onClick={() => handleDelete(deleteConfirm.id)}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
