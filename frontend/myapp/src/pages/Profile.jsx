import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  Container,
  Text,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useColorModeValue } from "../components/ui/color-mode.jsx";
import Loader from "../comps/Loader.jsx";

const Profile = () => {
  const { authUser, getProfile } = useAuthStore();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if(!getProfile){
    <Loader minH={"100vh"} h={"100%"}/>
  }

  return (
    <Container
      w={"full"}
      minH={"80vh"}
      alignItems={"center"}
      justifyContent={"center"}
      alignContent={"center"}
      mt={-10}
    >
      <VStack gap={10}>
        <Heading textAlign={"center"} fontSize={"4xl"}>
          Profile
        </Heading>
        <Box
          alignItems={"center"}
          w={{ base: "100%", sm: "90%", md: "80%", lg: "60%", xl: "50%" }}
          h={"max-content"}
          bg={useColorModeValue("rgb(254, 244, 226)", "gray.800")}
          mx={"auto"}
          p={5}
          rounded={"md"}
          shadow={useColorModeValue("md", "md")}
        >
          <VStack gap={4} alignItems={"center"}>
            <Text>Name: {authUser.fullName}</Text>
            <Text>Email: {authUser.email}</Text>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Profile;
