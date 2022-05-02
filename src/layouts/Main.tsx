import React, {useState} from 'react';
import Nav from "../component/NavBar";
import Footer from "../component/Footer";
import SimpleSidebar from "../component/SideBar";
import FindInput from "../component/Inputs/FindInput";
import {Box, Center} from "@chakra-ui/react";

const Main =(props)=> {
    return (
        <>
            <Nav/>
            <Center py={2}>
                <Box width={{md:"55%",base:"100%"}}>
                    <FindInput/>
                </Box>
            </Center>
            {props.children}
            <Footer/>
        </>
    );
}

export default Main;