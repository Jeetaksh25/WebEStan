import { useChatStore } from "../store/useChatStore";
import React, { useEffect } from 'react'
import { useColorModeValue } from "../components/ui/color-mode";
import { Container, Text, VStack,Box,Heading } from "@chakra-ui/react";
import Loader from "./Loader";

const ChatContainer = () => {

    const {getMessages,messages,isMessagesLoading} = useChatStore();

    useEffect(()=>{
        getMessages();
    },[getMessages]);


  if (isMessagesLoading) {
    return (
      <Loader/>
    );
  }

  return(
    <Container w={"full"} h={"100%"} minH={"100vh"} alignItems={"center"} justifyContent={"center"} p={3}>
        <Box w={"full"} h={"full"} alignItems={"center"} justifyContent={"center"} bg={useColorModeValue("rgb(255, 255, 255)", "gray.800")}>

        </Box>
    </Container>
  );
};

export default ChatContainer;
