import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '~/Components/Auth/index';

function RequireAuth({ children }) {
    const location = useLocation();
    const auth = useAuth();

    const userToken = auth.getTokens();
    if (!auth.user && userToken === null) {
        return <Navigate to="/auth/login" state={{ path: location.pathname }} />;
    }
    return children;
}

export default RequireAuth;
