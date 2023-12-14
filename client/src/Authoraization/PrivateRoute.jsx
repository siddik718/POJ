import { Navigate, Outlet } from "react-router-dom";
import { haveData } from "./Auth";
const PrivateRoute = () => {
    const isLoggedIn = haveData();
    return isLoggedIn ? <Outlet /> : <Navigate to='/login' />
}
export default PrivateRoute;