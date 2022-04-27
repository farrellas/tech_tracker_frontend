import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const userAuthenticated = useSelector((state) => state.auth.user_authenticated);

    if (!userAuthenticated) {
        return <Navigate to="/login" />
    }
    return children;
};