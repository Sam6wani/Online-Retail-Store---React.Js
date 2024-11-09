import React, { useState, useEffect } from 'react';
import {
    Text, Grid, Image, Card,CardBody, CardFooter, Heading, Divider, Stack, ButtonGroup,
    Button
  } from '@chakra-ui/react';
import Footer from './Footer';
import Nav from './Navbar';
import { fetchProducts, getCart } from '../api/repository';

const Specials = () => {


    const [specialProducts, setSpecialProducts] = useState([]);
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const user_mail = localStorage.getItem('email');

    const [userId, setUserId] = useState(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        return user ? user.user_id : null;
    });




    useEffect(() => {
        async function loadProducts() {
            try {
                const data = await fetchProducts();
                const special = data.filter((product) => product.isSpecial);
                setSpecialProducts(special);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        }
        async function loadCart() {
            if (userId) {
                try {
                    const cartData = await getCart(userId);
                    setCart(cartData);
                } catch (error) {
                    console.error("Failed to fetch cart:", error);
                }
            }
        }

        async function loadUser() {
            if (userId) {
                try {
                    const userData = await JSON.parse(localStorage.getItem("user"));
                    setUser(userData);
                } catch (error) {
                    console.error("Failed to fetch user:", error);
                }
            }
        }
        loadProducts();
        loadCart();
        loadUser();
    }, [userId]);


    return (
        <div>
            <Nav />
            {/* Special Deals section */}

            <Text fontSize="3xl" fontWeight="bold" m={5} textAlign="center" style={{ fontSize: '30px' }}>Special Deals of the Week.</Text>

            <hr />

            <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6} sx={{ paddingLeft: '50px' , marginBottom : "30px" }}>

                {specialProducts.map((deal, index) => (
                    <Card maxW='sm' key={deal.product_id} borderRadius="lg" overflow="hidden" boxShadow="lg" p="2">
                        <CardBody>
                            <Image
                                src={deal.image} alt={deal.name} height="210px" objectFit="cover" width='100%'
                                borderRadius='lg'
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md'>{deal.name}</Heading>
                                <Text color="gray.600" mb="2">{deal.description}</Text>
                                <Text color='blue.600' fontSize='2xl'>
                                    ${deal.price}
                                </Text>
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <ButtonGroup spacing='3'>
                                <Button variantColor="blue">
                                    Review
                                </Button>

                                <Button variant='solid' colorScheme="blue">
                                    Add to cart
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                ))}
            </Grid>
            <Footer />
        </div>
    );
};

export default Specials;
