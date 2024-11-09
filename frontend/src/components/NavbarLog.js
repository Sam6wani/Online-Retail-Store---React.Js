import React from 'react';
import { Flex, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <Flex as="nav" align="center" justify="space-between" bg="#212121" p="4">
      <Link as={RouterLink} to="/" fontSize="2xl" fontWeight="bold" color="#FFA500" textDecoration="none">
      SOIL - Organic Food Grocer
      </Link>
      <Flex align="center">
        <NavLink to="/">Home</NavLink>        
        <NavLink to="/SignIn">Login</NavLink>
        <NavLink to="/SignUp">Register</NavLink>
      </Flex>
    </Flex>
  );
};

const NavLink = ({ to, children }) => {
  return (
    <Link as={RouterLink} to={to} color="#fff" mx="1rem" textDecoration="none">
      <Text fontSize="lg">{children}</Text>
    </Link>
  );
};

export default Navbar;
