import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import React, { useEffect } from "react";
import { useColorModeValue } from "../components/ui/color-mode";
import {
  Container,
  Text,
  VStack,
  Box,
  Heading,
  Button,
} from "@chakra-ui/react";
import Loader from "./Loader";

const Users = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const {onlineUsers} = useAuthStore();

  useEffect(() => {
    getUsers();
  }, []);

  if (isUsersLoading) {
    return <Loader />;
  }

  return (
    <Container
      h={"full"}
      w={"50%"}
      flexDir={"column"}
      p={4}
      bg={useColorModeValue("rgb(254, 244, 226)", "gray.800")}
      transition={"all 0.3s ease-in-out"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <VStack gap={4} h={"100%"}>
        <Box
          w={"full"}
          p={2}
          border={"1px solid black"}
          rounded={"md"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Heading textAlign={"center"} fontSize={"2xl"}>
            Available Counselors
          </Heading>
        </Box>

        <Box
          w={"100%"}
          minH={"full"}
          h={"100%"}
          rounded={"lg"}
          px={10}
          py={5}
          bg={useColorModeValue("rgb(253, 238, 211)", "gray.700")}
          overflow={"auto"}
        >
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <Button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                w={"100%"}
                p={5}
                alignContent={"center"}
                justifyContent={"left"}
                textAlign={"left"}
                _hover={{ bg: "gray.200" }}
                color={useColorModeValue("black", "white")}
                bg={selectedUser?._id === user._id ? "gray.300"  : "transparent"}
                my={2}
                bgColor={useColorModeValue("rgb(254, 244, 226)", "gray.800")}
              >
                {user.fullName}
              </Button>
            ))
          ) : (
            <Text textAlign="center" p={4}>
              No counselors available
            </Text>
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default Users;
