import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = ({ id }) => {
  return (
    <>
    <NavLink to={`/contest/${id}`}>
        Problems
    </NavLink>
    <NavLink to={`/contest/standing`}>
        Standing
    </NavLink>
    <Outlet/>
    </>
  )
}
export default Dashboard;