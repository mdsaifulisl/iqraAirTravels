import React, { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaCalendarAlt,
  FaUser,
  FaNewspaper,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import FilterBar from "../../../components/shared/FilterBar";
import useBlogs from "../../../hooks/useBlogs";

const ManageBlog = () => {
  const navigate = useNavigate();

  const { blogs, loading, error, removeBlog } = useBlogs();

  // const [blogs, setBlogs] = useState(blogs);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "Visa Guide",
    "Travel Tips",
    "Destination Review",
    "News",
  ];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center gap-3 py-5">
        <FaNewspaper size={40} className="text-muted" />
        <h5 className="text-muted">Loading articles...</h5>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex flex-column align-items-center gap-3 py-5">
        <FaNewspaper size={40} className="text-muted" />
        <h5 className="text-muted">Failed to load articles</h5>
      </div>
    );
  }

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h3 className="fw-bold mb-1" style={{ color: "var(--primary-teal)" }}>
            Blog Articles
          </h3>
          <p className="text-muted small mb-0">
            Manage and publish your travel guides and news
          </p>
        </div>
        <div>
          <Link
            to="/admin/add-blog"
            className="btn shadow-sm px-4 py-2 rounded-pill fw-bold text-white"
            style={{ backgroundColor: "var(--primary-teal)" }}
          >
            <FaPlus className="me-2" /> Create Post
          </Link>
        </div>
      </div>

      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        placeholder="Search by article title..."
      />

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead style={{ backgroundColor: "var(--accent-alice-blue)" }}>
              <tr>
                <th className="ps-4 py-3 text-secondary small text-uppercase">
                  Article
                </th>
                <th className="py-3 text-secondary small text-uppercase">
                  Category
                </th>
                <th className="py-3 text-secondary small text-uppercase">
                  Author & Date
                </th>
                <th className="py-3 text-secondary small text-uppercase text-end pe-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.map((blog) => (
                <tr key={blog.id}>
                  <td className="ps-4">
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={blog.images[0]}
                        alt=""
                        className="rounded-3 shadow-sm"
                        style={{
                          width: "65px",
                          height: "45px",
                          objectFit: "cover",
                        }}
                      />
                      <div style={{ maxWidth: "350px" }}>
                        <h6 className="mb-0 fw-bold text-dark text-truncate">
                          {blog.title}
                        </h6>
                        <small className="text-muted">ID: #{blog.id.slice(0, 6)}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-light text-teal border px-3 py-2">
                      {blog.category}
                    </span>
                  </td>
                  <td>
                    <div className="small fw-bold text-dark">
                      <FaUser className="me-1 opacity-50" /> {blog.author}
                    </div>
                    <div className="small text-muted">
                      <FaCalendarAlt className="me-1 opacity-50" /> {blog.date}
                    </div>
                  </td>
                  <td className="text-end pe-4">
                    <div className="d-flex justify-content-end gap-2">
                      <button
                        onClick={() => navigate(`/admin/edit-blog/${blog.id}`)}
                        className="btn btn-sm btn-light border rounded-3 shadow-sm"
                      >
                        <FaEdit style={{ color: "var(--primary-teal)" }} />
                      </button>
                      <button onClick={() => removeBlog(blog.id)} className="btn btn-sm btn-light border rounded-3 shadow-sm">
                        <FaTrash style={{ color: "var(--secondary-coral)" }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBlog;
