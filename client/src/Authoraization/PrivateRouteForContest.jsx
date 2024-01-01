import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from 'axios';
const PrivateRouteForContest = () => {
    const [contestRunning , setContestRunning] = useState(false);
    useEffect(()=>{
        const nowAny = async() => {
            try {
                const api = process.env.REACT_APP_CONTEST_API + 'now';
                const res = await axios.get(api);
                setContestRunning(res.data.running);
            } catch (error) {
                console.log(error);
            }
        }
        nowAny();
    },[])
    return !contestRunning ? <Outlet /> : <Navigate to='/pageNotFound' />
}
export default PrivateRouteForContest;