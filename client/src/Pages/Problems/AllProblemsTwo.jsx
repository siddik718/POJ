import React, { useContext, useEffect, useState } from 'react'
import { Box, Container, CssBaseline, styled } from '@mui/material'
import axios from 'axios';
import ProblemsList from '../../Components/ProblemsList';
import { LoadingPage } from '../../Components/LoadingPage';
import TopBar from '../../Components/TopBar';
import AuthContext from '../../Context/AuthContext';

const ContainerBox = styled(Box)({
    // border:'1px solid red',
    margin: '15px 0',
    padding: '15px',
})
const AllProblemsTwo = () => {

    const [loading, setLoading] = useState(true);
    const [dynamicProgramming, setDynamicProgramming] = useState([]);
    const [advancedTechniques, setAdvancedTechniques] = useState([]);
    const [mathematics, setMathematics] = useState([]);
    const [sortingSearching, setSortingSearching] = useState([]);
    const [introductoryProblems, setIntroductoryProblems] = useState([]);

    useEffect(() => {
        const fetchProblems = async () => {
          const response = await axios.get(process.env.REACT_APP_PROBLEM_API);
          const problems = response.data;
          setDynamicProgramming(problems.DP);
          setAdvancedTechniques(problems.AT);
          setMathematics(problems.MS);
          setSortingSearching(problems.SS);
          setIntroductoryProblems(problems.IP);
          setLoading(false);
        }
        fetchProblems();
      }, []);
      const { isAdmin } = useContext(AuthContext);
    return (
        <Container maxWidth="md">
            <CssBaseline/>
            <ContainerBox>
                <TopBar 
                navigationLocation={"/add-problem"} headingContent={"POJ Problemsets"}
                toolTipTitle={"Add A New Problem"} isAdmin={isAdmin}
                />
                {loading && <LoadingPage />}
                <ProblemsList category={"introductory Problems"} problems={introductoryProblems} />
                <ProblemsList category={"sorting Searching"} problems={sortingSearching} />
                <ProblemsList category={"mathematics"} problems={mathematics} />
                <ProblemsList category={"dynamic Programming"} problems={dynamicProgramming} />
                <ProblemsList category={"advanced Techniques"} problems={advancedTechniques} />
            </ContainerBox>
        </Container>
    )
}

export default AllProblemsTwo;