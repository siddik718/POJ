import React from 'react'
import './Contest.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Dashboard = ({ problems,contestID }) => {
  const navigate = useNavigate();
  const handleClick = async (title,index)=>{
    try {
      const api = process.env.REACT_APP_PROBLEM_API + "/getByName";
      const res = await axios.get(api,{
        params: {title}
      })
      const data = {
        problemNO: index,
        contestID,
      }
      navigate(`/problems/${res.data._id}`,{ state: data});
    }catch(err) {
      console.log(err);
    }
  }
  return (
    <div className='problems'>
      {problems && problems.length > 0 && problems.map((problem, index) => (
        <div key={index} className='problem' onClick={ () => handleClick(problem,index) }>
          Problem #{index + 1} : {problem}
        </div>
      ))}
    </div>
  )
}

export default Dashboard