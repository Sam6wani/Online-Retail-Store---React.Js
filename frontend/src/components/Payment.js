import React, { useState } from 'react';
import {
    Container,
    Heading,
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
} from '@chakra-ui/react';
import Footer from './Footer';
import Nav from './Navbar';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard } from '@fortawesome/free-brands-svg-icons';

const PaymentPage = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handlePayment = () => {
        if (!cardNumber || !expiryDate || !cvv) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        const isValidExpiryDate = /^((0[1-9])|(1[0-2]))\/\d{4}$/.test(expiryDate);
        if (!isValidExpiryDate) {
            setErrorMessage('Please enter a valid expiry date (MM/YYYY).');
            return;
        }

        const isValidCVV = /^\d{3,4}$/.test(cvv);
        if (!isValidCVV) {
            setErrorMessage('Please enter a valid CVV.');
            return;
        }

        Swal.fire({
            title: 'Payment Successful',
            text: 'Thank you for your payment!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            window.location.href = '/';
        }
        );        
    };

    return (
        <Container>
            <Nav />
            <Box borderWidth="1px" borderRadius="lg" p="30px" textAlign="center" boxShadow="lg" borderColor="gray.200">
                <Heading as="h1" mb="20px" textAlign="center" fontSize="3xl" fontWeight="bold" color="blue.600">Payment Details</Heading>
                <Box borderWidth="1px" borderRadius="lg" p="30px" textAlign="center" boxShadow="lg">
                    <FormControl mb="30px"> 
                        <Text fontSize="xl" fontWeight="bold" color="gray.700">Card Number</Text>
                        <Input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                    </FormControl>
                    <FormControl mb="30px"> 
                        <Text fontSize="xl" fontWeight="bold" color="gray.700">Expiry Date (MM/YYYY)</Text>
                        <Input type="text" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                    </FormControl>
                    <FormControl mb="30px"> 
                        <Text fontSize="xl" fontWeight="bold" color="gray.700">CVV</Text>
                        <Input
                            type="password"
                            value={cvv}
                            onChange={(e) => {
                                const inputCVV = e.target.value.replace(/\D/g, '');
                                if (inputCVV.length <= 3) {
                                    setCVV(inputCVV);
                                }
                            }}
                            inputMode="numeric"
                            maxLength={3}
                        />
                    </FormControl>
                    <Box mb="30px"> 
                        <FontAwesomeIcon icon={faCcVisa} style={{ fontSize: '2em', marginRight: '10px' }} />
                        <FontAwesomeIcon icon={faCcMastercard} style={{ fontSize: '2em' }} />
                    </Box>
                    {errorMessage && (
                        <Text color="red.500" mb="20px">{errorMessage}</Text>
                    )}
                    <Button
                        colorScheme="blue"
                        onClick={handlePayment}
                        fontSize="xl"
                        fontWeight="bold"
                        letterSpacing="wide"
                        boxShadow="md"
                        style={{
                            padding: "10px 20px",
                            borderRadius: "5px",
                            backgroundColor: "#3182CE",
                            color: "white",
                            cursor: "pointer",
                            transition: "background-color 0.3s",
                        }}
                        _hover={{ backgroundColor: "#2c5282" }}
                    >
                        Pay Now
                    </Button>

                </Box>
            </Box>
            <Footer />
        </Container>
    );
};

export default PaymentPage;
