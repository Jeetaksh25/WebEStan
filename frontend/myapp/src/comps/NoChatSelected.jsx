import React from 'react'
import {Box,Container,Text,Heading,VStack} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { use } from 'react';

const NoChatSelected = () => {
  return (

    <Container w={"full"} h={"full"} alignItems={"center"} justifyContent={"center"} flexDir={"column"} p={3} bg={useColorModeValue("rgb(254, 244, 226)", "gray.800")}>
        <Box w={"full"} h={"full"} alignItems={"center"} justifyContent={"center"} rowGap={10} display={'flex'} flexDir={'column'}>
            <Heading textAlign={"center"} fontSize={"3xl"}>Welcome to Chat App</Heading>
            <Text textAlign={"center"} fontSize={"xl"}>Start Conversation with professional therapists</Text>
        </Box>
    </Container>
  )
}

export default NoChatSelected;
