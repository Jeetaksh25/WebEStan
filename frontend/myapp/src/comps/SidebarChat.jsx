import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import React, { useEffect, useState } from "react";
import { useColorModeValue } from "../components/ui/color-mode";
import {
  Container,
  Text,
  VStack,
  Box,
  Heading,
  Button,
  HStack,
} from "@chakra-ui/react";
import Loader from "./Loader";
import { Switch } from "@/components/ui/switch"

const Users = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = showOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)) : users;

  const handleFilter = () => {
    setShowOnlineOnly(!showOnlineOnly);
  }

  return (
    <Container
      h={"full"}
      w={"45%"}
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
            <Switch defaultChecked={showOnlineOnly} onChange={handleFilter} mt={4} bg={useColorModeValue("rgb(254, 244, 226)", "gray.800")}>
              Online Users Only
            </Switch>
        </Box>
        {!isUsersLoading ? (
          <Box
            w={"100%"}
            minH={"70vh"}
            h={"70vh"}
            rounded={"lg"}
            px={10}
            py={5}
            bg={useColorModeValue("rgb(253, 238, 211)", "gray.700")}
            overflow={"auto"}
          >
            {Array.isArray(users) && users.length > 0 ? (
              filteredUsers.map((user) => (
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
                  bg={
                    selectedUser?._id === user._id ? "gray.300" : "transparent"
                  }
                  my={2}
                  bgColor={useColorModeValue("rgb(254, 244, 226)", "gray.800")}
                >
                  <HStack justifyContent={"space-between"} w={"100%"} h={"100%"}>
                    <Text>{user.fullName}</Text>
                    <Text>{onlineUsers.includes(user._id) ? "🟢" : "🔴"} </Text>

                  </HStack>

                </Button>
              ))
            ) : (
              <Text textAlign="center" p={4}>
                No counselors available
              </Text>
            )}
            {filteredUsers.length === 0 && <Text>No counselors are available</Text>}
          </Box>
        ) : (
          <Loader minH={"65vh"} h={"65vh"} />
        )}
      </VStack>
    </Container>
  );
};

export default Users;
