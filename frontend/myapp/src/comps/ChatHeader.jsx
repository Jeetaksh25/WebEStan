import React from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Box, Heading, Button, HStack,Icon } from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { IoClose } from "react-icons/io5";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <Box
      w={"full"}
      h={"max-content"}
      bg={useColorModeValue("rgb(254, 244, 226)", "gray.800")}
      alignItems={"center"}
      justifyContent={"center"}
      my={1}
      mb={4}
      border={"1px solid black"}
      rounded={"md"}
    >
      <HStack justifyContent={"space-between"} px={5}>
        <Heading textAlign={"center"} fontSize={"2xl"} p={2}>
          {selectedUser.fullName}
        </Heading>
        <Button fontSize={"30px"} onClick={() => setSelectedUser(null)} bg={"transparent"} p={0} m={0}>
            <Icon as={IoClose} boxSize={"30px"} color={useColorModeValue("gray.600", "gray.200")}/>
        </Button>
      </HStack>
    </Box>
  );
};

export default ChatHeader;
