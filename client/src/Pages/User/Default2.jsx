import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import AuthContext from '../../Context/AuthContext';
import axios from 'axios';
import { BarChart, DoughnutChart, PieChart } from '../../Components/Charts';
import { Box, Button, Typography, styled } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom'
import Stats from '../../Components/Stats';
const Container = styled(Box)({
    width: 'auto',
    height: '80vh',
    display: 'flex',
    margin: '10px'
});
const LeftBox = styled(Box)({
    flex: 4,
    marginRight: '10px',
    borderRadius: '35px',
    background: 'linear-gradient(180deg, rgba(236, 243, 250, 0.80) 0.02%, rgba(232, 240, 251, 0.80) 59.38%, rgba(230, 238, 251, 0.80) 99.98%)',
    padding: '30px',
});
const ProfileInfo = styled(Box)({
    width: '100%',
    height: '25%',
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
});
const ProfileInfoDetails = styled(Box)({
    flex: '8',
    margin: '2px',
    padding: '2px',
})
const UserName = styled(Box)({
    width: '100%',
    margin: '5px',
    padding: '5px',
    textAlign: 'center',
    color: 'rgba(15, 1, 1, 0.90)',
    fontFamily: 'Akaya Kanadaka',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
    letterSpacing: '5.92px',
});
const SendButtonBox = styled(Box)({
    width: '100%',
    margin: '5px',
    padding: '5px',
    textAlign: 'center',
});
const SendButton = styled(Button)({
    borderRadius: '51px',
    background: '#8FE2F4',
    color: '#845g45',
    transition: '0.3s',
    '&:hover': {
        color:'#fff',
        background:'#199c08',
    }
})
const ProfileStats = styled(Box)({
    width: '100%',
    height: '75%',
    marginTop: '5px',
    borderRadius: '24px',
    background: 'linear-gradient(180deg, #EBEBFB 2.17%, #E9F3F6 100%)',
});
const ProfileStatsUpper = styled(Box)({
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: '5px',
    color: '#080D21',
    fontFamily: 'Sunflower',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: '300',
    lineHeight: '16px', /* 88.889% */
    letterSpacing: '1.08px',
});
const ProfileStatsLower = styled(Box)({
    padding: '10px'
})
const RightBox = styled(Box)({
    flex: 8,
    marginLeft: '10px',
    height: '100%',
});
const UpperRight = styled(Box)({
    height: '48%',
    margin: '2px',
    display: 'flex',
});
const UpperRightBox = styled(Box)({
    width: '50%',
    margin: '2px',
});
const LowerRight = styled(Box)({
    height: '48%',
    margin: '2px',
});

export const Default2 = () => {
    const currentUserProfile = useParams().id;
    const { username } = useContext(AuthContext);
    const [stats, setStats] = useState({});
    useEffect(() => {
        const getAllData = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_USER_API + 'me/' + currentUserProfile);
                setStats(response.data);
                console.log(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        getAllData();
    }, [currentUserProfile]);

    const data = [stats.AC, stats.WA, stats.CE, stats.RE];
    const labels = ['Accepted', 'Wrong Answer', 'Compilation Error', 'Run Time Error'];

    const dataTwo = [stats.EASY, stats.EASY_MEDIUM, stats.MEDIUM, stats.HARD_MEDIUM, stats.HARD];
    const labelsTwo = ['Easy', 'Easy Medium', 'Medium', 'Hard Medium', 'Hard'];

    const dataThree = [stats.CPP, stats.PYTHON, stats.JAVA];
    const labelsThree = ['C++', 'Python', 'Java'];

    const navigate = useNavigate();
    const handleSendClick = (ID) => {
        navigate(`/message/${ID}`);
    }
    const ratio = (stats.submissions !== 0 ? ((stats.AC / stats.submissions) * 100).toFixed(2) : 0);
    return (
        <Container>
            <LeftBox>
                <ProfileInfo>
                    <ProfileInfoDetails >
                        <UserName>{currentUserProfile}</UserName>
                        <SendButtonBox>
                            {currentUserProfile !== username &&
                                <SendButton onClick={() => handleSendClick(stats.ID)}>
                                    Send Message
                                </SendButton>}
                        </SendButtonBox>
                    </ProfileInfoDetails>
                </ProfileInfo>
                <ProfileStats>
                    <ProfileStatsUpper>
                        <Typography>
                        DISCUSSION POINTS : {stats.blogs}
                        </Typography>
                        <Typography>
                            PROBLEM TRIED : {stats.submissions}
                        </Typography>
                        <Typography>
                        ACCEPTENCE RATIO :  {ratio}%
                        </Typography>
                    </ProfileStatsUpper>
                    <ProfileStatsLower>
                        <Stats 
                        dp={stats.DP} 
                        ms={stats.MS} 
                        ip={stats.IP} 
                        ss={stats.SS} 
                        at={stats.AT} 
                        />
                    </ProfileStatsLower>
                </ProfileStats>
            </LeftBox>
            <RightBox>
                <UpperRight>
                    <UpperRightBox>
                        <PieChart data={dataThree} labels={labelsThree} />
                    </UpperRightBox>
                    <UpperRightBox>
                        <DoughnutChart data={dataTwo} labels={labelsTwo} />
                    </UpperRightBox>
                </UpperRight>
                <LowerRight>
                    <BarChart data={data} labels={labels} />
                </LowerRight>
            </RightBox>
        </Container >
    )
}
