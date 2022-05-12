import { Navigate, Outlet } from 'react-router-dom';
import AuthServive from '../../services/auth.service';

const PrivateRoute: React.FC = (): JSX.Element => {
    return AuthServive.isUserLoggedIn() ? <Outlet /> : <Navigate to='/' />;
}
export default PrivateRoute;