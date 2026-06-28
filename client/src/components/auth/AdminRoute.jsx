import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>; 

    if (!user || user.role !== "Super Admin") {
        return <Navigate to="/admin" replace />; 
    }

    return children;
};

export default AdminRoute;