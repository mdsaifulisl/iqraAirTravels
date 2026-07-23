import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaEye, 
  FaTrash, 
  FaSearch, 
  FaCheckCircle, 
  FaClock, 
  FaTimesCircle 
} from "react-icons/fa";
import { useBookings } from "../../../hooks/useBookings"; 

const ManageBookings = () => {
  const { 
    bookings, 
    loading, 
    error, 
    fetchBookings, 
    changeBookingStatus, 
    removeBooking 
  } = useBookings();

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleStatusChange = async (id, newStatus) => {
    const res = await changeBookingStatus(id, newStatus);
    if (!res.success) {
      alert(res.message || "Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      const res = await removeBooking(id);
      if (!res.success) {
        alert(res.message || "Failed to delete booking");
      }
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const bookingId = String(b.id || "").toLowerCase();
    const customer = String(b.fullName || "").toLowerCase();
    const itemId = String(b.itemId || "").toLowerCase();
    const query = search.toLowerCase();

    const matchesSearch = 
      customer.includes(query) || 
      bookingId.includes(query) || 
      itemId.includes(query);

    const matchesStatus = 
      filterStatus === "All" || b.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Confirmed":
        return (
          <span className="badge bg-success-subtle text-success border border-success px-2 py-1">
            <FaCheckCircle className="me-1" /> Confirmed
          </span>
        );
      case "Pending":
        return (
          <span className="badge bg-warning-subtle text-warning border border-warning px-2 py-1">
            <FaClock className="me-1" /> Pending
          </span>
        );
      case "Cancelled":
        return (
          <span className="badge bg-danger-subtle text-danger border border-danger px-2 py-1">
            <FaTimesCircle className="me-1" /> Cancelled
          </span>
        );
      default:
        return <span className="badge bg-secondary">{status || "Pending"}</span>;
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-teal" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-3">
        <div>
          <h3 className="fw-bold m-0" style={{ color: "var(--primary-teal, #0f766e)" }}>
            Booking Management
          </h3>
          <p className="text-muted small m-0">View and update customer travel bookings</p>
        </div>

        {/* Search & Filter Controls */}
        <div className="d-flex flex-wrap align-items-center gap-2">
          <div className="input-group input-group-sm" style={{ width: "220px" }}>
            <span className="input-group-text bg-white border-end-0">
              <FaSearch className="text-muted" />
            </span>
            <input
              type="text"
              className="form-control border-start-0 ps-0"
              placeholder="Search by ID, Name, Item..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="form-select form-select-sm"
            style={{ width: "130px" }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {error && <div className="alert alert-danger py-2">{error}</div>}

      {/* Booking Table */}
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr className="small text-muted">
                <th>ID</th>
                <th>Customer</th>
                <th>Type / Item ID</th>
                <th>Booking Date</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((b) => (
                  <tr key={b.id}>
                    <td className="fw-bold small" title={b.id}>
                      #{b.id?.substring(0, 8)}...
                    </td>
                    <td>
                      <div className="fw-bold">{b.fullName}</div>
                      <div className="text-muted small" style={{ fontSize: "12px" }}>
                        {b.phone}
                      </div>
                    </td>
                    <td>
                      <div className="fw-semibold text-dark">{b.itemId}</div>
                      <span className="badge bg-light text-secondary border text-capitalize fw-normal" style={{ fontSize: "11px" }}>
                        {b.bookingType}
                      </span>
                    </td>
                    <td className="small">
                      {b.createdAt ? new Date(b.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td>{getStatusBadge(b.status)}</td>
                    <td className="text-end">
                      <Link
                        to={`/admin/bookings/${b.id}`}
                        className="btn btn-sm btn-outline-primary border-0 me-1"
                        title="View Details"
                      >
                        <FaEye />
                      </Link>

                      <div className="dropdown d-inline-block me-1">
                        <select
                          className="form-select form-select-sm py-1 pe-4"
                          style={{ fontSize: "12px" }}
                          value={b.status || "Pending"}
                          onChange={(e) => handleStatusChange(b.id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>

                      <button
                        className="btn btn-sm btn-outline-danger border-0"
                        onClick={() => handleDelete(b.id)}
                        title="Delete Booking"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;

