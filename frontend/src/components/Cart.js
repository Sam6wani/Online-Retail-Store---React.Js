import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Container,
    Divider,
    Flex,
    FormControl,
    Heading,
    Image,
    Input,
    Text,
    Tooltip,
} from '@chakra-ui/react';
import Footer from './Footer';
import Nav from './Navbar';
import Swal from 'sweetalert2';
import { MinusIcon } from '@chakra-ui/icons';
import { fetchProducts, getCart } from '../api/repository';


function Cart({ cart }) {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const dummyProducts = [
            {
                id: 1,
                img: 'https://chelanranch.com/cdn/shop/files/CR_OrganicPinovaApples_a6070721-0811-474e-9dc9-eb20ebfecd0c_800x.png?v=1693579674',
                name: 'Organic Apples',
                price: 2.99,
                category: 'Fruits',
                description: 'Fresh organic apples picked from local orchards.'
            },
            {
                id: 2,
                img: 'https://graciouslynourished.com/wp-content/uploads/2022/05/fresh-spinach.jpg',
                name: 'Fresh Spinach',
                price: 1.49,
                category: 'Vegetables',
                description: 'Crisp and green spinach leaves, perfect for salads and cooking.'
            },
            {
                id: 3,
                img: 'data:image/jpeg;base64,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',
                name: 'Free-range Eggs',
                price: 3.99,
                category: 'Dairy & Eggs',
                description: 'Farm-fresh eggs laid by free-range chickens, high in protein and nutrients.'
            },
        ];
        setProducts(dummyProducts);
    }, []);

//     const handleAddToCart = (product) => {
//         const existingItem = cartItems.find(item => item.id === product.id);
//         if (existingItem) {
//             setCartItems(cartItems.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
//         } else {
//             setCartItems([...cartItems, { ...product, qty: 1 }]);
//         }
//     };

//     // const handleRemoveFromCart = (productId) => {
//     //     setCartItems(cartItems.filter(item => item.id !== productId));
//     // };



//     const handleRemoveFromCart = async (product) => {
//         try {
//           await removeFromCart(userId, product.product_id, 1);
//           const updatedCart = await getCart(userId);
//           setCart(updatedCart);
    
//           const updatedProducts = await fetchProducts();
//           const special = updatedProducts.filter((product) => product.isSpecial);
//           const regular = updatedProducts.filter((product) => !product.isSpecial);
//           setSpecialProducts(special);
//           setRegularProducts(regular);
    
//           toast({
//             title: "Removed from Cart",
//             description: `${product.name} has been removed from your cart.`,
//             status: "success",
//             duration: 2000,
//             isClosable: true,
//             position: "top-end"
//           });
//         } catch (error) {
//           console.error("Failed to remove product from cart:", error);
//         }
//       };
    
//       const handleClearCart = async () => {
//         try {
//           await clearCart(userId);
//           const updatedCart = await getCart(userId);
//           setCart(updatedCart);
    
//           const updatedProducts = await fetchProducts();
//           const special = updatedProducts.filter((product) => product.isSpecial);
//           const regular = updatedProducts.filter((product) => !product.isSpecial);
//           setSpecialProducts(special);
//           setRegularProducts(regular);
    
//           toast({
//             title: "Cart Cleared",
//             description: "All items have been removed from your cart.",
//             status: "success",
//             duration: 2000,
//             isClosable: true,
//             position: "top-end"
//           });
//         } catch (error) {
//           console.error("Failed to clear cart:", error);
//         }
//       };

//     useEffect(() => {
//         let totalPrice = cartItems.reduce((total, item) => total + item.price * item.qty, 0);
//         setTotalPrice(totalPrice);
//     }, [cartItems]);

//     const Payment = () => {
//         if (cartItems.length === 0) {
//             Swal.fire({
//                 icon: 'warning',
//                 title: 'Your cart is empty!',
//                 text: 'Please add items to your cart before proceeding to payment.',
//             });
//         } else {
//             window.location.href = "PaymentPage";
//         }
//     }


    


//     return (
//         <Box>
//             <Nav />
//             <Container maxW="90%">
//                 {/* <Box bg="white" boxShadow="md" borderRadius="lg" p={5} mb={5} sx={{ paddingLeft: '100px' }}>
//                     <Heading as="h1" fontSize="xl" mb={5} fontWeight="bold">Items</Heading>
//                     <Divider />
//                     {products.map((product) => (
//                         <Flex key={product.id} justifyContent="space-between" alignItems="center" my={4}>
//                             <Box flex="0 0 20%">
//                                 <Image src={product.img} alt={product.name} style={{maxWidth:'150px'}}/>
//                             </Box>
//                             <Box flex="0 0 30%">
//                                 <Text fontSize="md" color="gray.600">{product.category}</Text>
//                                 <Text fontSize="lg" fontWeight="semibold">{product.name}</Text>
//                             </Box>
//                             <Box flex="0 0 20%">
//                                 <Text fontSize="lg">{product.price} $</Text>
//                             </Box>
//                             <Box flex="0 0 20%">
//                                 <FormControl>
//                                     <Input type="number" min={1} defaultValue={1} />
//                                 </FormControl>
//                             </Box>
//                             <Box flex="0 0 10%">
//                                 <Button
//                                     colorScheme="teal"
//                                     onClick={() => handleAddToCart(product)}
//                                     style={{
//                                         backgroundColor: "#38a169",
//                                         color: "white",
//                                         padding: "8px 16px",
//                                         borderRadius: "5px",
//                                         border: "none",
//                                         cursor: "pointer",
//                                         transition: "background-color 0.3s",
//                                     }}
//                                     onMouseEnter={(e) => (e.target.style.backgroundColor = "#2c7a7b")}
//                                     onMouseLeave={(e) => (e.target.style.backgroundColor = "#38a169")}
//                                 >
//                                     ADD
//                                 </Button>

//                             </Box>
//                         </Flex>
//                     ))}
//                     <Divider />
//                 </Box>
//                 <Box bg="gray.100" boxShadow="md" borderRadius="lg" p={5} mb={5} sx={{ paddingLeft: '300px', paddingRight: '300px', paddingBottom: '80px' }}>
//                     <Heading as="h2" fontSize="xl" mb={5} fontWeight="bold">Your Order</Heading>
//                     <Divider />
//                     {cartItems.map((item) => (
//                         <Flex key={item.id} justifyContent="space-between" alignItems="center" my={4}>
//                             <Text>{item.name} x {item.qty}</Text>
//                             <Text>{item.price * item.qty} $</Text>
//                             <Button
//                                 colorScheme="red"
//                                 onClick={() => handleRemoveFromCart(item.id)}
//                                 style={{
//                                     backgroundColor: "#e53e3e",
//                                     color: "white",
//                                     padding: "8px 16px",
//                                     borderRadius: "5px",
//                                     border: "none",
//                                     cursor: "pointer",
//                                     transition: "background-color 0.3s",
//                                 }}
//                                 onMouseEnter={(e) => (e.target.style.backgroundColor = "#d53f8c")}
//                                 onMouseLeave={(e) => (e.target.style.backgroundColor = "#e53e3e")}
//                             >
//                                 Remove
//                             </Button>

//                         </Flex>
//                     ))}
//                     <Divider />
//                     <Flex justifyContent="space-between" alignItems="center" my={4}>
//                         <Text>Total price</Text>
//                         <Text>{totalPrice} $</Text>
//                     </Flex>
//                     <Button
//                         onClick={() => Payment()}
//                         style={{
//                             backgroundColor: "#3182ce",
//                             color: "white",
//                             marginRight: "10px",
//                             padding: "10px 20px",
//                             borderRadius: "5px",
//                             border: "none",
//                             cursor: "pointer",
//                             transition: "background-color 0.3s",
//                         }}
//                         onMouseEnter={(e) => (e.target.style.backgroundColor = "#4299e1")}
//                         onMouseLeave={(e) => (e.target.style.backgroundColor = "#3182ce")}
//                     >
//                         Place Order
//                     </Button>

//                     <Button
//                         onClick={() => setCartItems([])}
//                         style={{
//                             backgroundColor: "#e53e3e",
//                             color: "white",
//                             padding: "10px 20px",
//                             borderRadius: "5px",
//                             border: "none",
//                             cursor: "pointer",
//                             transition: "background-color 0.3s",
//                         }}
//                         onMouseEnter={(e) => (e.target.style.backgroundColor = "#d53f8c")}
//                         onMouseLeave={(e) => (e.target.style.backgroundColor = "#e53e3e")}
//                     >
//                         Clear Order
//                     </Button>

//                 </Box> */}

//                 <>
//                     {cart.map((item, index) => (
//                         <Flex
//                             key={index}
//                             alignItems="center"
//                             justifyContent="space-between"
//                             mb={3}
//                         >
//                             <Flex alignItems="center">
//                                 <Tooltip label="Remove from Cart" fontSize="xs">
//                                     <Button
//                                         // onClick={() =>
//                                         //     handleRemoveFromCart({
//                                         //         product_id: item.product_id,
//                                         //         name: item.Product.name,
//                                         //         quantity: item.quantity,
//                                         //     })
//                                         // }
//                                         colorScheme="red"
//                                         size="xs"
//                                         height="18px"
//                                         width="18px"
//                                         fontSize="10px"
//                                         mr={2}
//                                     >
//                                         <MinusIcon />
//                                     </Button>
//                                 </Tooltip>
//                                 <Text fontSize="2xl" color="heading" mr={2}>
//                                     {item.quantity}
//                                 </Text>
//                                 <Text fontSize="2xl" color="lightGreen" mr={2}>
//                                     x
//                                 </Text>
//                                 <Text fontWeight="bold" color="text" mr={2}>
//                                     {item.Product.name}
//                                 </Text>
//                             </Flex>
//                             <Text color="middleGreen">
//                                 $
//                                 {(
//                                     (item.Product.isSpecial
//                                         ? item.Product.specialPrice
//                                         : item.Product.price) * item.quantity
//                                 ).toFixed(2)}
//                             </Text>
//                         </Flex>
//                     ))}
//                     <Divider borderColor="lightGreen" />
//                     <Flex justifyContent="space-between" mt={5}>
//                         <Text fontSize="xl" fontWeight="bold" color={"heading"}>
//                             Total:
//                         </Text>
//                         <Text fontSize="xl" color={"heading"}>
//                             $
//                             {cart
//                                 .reduce(
//                                     (total, item) =>
//                                         total +
//                                         (item.Product.isSpecial
//                                             ? item.Product.specialPrice
//                                             : item.Product.price) *
//                                         item.quantity,
//                                     0
//                                 )
//                                 .toFixed(2)}
//                         </Text>
//                     </Flex>
//                     <Flex mt={5} justifyContent="space-between">
//                         <Button colorScheme="red" onClick={handleClearCart}>
//                             Clear Cart
//                         </Button>
//                         <Button colorScheme="blue" onClick={onCheckoutOpen}>
//                             Checkout
//                         </Button>
//                     </Flex>
//                 </>
//                 );
//             </Container>
//             <Footer />
//         </Box>
//     );
// }


return (<></>)

};

export default Cart;
