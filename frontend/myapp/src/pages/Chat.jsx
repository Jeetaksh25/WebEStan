import React, { useState } from "react";
import { Box, Container, Text, Heading, VStack } from "@chakra-ui/react";
import { useChatStore } from "../store/useChatStore";
import { useColorMode, useColorModeValue } from "../components/ui/color-mode";
import SidebarChat from "../comps/SidebarChat";
import NoChatSelected from "../comps/NoChatSelected";
import ChatContainer from "../comps/ChatContainer";

const Chat = () => {
  const { selectedUser, isUsersLoading } = useChatStore();

  return (
    <Container minH={"100vh"} h={"100%"} minW={"full"} w={"full"} py={10}>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Box
          rounded={"lg"}
          shadow={useColorModeValue("md", "md")}
          w={"full"}
          maxW={"6xl"}
          bg={useColorModeValue("rgb(254, 244, 226)", "gray.800")}
          p={5}
          h={"85vh"}
        >
          <Box display={"flex"} h={"full"} rounded={"lg"} overflow={"hidden"} w={"100%"}>
            <SidebarChat />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Chat;
