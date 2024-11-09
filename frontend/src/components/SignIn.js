import React, { useState } from "react";
import {
    Container,
    Heading,
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Link,
    useToast,
    Fade
} from '@chakra-ui/react';
import Footer from './Footer';
import Nav from './NavbarLog';
import { Navigate, Link as RouterLink, useNavigate } from 'react-router-dom';
import { verifyUser, setUser } from "../api/repository";
import Navbar from "./Navbar";

const SignIn = ({ onSuccessfulSignin }) => {
    // State to store user credentials
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const toast = useToast(); // Toast notification

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = await verifyUser(credentials.username, credentials.password);
            if (user) {
                // Store user in localStorage
                setUser(user);
                toast({
                    title: "Successful Login",
                    description: `Welcome ${user.first_name} ${user.last_name}!`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-end"
                });
                // onSuccessfulSignin(user);
                navigate("/");
            } else {
                // If user is not found, display error toast
                toast({
                    title: "Error",
                    description: "Invalid username or password",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-end"
                });
            }
        } catch (error) {
            // Handle errors during the login process

            console.log(error)
            toast({
                title: "Error",
                description: "An error occurred during login",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-end"
            });
        }
    };


    return (
        <div>
            <Navbar />

            <Fade in={true}>
                <Box my={8}>
                    <Heading
                        as="h1"
                        size="lg"
                        fontFamily="'Josefin Sans', sans-serif"
                        textAlign="center"
                    >
                        Sign In
                    </Heading>
                    <Box
                        maxW={{ base: "90%", sm: "80%", md: "500px", lg: "400px" }}
                        mx="auto"
                        p={6}
                        boxShadow="lg"
                        borderRadius="lg"
                        bg="card"
                        textColor={"heading"}
                        borderColor={"beige"}
                    >
                        <form onSubmit={handleSubmit}>
                            <FormControl isRequired>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    type="text"
                                    name="text"
                                    value={credentials.username}
                                    onChange={(e) =>
                                        setCredentials({ ...credentials, username: e.target.value })
                                    }
                                />
                            </FormControl>
                            <FormControl isRequired mt={4}>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={(e) =>
                                        setCredentials({ ...credentials, password: e.target.value })
                                    }
                                />
                            </FormControl>
                            <Button
                                mt={4}
                                bg={"darkGreen"}
                                textColor={"white"}
                                _hover={{ bg: "lightGreen", textColor: "darkGreen" }}
                                type="submit"
                                alignItems={"center"}
                            >
                                Sign In
                            </Button>
                        </form>
                        <Box mt="20px" textAlign="center">
                            If you don't have an account, <Link as={RouterLink} to="/signup" color="#007bff" fontWeight="bold">Sign up here.
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Fade>




            <Footer />
        </div>
    );
};

export default SignIn;
