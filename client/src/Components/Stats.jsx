import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
const TopBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
});
const InnerBox = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px',
    color: '#171414',
    fontFamily: 'Sunflower',
    fontSize: '13px',
    fontStyle: 'normal',
    fontWeight: '300',
    lineHeight: 'normal',
    letterSpacing: '0.78px',
})
const Stats = ({ ip, ss, ms, dp, at }) => {

    return (
        <TopBox>
            <Typography variant="body1" color="primary">Problem Solved On:</Typography>
            <InnerBox>
                <Typography>INTRODUCTORY PROBLEMS</Typography>
                <Typography>{ip} solved</Typography>
            </InnerBox>
            <InnerBox>
                <Typography>SORTING SEARCHING</Typography>
                <Typography>{ss} solved</Typography>
            </InnerBox>
            <InnerBox>
                <Typography>MATHEMATICS</Typography>
                <Typography>{ms} solved</Typography>
            </InnerBox>
            <InnerBox>
                <Typography>Dynamic Programming</Typography>
                <Typography>{dp} solved</Typography>
            </InnerBox>
            <InnerBox>
                <Typography>ADVANCED TECHNIQUES</Typography>
                <Typography>{at} solved</Typography>
            </InnerBox>
        </TopBox>
    )
}

export default Stats;