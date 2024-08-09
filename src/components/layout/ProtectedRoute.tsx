import { ReactNode } from "react";
import { usePHSelector } from "../../redux/hooks";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const token = usePHSelector(useCurrentToken);
    if (!token) {
        return <Navigate to="/login" replace={true} />;
    }
    return children;
};

export default ProtectedRoute;
