import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { GT, GTE, diffData, timeDiff } from "../../helper/DateReleted";
import dayjs from 'dayjs';
import { Box, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Dashboard from './Dashboard';
import Standing from './Standing';
import AuthContext from '../../Context/AuthContext';
export const ContestDetails = () => {
    const { id } = useParams();
    const [contest, setContest] = useState([]);
    useEffect(() => {
        const fetchContestInfo = async () => {
            try {
                const api = process.env.REACT_APP_CONTEST_API + id;
                const response = await axios.get(api);
                // console.log(response);
                setContest(response.data.contest);
            } catch (err) {
                console.log(err);
            }
        }
        fetchContestInfo();
    }, [id]);
    const [currentTime, setCurrentTime] = useState(dayjs().toISOString());
    const [waitTime, setWaitTime] = useState([]);
    const [duration, setDuration] = useState([]);
    const { setContestRunning } = useContext(AuthContext);
    useEffect(() => {
        let interval = setInterval(() => {
            setCurrentTime(dayjs().toISOString());
            if (GTE(contest.startTime, currentTime)) {
                setContestRunning(false);
                setWaitTime(diffData(timeDiff(contest.startTime, currentTime)))
            } else {
                setContestRunning(true);
                setWaitTime([]);
                if (GTE(contest.endTime, currentTime)) {
                    setDuration(diffData(timeDiff(contest.endTime, currentTime)));
                } else {
                    setDuration([]);
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [contest.startTime, currentTime, contest.endTime, setContestRunning])
    const navigate = useNavigate();
    const [value, setValue] = useState('2');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <div>
            {GTE(currentTime, contest.startTime) ? (
                GT(currentTime, contest.endTime) ? (
                    navigate(-1)
                ) : (
                    <>
                        <div className='middle'>
                            <Box sx={{
                                width: '70%', typography: 'body1',
                            }}>
                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                                            <Tab label="Dashboard" value="2" />
                                            <Tab label="Standing" value="3" />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="2"> <Dashboard problems={contest.problems} contestID={contest._id} /> </TabPanel>
                                    <TabPanel value="3"> <Standing contestID={contest._id} />  </TabPanel>
                                </TabContext>
                            </Box>
                            <Box sx={{
                                width: '30%',
                                margin: '10px',
                                padding: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }} >
                                <Box sx={{
                                    padding: '50px',
                                    fontSize: '3em',
                                    color: 'dark',
                                }}>
                                    Contest ends in {duration}
                                </Box>
                            </Box>
                        </div>

                    </>
                )
            ) : (
                <div className='before middle'> Contest starts in {waitTime} </div>
            )}
        </div>
    )
};
