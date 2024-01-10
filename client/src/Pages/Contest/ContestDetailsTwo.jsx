import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GT, GTE, diffData, timeDiff } from "../../helper/DateReleted";
import { Box, Container, CssBaseline, Tab, Typography, styled } from '@mui/material'
import { deleteContestData } from "../../helper/contestHelper";
import Standing from "./Standing";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Dashboard from "./Dashboard";

const ContestWaitBox = styled(Box)({
    height: 'calc(100vh - 90px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
})
const ContestWaitTypography = styled(Typography)({
    fontSize: '3rem',
    color: '#4578aa'
})
const ContestOngoing = styled(Box)({
    height: 'calc(100vh - 88px)',
    display: 'flex',
})
const ContestOngoingRightBox = styled(Box)({
    width: '75%',
    padding: '5px',
})
const ContestOngoingLeftBox = styled(Box)({
    width: '25%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
})
const ContestRemainingTypography = styled(Typography)({
    padding: '10px',
    fontSize: '1.25rem',
    border: '1px solid #ddd',
    color: '#ff364c',
    fontWeight: '600',
})

const ContestDetailsTwo = () => {
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
    useEffect(() => {
        let interval = setInterval(() => {
            setCurrentTime(dayjs().toISOString());
            if (GTE(contest.startTime, currentTime)) {
                setWaitTime(diffData(timeDiff(contest.startTime, currentTime)))
            } else {
                setWaitTime([]);
                if (GTE(contest.endTime, currentTime)) {
                    setDuration(diffData(timeDiff(contest.endTime, currentTime)));
                } else {
                    setDuration([]);
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [contest.startTime, currentTime, contest.endTime])
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    return (
        <Container maxWidth="xl">
            <CssBaseline />
            <Box>
                {GTE(currentTime, contest.startTime) ? (
                    GT(currentTime, contest.endTime) ? (
                        // contest ended.
                        <Box>
                            {deleteContestData()}
                            <Standing contestID={contest._id} />
                        </Box>
                    ) : (
                        <ContestOngoing>
                            <ContestOngoingRightBox>
                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList onChange={handleChange}>
                                            <Tab label="Dashboard" value="1" />
                                            <Tab label="Standing" value="2" />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="1"> <Dashboard problems={contest.problems} contestID={contest._id} /> </TabPanel>
                                    <TabPanel value="2"> <Standing contestID={contest._id} />  </TabPanel>
                                </TabContext>
                            </ContestOngoingRightBox>
                            <ContestOngoingLeftBox>
                                <ContestRemainingTypography>
                                    Contest Ends In {duration}
                                </ContestRemainingTypography>
                            </ContestOngoingLeftBox>
                        </ContestOngoing>
                    )
                ) : (
                    <ContestWaitBox>
                        <ContestWaitTypography>
                            Contest Starts In {waitTime}
                        </ContestWaitTypography>
                    </ContestWaitBox>
                )}
            </Box>
        </Container>
    )
}

export default ContestDetailsTwo;