import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: JSX.Element;
    allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    // Prefer the token from Redux state but fall back to localStorage (avoids race conditions)
    let token = useSelector((state: any) => state.jwt) as string | undefined;
    if (!token || token === "") {
        token = localStorage.getItem("token") || undefined;
    }

    // If no token at all, redirect to login
    if (!token) return <Navigate to="/login" />;

    // Extract account type from token claims (more reliable than ad-hoc localStorage value)
    let type = (localStorage.getItem("accountType") || "");
    try {
        // lightweight JWT payload decode (avoids adding runtime dependency and TS import issues)
        const parts = (token as string).split('.');
        if (parts.length >= 2) {
            const payload = parts[1];
            // atob is available in browsers; handle URL-safe base64
            const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
            const decodedJson = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            const decoded = JSON.parse(decodedJson);
            if (decoded && decoded.accountType) type = decoded.accountType;
        }
    } catch (e) {
        // If decoding fails, fall back to whatever is stored in localStorage (or empty string)
        // Do not block navigation here; validation will be enforced by backend endpoints.
    }

    if (allowedRoles && !allowedRoles.includes(type)) return <Navigate to="/unauthorized" />;

    return children;
}
export default ProtectedRoute;