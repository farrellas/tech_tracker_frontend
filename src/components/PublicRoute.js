import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PublicRoute({ children }) {
    const userAuthenticated = useSelector((state) => state.auth.user_authenticated);

    if (userAuthenticated) {
        return <Navigate to="/dashboard" />
    }
    return children;
};