import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Heading,
  SimpleGrid,
  Flex,
  Spacer,
  Button,
  Image,
  Divider,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Skeleton,
  useToast,
  Grid,
  IconButton,
  Card,
  CardBody,
  Stack,
  CardFooter,
  ButtonGroup,

} from '@chakra-ui/react';

import {
  fetchProducts,
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReviewByUser,
  deleteReviewByAdmin,
} from "../api/repository";

import { ArrowBackIcon, ArrowForwardIcon, MinusIcon } from '@chakra-ui/icons';
import Footer from './Footer';
import Nav from './Navbar';
import { Navigate } from 'react-router-dom';
import CreditCardForm from './CreditCardForm';
import ReviewModal from './ReviewModal';

const HomePage = () => {

  const [specialProducts, setSpecialProducts] = useState([]);
  const [regularProducts, setRegularProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);




  const [activeStep, setActiveStep] = useState(0);
  const user_mail = localStorage.getItem('email');


  const [userId, setUserId] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    return user ? user.user_id : null;
  });

  const handlePrevSlide = () => {
    setActiveStep((prevStep) => (prevStep === 0 ? carouselImages.length - 1 : prevStep - 1));
  };

  const handleNextSlide = () => {
    setActiveStep((prevStep) => (prevStep === carouselImages.length - 1 ? 0 : prevStep + 1));
  };

  const carouselImages = [
    'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1533478583204-680d4ff74891?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  const toast = useToast();
  const {
    isOpen: isCheckoutOpen,
    onOpen: onCheckoutOpen,
    onClose: onCheckoutClose,
  } = useDisclosure();

  //reviews test code
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleReviewButtonClick = (product) => {
    console.log("Review button clicked for product:", product);
    setIsReviewModalOpen(true);
    setSelectedProductId(product.product_id);
  };

  useEffect(() => {
    console.log("selectedProductId after click:", selectedProductId);
  }, [selectedProductId]);


  const handleRemoveFromCart = async (product) => {
    try {
      await removeFromCart(userId, product.product_id, 1);
      const updatedCart = await getCart(userId);
      setCart(updatedCart);

      const updatedProducts = await fetchProducts();
      const special = updatedProducts.filter((product) => product.isSpecial);
      const regular = updatedProducts.filter((product) => !product.isSpecial);
      setSpecialProducts(special);
      setRegularProducts(regular);

      toast({
        title: "Removed from Cart",
        description: `${product.name} has been removed from your cart.`,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-end"
      });
    } catch (error) {
      console.error("Failed to remove product from cart:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart(userId);
      const updatedCart = await getCart(userId);
      setCart(updatedCart);

      const updatedProducts = await fetchProducts();
      const special = updatedProducts.filter((product) => product.isSpecial);
      const regular = updatedProducts.filter((product) => !product.isSpecial);
      setSpecialProducts(special);
      setRegularProducts(regular);

      toast({
        title: "Cart Cleared",
        description: "All items have been removed from your cart.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-end"
      });
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      setUserId(user ? user.user_id : null);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        const special = data.filter((product) => product.isSpecial);
        const regular = data.filter((product) => !product.isSpecial);
        setSpecialProducts(special);
        setRegularProducts(regular);
        setIsLoaded(true);
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

  const handleAddToCart = async (product) => {
    try {

      console.log("product");
      console.log(product);
      await addToCart(userId, product.product_id);
      const updatedCart = await getCart(userId);
      setCart(updatedCart);

      console.log("updatedCart");
      console.log(updatedCart);

      const updatedProducts = await fetchProducts();
      const special = updatedProducts.filter((product) => product.isSpecial);
      const regular = updatedProducts.filter((product) => !product.isSpecial);
      setSpecialProducts(special);
      setRegularProducts(regular);

      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-end"
      });
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };



  const CartItems = ({ cart }) => {

    console.log("Card Lenth");
    console.log(cart.length);
    return (
      <>
        {cart.map((item, index) => (
          <Flex
            key={index}
            alignItems="center"
            justifyContent="space-between"
            // position="absolute"
            mb={3}
          >
            <Flex alignItems="center">
              <Tooltip label="Remove from Cart" fontSize="xs">
                <Button
                  onClick={() =>
                    handleRemoveFromCart({
                      product_id: item.product_id,
                      name: item.Product.name,
                      quantity: item.quantity,
                    })
                  }
                  colorScheme="red"
                  size="xs"
                  height="18px"
                  width="18px"
                  fontSize="10px"
                  mr={2}
                >
                  <MinusIcon />
                </Button>
              </Tooltip>
              <Text fontSize="2xl" color="heading" mr={2}>
                {item.quantity}
              </Text>
              <Text fontSize="2xl" color="lightGreen" mr={2}>
                x
              </Text>
              <Text fontWeight="bold" color="text" mr={2}>
                {item.Product.name}
              </Text>
            </Flex>
            <Text color="middleGreen">
              $
              {(
                (item.Product.isSpecial
                  ? item.Product.specialPrice
                  : item.Product.price) * item.quantity
              ).toFixed(2)}
            </Text>
          </Flex>
        ))}
        <Divider borderColor="lightGreen" />
        <Flex justifyContent="space-between" mt={5}>
          <Text fontSize="xl" fontWeight="bold" color={"heading"}>
            Total:
          </Text>
          <Text fontSize="xl" color={"heading"}>
            $
            {cart
              .reduce(
                (total, item) =>
                  total +
                  (item.Product.isSpecial
                    ? item.Product.specialPrice
                    : item.Product.price) *
                  item.quantity,
                0
              )
              .toFixed(2)}
          </Text>
        </Flex>
        <Flex mt={5} justifyContent="space-between">
          <Button colorScheme="red" onClick={handleClearCart}>
            Clear Cart
          </Button>
          <Button colorScheme="blue" onClick={onCheckoutOpen}>
            Checkout
          </Button>
        </Flex>
      </>
    );
  };

  return (
    <div>
      {/* {user != null ? (
        <NavBar />
      ) : (
        <Nav />
      )} */}

      {/* {(!user) ? 
        (return <Navigate to={"/"})/>
        ) : (<></>)} */}

      {/* If no user is found, display a message indicating that no user information is available. */}

      <Nav />

      <Box p={4}>
        <Text pt="10px" fontSize="50px" textAlign="center" fontWeight="bold">
          Welcome to SOIL - Organic Food Grocer
        </Text>
        <hr style={{ width: '60%', margin: 'auto' }} />
        <Grid justifyContent="center">
          <Grid item xs={12} lg={'auto'}>
            <Box position="relative" mt={4} mb={4} display="flex" justifyContent="center" alignItems="center">
              <Box position="relative">
                {carouselImages.map((image, index) => (
                  <Box key={index} display={activeStep === index ? 'block' : 'none'}>
                    <Image src={image} alt={`Carousel Image ${index + 1}`} height="700px" borderRadius="md" />
                  </Box>
                ))}
                <Text
                  position="absolute"
                  textAlign="center"
                  bg="rgba(0, 0, 0, 0.7)"
                  color="#fff"
                  p={4}
                  width="85%"
                  left="50%"
                  top="50%"
                  transform="translate(-50%, -50%)"
                  borderRadius="md"
                >
                  <Text as="h3" fontSize="2xl" fontWeight="bold" mb={2}>
                    SOIL - Organic Food Grocer
                  </Text>
                  <Text fontSize="lg" fontWeight="light">

                    "Welcome to SOIL - your premium destination for organic goodness! At SOIL, we're dedicated to providing the finest selection of organic foods, curated with care to nourish both body and soul. Explore our extensive range of fresh produce and nutritious offerings, handpicked to support a healthy lifestyle. Whether you're seeking wholesome ingredients for your next meal or expert advice on nutrition and small-scale farming, SOIL has you covered. Join us on a journey towards a healthier, more sustainable future. Start exploring now!"
                  </Text>
                </Text>

                <IconButton
                  position="absolute"
                  left={2}
                  top="50%"
                  transform="translateY(-50%)"
                  bg="rgba(0, 0, 0, 0.7)"
                  borderRadius="50%"
                  p={2}
                  _hover={{ bg: 'rgba(0, 0, 0, 0.8)' }}
                  onClick={handlePrevSlide}
                >
                  <ArrowBackIcon />
                </IconButton>
                <IconButton
                  position="absolute"
                  right={2}
                  top="50%"
                  transform="translateY(-50%)"
                  bg="rgba(0, 0, 0, 0.7)"
                  borderRadius="50%"
                  p={2}
                  _hover={{ bg: 'rgba(0, 0, 0, 0.8)' }}
                  onClick={handleNextSlide}
                >
                  <ArrowForwardIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <hr />

        {/* Special Deals section */}

        <Text fontSize="3xl" fontWeight="bold" mb={4} textAlign="center" style={{ fontSize: '30px' }}>Special Deals of the Week.</Text>

        <hr />

        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6} sx={{ paddingLeft: '50px' }}>

        {/* <Flex direction="row" justify="space-between">
          <Box maxWidth="1100" margin="0 auto"> */}
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
                    <Button variantColor="blue"
                      onClick={() => handleReviewButtonClick(deal)}>
                      Review
                    </Button>

                    <Button variant='solid' colorScheme="blue"
                      onClick={() => handleAddToCart(deal)}>
                      Add to cart
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            ))}
            </Grid>



            {cart.length > 0 && (
              <Box
                position="relative"
                top={10}
                bottom={10}
                ml={"30%"}
                mb={10}
                p={5}
                shadow="lg"
                borderWidth="1px"
                borderRadius="lg"
                borderColor={"beige"}
                transition="all 0.2s"
                _hover={{ transform: "scale(1.005)" }}
                width={{ base: "50vw", lg: "30vw", xl: "40vw" }}
                // flexShrink={0}
                alignSelf="center"

              >
                <Heading as="h3" size="lg" mb={4} textColor={"heading"}>
                  Cart
                </Heading>
                <CartItems cart={cart} />
                <Modal
                  isOpen={isCheckoutOpen}
                  onClose={onCheckoutClose}
                  size="3xl"
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>
                      {user.first_name} {user.last_name}'s Cart
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Flex direction="row" justify="space-between">
                        <Box flex="1" mr="2">
                          {cart.length > 0 ? (
                            cart.map((item, index) => (
                              <Flex
                                key={index}
                                alignItems="center"
                                justifyContent="space-between"
                                mb={3}
                              >
                                <Flex alignItems="center">
                                  <Text fontSize="2xl" color="heading" mr={2}>
                                    {item.quantity}
                                  </Text>
                                  <Text fontSize="2xl" color="lightGreen" mr={2}>
                                    x
                                  </Text>
                                  <Text fontWeight="bold" color="text" mr={2}>
                                    {item.Product.name}
                                  </Text>
                                </Flex>
                                <Text color="middleGreen">
                                  $
                                  {(
                                    (item.Product.isSpecial
                                      ? item.Product.specialPrice
                                      : item.Product.price) * item.quantity
                                  ).toFixed(2)}
                                </Text>
                              </Flex>
                            ))
                          ) : (
                            <Text>No items in the cart.</Text>
                          )}
                          <Divider borderColor="lightGreen" />
                          <Flex justifyContent="space-between" mt={5}>
                            <Text
                              fontSize="xl"
                              fontWeight="bold"
                              color={"heading"}
                            >
                              Total:
                            </Text>
                            <Text
                              fontSize="xl"
                              fontWeight="bold"
                              color={"orange.500"}
                            >
                              $
                              {cart
                                .reduce(
                                  (total, item) =>
                                    total +
                                    (item.Product.isSpecial
                                      ? item.Product.specialPrice
                                      : item.Product.price) *
                                    item.quantity,
                                  0
                                )
                                .toFixed(2)}
                            </Text>
                          </Flex>
                        </Box>
                        <Box flex="1" ml="2">
                          <CreditCardForm
                            onClose={onCheckoutClose}
                          />
                        </Box>
                      </Flex>
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </Box>
            )}

          {/* </Box>
        </Flex> */}

        <br />
        <hr />
        <Box pt={20} pb={20} mb={5} bg="#eeeeee" textAlign="center">
          <Text fontSize="2xl" fontWeight="bold" mb={5} style={{ fontSize: 23 }}>
            SOIL - Organic Food Grocer
          </Text>
          <hr style={{ width: '500px', margin: 'auto' }} />
          <Text fontSize="lg" fontWeight="light">

            "Discover the essence of organic living at SOIL - your trusted organic food grocer. Embrace a lifestyle rooted in sustainability and well-being with our handpicked selection of premium organic products. From farm-fresh produce to pantry essentials, each item is thoughtfully sourced to ensure quality and authenticity. Delve into a world of wholesome goodness and elevate your culinary experience with SOIL. Join us in nurturing health, supporting local farmers, and cultivating a greener tomorrow. Experience the difference of truly organic living with SOIL today."
          </Text>
        </Box>
        <hr />

        {/* Regular Products section */}
        <Text fontSize="3xl" fontWeight="bold" mb={4} textAlign="center" style={{ fontSize: '30px' }}>Regular Products</Text>
        <hr />
        <br />

        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6} sx={{ paddingLeft: '50px' }}>
          {regularProducts.map((deal, index) => (
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
      </Box>
      <Footer />

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        productId={selectedProductId}
        userId={userId}
      />
    </div>
  );
};

export default HomePage;

