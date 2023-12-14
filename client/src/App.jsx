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

import { AuthProvider } from './Context/AuthContext';

import PrivateRoute from './Authoraization/PrivateRoute';


function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div style={{ minHeight: '88vh', display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route element={<PrivateRoute />}>
            <Route path='/me/:id' element={<Default />} />
            <Route path='community/view/:id' element={<Oneblog />} />
            <Route path='/community/update/:id' element={<Updateblog />} />
            <Route path="/community/create-blog" element={<Createblog />} />
            <Route path='/problems/submission/:id' element={<Submission />} />
            <Route path='/add-problem' element={<Addproblem />} />
            <Route path='/my/blogs' element={<Discussions />} />
            <Route path='/submissions/my/:id' element={<UserWise />} />
          </Route>


          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/community' element={<Allblogs />} />
          <Route path='/problems' element={<Allproblem />} />
          <Route path='/problems/:id' element={<Oneproblem />} />

          {/* Submission Routes */}
          <Route path='/submissions' element={<AllSubmission />} />



        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}
export default App;
