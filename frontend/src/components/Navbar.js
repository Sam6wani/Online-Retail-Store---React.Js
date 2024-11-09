import React, { useEffect, useState } from 'react';
import { Flex, Link, Text } from '@chakra-ui/react';
import { Navigate, Link as RouterLink, useNavigate } from 'react-router-dom';
import { Router } from 'react-router-dom';
import { getUser, removeUser } from '../api/repository';

const Navbar = ({ changeView, isLoggedInUser }) => {

  const navigate = useNavigate();
  const [user, setUser] = useState();

  const handleLogout = () => {
    removeUser(); // Clear the logged-in user's state
    setUser(null);
    window.location.href = "/";
    console.log("logout")
  };

  useEffect(() => {
    const user = getUser();
    setUser(user);
    // if (user == null) {
    //   //
    // }
  }, []);



  return (

    
      <Flex as="nav" align="center" justify="space-between" bg="#212121" p="4">
        <Link as={RouterLink} to="/" fontSize="2xl" fontWeight="bold" color="#FFA500">
          SOIL - Organic Food Grocer
        </Link>
        <Flex align="center">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/Specials">Specials</NavLink>

          {user != null ? (
            <>
              {/* <NavLink to="/Cart">Cart</NavLink> */}
              <NavLink to="/SmallScaleFarmingInfo">Small Scale Farming Info</NavLink>
              <NavLink to="/DietFeature">DietFeature</NavLink>
              <NavLink to="/Profile">Profile</NavLink>
              <NavLink onClick={handleLogout}>Logout</NavLink>
            </>
            

          ) : (
            <NavLink to="/SignIn">Login</NavLink>
          )}


        </Flex>
      </Flex>)
};

const NavLink = ({ to, children, onClick }) => {
  return (
    <Link
      as={RouterLink}
      to={to}
      color="#fff"
      mx="1rem"
      textDecoration="none"
      onClick={onClick}
    >
      <Text fontSize="lg">{children}</Text>
    </Link>
  );
};

export default Navbar;
