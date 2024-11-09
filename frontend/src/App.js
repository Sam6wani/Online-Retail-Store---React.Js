import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { Grid, GridItem, useToast } from "@chakra-ui/react";
import HomePage from './components/HomePage';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import Specials from './components/Specials';
import SmallScaleFarmingInfo from './components/SmallScaleFarmingInfo';
import Cart from './components/Cart';
import PaymentPage from './components/Payment';
import DietFeature from './components/DietFeature';
import { Fade } from "@chakra-ui/transition";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OrderSummary from './components/OrderSummary';



function App() {

  const toast = useToast();
  const [currentView, setCurrentView] = useState("main");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUser(loggedInUser);
    }
  }, []);

  const changeView = (view) => {
    setCurrentView(view);
  };

  const handleAuthSuccess = (user) => {
    setIsLoggedIn(true);
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    setCurrentView("main"); // Redirect to the home page
  };



  useEffect(() => {
    // Check if the account deletion was successful
    if (localStorage.getItem("accountDeletionSuccess") === "true") {
      toast({
        title: "Successful Account Deletion",
        description: "Account has been successfully deleted.",
        status: "success", // Use 'success' instead of 'error' for successful deletion.
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      // Remove the flag to prevent the toast from appearing again on subsequent loads
      localStorage.removeItem("accountDeletionSuccess");
    }
  }, [toast]);

  return (
    
    // All routes paths in system
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Specials" element={<Specials />} />
        <Route path="/SmallScaleFarmingInfo" element={<SmallScaleFarmingInfo />} />
        {/* <Route path="/Cart" element={<Cart />} /> */}
        <Route path="/PaymentPage" element={<PaymentPage />} />
        <Route path="/DietFeature" element={<DietFeature />} />
        <Route path="/OrderSummary" element={<OrderSummary />} />

      </Routes>
    </Router>
  );
}

export default App;
