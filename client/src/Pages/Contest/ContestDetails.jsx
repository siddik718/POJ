import React, { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import { GT, GTE, diffData, timeDiff } from "../../helper/DateReleted";
import dayjs from 'dayjs';

export const ContestDetails = () => {
    const { id } = useParams();
    const [contest,setContest] = useState([]);
    useEffect(()=>{
        const fetchContestInfo = async () => {
            try {
                const api = process.env.REACT_APP_CONTEST_API+id;
                const response = await axios.get(api);
                // console.log(response);
                setContest(response.data.contest);
            }catch(err){
                console.log(err);
            }
        }
        fetchContestInfo();
    },[id]);
    const [currentTime, setCurrentTime] = useState(dayjs().toISOString());

    const [waitTime,setWaitTime] = useState([]);
    const [duration,setDuration] = useState([]);
    useEffect(() => {
      let interval = setInterval(() => {
        setCurrentTime(dayjs().toISOString()); 
        if(GTE(contest.startTime,currentTime)) {
            setWaitTime(diffData(timeDiff(contest.startTime,currentTime)))
        }else {
            setWaitTime([]);
            if(GTE(contest.endTime,currentTime)) {
                setDuration(diffData(timeDiff(contest.endTime,currentTime)));
            }else {
                setDuration([]);
            }
        }
      }, 1000);
    
      return () => clearInterval(interval); 
    }, [contest.startTime,currentTime,contest.endTime])
    const navigate = useNavigate();
    return (
        <div>
            {waitTime}
            <br/>
            {duration}
            {GTE(currentTime,contest.startTime) ? (
                GT(currentTime,contest.endTime) ? (
                    navigate(-1)
                ) : (
                    <>
                <div> contest ends in { duration } </div>
            
                </>
                )
            ) : (
                <div> contest starts in { waitTime } </div>
            )}
        </div>
    )
};
