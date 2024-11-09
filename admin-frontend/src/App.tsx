import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Dashbord';
import Users from './pages/Users';


import Products from './pages/Products';
import Settings from './pages/Reviews';


function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        
        <Route
          index
          path="/dashboard"
          element={
            <>
              <PageTitle title="dashboard " />
              <Calendar />
            </>
          }
        />
        <Route
          path="/product"
          element={
            <>
              <PageTitle title="product " />
              <Products />
            </>
          }
        />

        <Route
          path="/reviews"
          element={
            <>
              <PageTitle title="reviews " />
              <Settings />
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              <PageTitle title="users " />
              <Users />
            </>
          }
        />
       
        
        {/* <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin " />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup " />
              <SignUp />
            </>
          }
        /> */}
      </Routes>
    </>
  );
}

export default App;
