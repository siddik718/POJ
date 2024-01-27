import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
const TopBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
});
const InnerBox = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems:'center',
    marginBottom:'2px',
    padding: '5px',
    color: '#171414',
    fontFamily: 'Sunflower',
    fontSize: '13px',
    fontStyle: 'normal',
    fontWeight: '300',
})
const CustomTypography = styled(Typography) (({ theme }) =>({
    fontSize: '1.25vw',
    [theme.breakpoints.down('md')]: {
        fontSize:'2vw',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize:'2.5vw',
    },
}));

const Stats = ({ ip, ss, ms, dp, at, ga }) => {

    return (
        <TopBox>
            <CustomTypography variant="body1" color="primary">PROBLEM TRIED ON:</CustomTypography>
            <InnerBox>
                <CustomTypography>INTRODUCTORY PROBLEMS</CustomTypography>
                <CustomTypography>{ip} TRIED</CustomTypography>
            </InnerBox>
            <InnerBox>
                <CustomTypography>SORTING SEARCHING</CustomTypography>
                <CustomTypography>{ss} TRIED</CustomTypography>
            </InnerBox>
            <InnerBox>
                <CustomTypography>MATHEMATICS</CustomTypography>
                <CustomTypography>{ms} TRIED</CustomTypography>
            </InnerBox>
            <InnerBox>
                <CustomTypography>DYNAMIC PROGRAMMING</CustomTypography>
                <CustomTypography>{dp} TRIED</CustomTypography>
            </InnerBox>
            <InnerBox>
                <CustomTypography>GRAPH ALGORITHMS</CustomTypography>
                <CustomTypography>{ga} TRIED</CustomTypography>
            </InnerBox>
            <InnerBox>
                <CustomTypography>ADVANCED TECHNIQUES</CustomTypography>
                <CustomTypography>{at} TRIED</CustomTypography>
            </InnerBox>
        </TopBox>
    )
}

export default Stats;