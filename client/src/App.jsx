import { Routes, Route } from 'react-router-dom';

import { Navbar } from './Components/Navbar';
import { Footer } from './Components/Footer';

import { Login } from './Pages/Login';
import { Signup } from './Pages/Signup';

import { Home } from './Pages/Home';

import { Default } from './Pages/User/Default';
import { Discussions } from './Pages/User/Discussions';

import { Oneblog } from './Pages/Community/Oneblog';
import { Allblogs } from './Pages/Community/Allblogs';
import { Updateblog } from './Pages/Community/Updateblog';
import { Createblog } from './Pages/Community/Createblog';

import { Allproblem } from './Pages/Problems/Allproblem';
import { Oneproblem } from './Pages/Problems/Oneproblem';
import { Addproblem } from './Pages/Problems/Addproblem';
import { Submission } from './Pages/Problems/Submission';

import { AllSubmission } from './Pages/Submission/AllSubmission';
import { UserWise } from './Pages/Submission/UserWise';

import { ContestHome } from './Pages/Contest/ContestHome';
import { AddContest } from './Pages/Contest/AddContest';
import { ContestDetails } from './Pages/Contest/ContestDetails';

import { AuthProvider } from './Context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Messenger from './Pages/Messenger/Messenger';

import PageNotFound from './Pages/PageNotFound/PageNotFound';

import PrivateRoute from './Authoraization/PrivateRoute';
import PrivateRouteForContest from './Authoraization/PrivateRouteForContest';
import OldContest from './Pages/Contest/OldContest';
import { Default2 } from './Pages/User/Default2';

function App() {
  const googleClientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId={googleClientID}>
        <Navbar />
        <div style={{ minHeight: '88vh', display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path='/' element={<Home />} />

            {/* User Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route path='/me/:id' element={<Default2 />} />
              <Route path='community/view/:id' element={<Oneblog />} />
              <Route path='/community/update/:id' element={<Updateblog />} />
              <Route path="/community/create-blog" element={<Createblog />} />
              <Route path='/add-problem' element={<Addproblem />} />
              <Route path='/my/blogs' element={<Discussions />} />
              <Route path='/submissions/my/:id' element={<UserWise />} />
              <Route path='/contest/:id' element={<ContestDetails />} />
              <Route path='/add-contest' element={<AddContest />} />
            </Route>

            {/* Contest Running Private Routes */}
            <Route element={<PrivateRouteForContest />}>
              <Route path='/submissions' element={<AllSubmission />} />
              <Route path='message/:id' element={<Messenger />} />
            </Route>

            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />

            <Route path='/community' element={<Allblogs />} />
            <Route path='/problems' element={<Allproblem />} />
            <Route path='/problems/:id' element={<Oneproblem />} />

            {/* Submission Routes */}
            <Route path='/problems/submission/:id' element={<Submission />} />


            {/* Contest Routes */}
            <Route path='/contest' element={<ContestHome />} />
            <Route path='/standing/:id' element={<OldContest />} />

            <Route path='/*' element={<PageNotFound />} />

          </Routes>
          <Footer />
        </div>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}
export default App;
