import React from 'react';
import {
    Container,
    Heading,
    Text,
    UnorderedList,
    ListItem,
} from '@chakra-ui/react';
import Footer from './Footer';
import Nav from './Navbar';


const SmallScaleFarmingInfo = () => {
    const farmingInfos = [
        "Small-scale farming refers to agricultural practices on a small area of land with a focus on sustainability, diversity, and community.",
        "It often involves organic or natural farming methods, such as crop rotation, composting, and minimal use of synthetic chemicals.",
        "Small-scale farmers prioritize quality over quantity and often sell their produce locally, fostering a direct connection between farmers and consumers.",
        "This approach supports local economies, reduces environmental impact, and promotes healthier food choices."
    ];
    localStorage.setItem('farmingInfo', JSON.stringify(farmingInfos));
    const storedFarmingInfo = localStorage.getItem('farmingInfo');
    let farmingInfo = storedFarmingInfo ? JSON.parse(storedFarmingInfo) : [];

    return (
        <div>
            <Nav />
            <Text fontSize="3xl" fontWeight="bold" m={5} textAlign="center" style={{ fontSize: '30px' }}>Small-Scale Farming Information.</Text>

            <hr />

            <Container maxW="800px" mt="5px" p="30px" bg="white" borderWidth="1px" borderRadius="10px" boxShadow="0 5px 15px rgba(0, 0, 0, 0.1)" style={{ margin: '0 auto', marginBottom: '60px', marginTop: '20px', minHeight: "400px", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


                {Array.isArray(farmingInfo) && farmingInfo.length > 0 ? (
                    <UnorderedList fontSize="18px" textAlign="justify">
                        {farmingInfo.map((info, index) => (
                            <ListItem key={index} sx={{ paddingTop: '10px' }}>{info}</ListItem>
                        ))}
                    </UnorderedList>
                ) : (
                    <Text fontSize="18px" textAlign="justify">No small-scale farming information available.</Text>
                )}
            </Container>
            <Footer />


        </div>
    );
};

export default SmallScaleFarmingInfo;
