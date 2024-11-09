import React from 'react';
import { Box, Grid, Text, Link } from '@chakra-ui/react';
import { EmailIcon, PhoneIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box bg="#212121" color="white" py={8} textAlign="center" p={10}>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gap={10} justifyContent="center">
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}> SOIL - Organic Food Grocer</Text>
          <Text fontSize="md">
            Welcome to SOIL - Organic Food Grocer, your one-stop destination for the freshest organic produce. Explore our wide range of products and start living a healthier lifestyle today!
          </Text>
        </Box>
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>Useful Links</Text>
          <Text fontSize="md">
            <Link as={RouterLink} to="#" textDecoration="none" color="white" display="block" mb={2}>Affiliate</Link>          
            <Link as={RouterLink} to="#" textDecoration="none" color="white" display="block" mb={2}>Privacy Policy</Link>
            <Link as={RouterLink} to="#" textDecoration="none" color="white" display="block" mb={2}>Careers</Link>
          </Text>
        </Box>
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>Contact</Text>
          <Text fontSize="md">
            <Text mb={2}><ExternalLinkIcon mr={2} />Vauxhall Street, Union Place, USA</Text>
            <Text mb={2}><EmailIcon mr={2} />soil@gmail.com</Text>
            <Text mb={2}><PhoneIcon mr={2} />+1 11 90 2903</Text>
            <Text><ExternalLinkIcon mr={2} />+1 33 78 9029</Text>
          </Text>
        </Box>        
      </Grid>
      <Text mt={8} fontSize="md">&copy; 2024 SOIL - All rights reserved</Text>      
    </Box>
  );
};

export default Footer;
