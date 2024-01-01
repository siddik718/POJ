import React from 'react'
import { useParams } from 'react-router-dom'
import Standing from './Standing';

const OldContest = () => {
    const contestID = useParams().id;
  return (
    <Standing contestID={contestID}/>
  )
}

export default OldContest;