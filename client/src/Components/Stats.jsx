import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
const TopBox = styled(Box)({
    display:'flex',
    flexDirection:'column',
});
const InnerBox = styled(Box)({
    display:'flex',
    justifyContent:'space-between',
    padding:'5px',
    color: '#171414',
    fontFamily: 'Sunflower',
    fontSize: '13px',
    fontStyle: 'normal',
    fontWeight: '300',
    lineHeight: 'normal',
    letterSpacing: '0.78px',
})
const Stats = ({dp,dfs,bs,nt,basic}) => {

    return (
        <TopBox>
            <Typography variant="body1" color="primary">Problem Solved On:</Typography>
            <InnerBox>
                <Typography>Dynamic Programming</Typography>
                <Typography>{dp} solved</Typography>
            </InnerBox>
            <InnerBox>
                <Typography>BFS & DFS</Typography>
                <Typography>{dfs} solved</Typography>
            </InnerBox>
            <InnerBox>
                <Typography>Binary Search</Typography>
                <Typography>{bs} solved</Typography>
            </InnerBox>
            <InnerBox>
                <Typography>Number Theory</Typography>
                <Typography>{nt} solved</Typography>
            </InnerBox>
            <InnerBox>
                <Typography>Basic Implementation</Typography>
                <Typography>{basic} solved</Typography>
            </InnerBox>
        </TopBox>
    )
}

export default Stats;