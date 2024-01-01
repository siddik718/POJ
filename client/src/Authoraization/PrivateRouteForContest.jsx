import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
const PrivateRouteForContest = () => {
    const {contestRunning} = useContext(AuthContext);
    console.log('Contest Running : ', contestRunning)
    return !contestRunning ? <Outlet /> : <Navigate to='/pageNotFound' />
}
export default PrivateRouteForContest;