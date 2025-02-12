import { useChatStore } from "../store/useChatStore";
import React, { useEffect } from "react";
import { useColorModeValue } from "../components/ui/color-mode";
import { Container, Text, VStack, Box, Heading, Input } from "@chakra-ui/react";
import Loader from "./Loader";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  const { getMessages, messages, isMessagesLoading, selectedUser } =
    useChatStore();

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);

  return (
    <Container
      w={"full"}
      h={"100%"}
      minH={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
      p={3}
    >
      <ChatHeader />
      {!isMessagesLoading ? (
        <Box
          w={"full"}
          h={"auto"}
          minH={"64vh"}
          alignItems={"center"}
          justifyContent={"center"}
          bg={useColorModeValue("rgb(255, 255, 255)", "gray.800")}
          overflow={"auto"}
          rounded={"lg"}
        ></Box>
      ) : (
        <Loader minH={"65vh"} h={"65vh"} />
      )}

      <MessageInput />
    </Container>
  );
};

export default ChatContainer;
