import React from 'react'

import BugReportRoundedIcon from '@mui/icons-material/BugReportRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Container = styled(Box)({
    // border: '1px solid red',
    margin: '7px',
    padding: '8px'
})
const CategoryBox = styled(Box)({
    // border: '1px solid black',
    padding: '0 5px',
})
const CategoryTypography = styled(Typography)({
    color: '#510f0f',
    fontSize: '1.25rem',
    fontWeight: '600',
})
const ProblemsBox = styled(Box)({
    // border: '1px solid red',
    margin: '5px',
    padding: '5px',
})
const ProblemBox = styled(Box)({
    // border: '1px solid black',
    margin: '2px',
    padding: '0 15px',
    display: 'flex',
    alignItems: 'center',
})
const IconBox = styled(Box)({
    width: '5%',
    // border: '1px solid red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})
const ProblemTitleBox = styled(Box)({
    width: '90%',
    // border:'1px solid red',
    margin: '0 5px',
    borderRadius: '5px',
    padding: '0 10px',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
        backgroundColor: '#e0d2d2',
        cursor: 'pointer',
    },
})
const ProblemTitleTypography = styled(Typography)({
    color: "rgb(0 0 0 / 60%)",
    fontSize: '0.90rem',
})
const ProblemsList = ({ category, problems }) => {
    const navigate = useNavigate();
    return (
        <Container>
            <CategoryBox>
                <CategoryTypography>
                    {category.toUpperCase()}
                </CategoryTypography>
            </CategoryBox>
            <ProblemsBox>
                {problems.length > 0 && problems.map((problem) => (
                    <ProblemBox key={problem._id} >
                        <IconBox>
                            <BugReportRoundedIcon sx={{
                                color: "rgb(0 0 0 / 60%)",
                            }}/>
                        </IconBox>
                        <ProblemTitleBox onClick={()=>navigate(`/problems/${problem._id}`)}>
                            <ProblemTitleTypography>
                                {problem.title}
                            </ProblemTitleTypography>
                        </ProblemTitleBox>
                        <IconBox>
                            <MoreHorizIcon sx={{
                                color: "rgb(0 0 0 / 60%)",
                            }}/>
                        </IconBox>
                    </ProblemBox>
                ))}
            </ProblemsBox>
        </Container>
    )
}

export default ProblemsList;