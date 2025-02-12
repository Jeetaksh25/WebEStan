import React from "react";
import { Box, Text, HStack } from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { useAuthStore } from "../store/useAuthStore";
import {Link} from "react-router-dom";

const Footer = () => {

    const { authUser } = useAuthStore();

  return (
    <Box
      w="100%"
      py={4}
      px={6}
      bg={useColorModeValue("rgb(247, 230, 201)", "gray.800")}
      color={useColorModeValue("black", "white")}
      textAlign="center"
      mt={8}
      borderTopWidth={1}
      borderColor={useColorModeValue("gray.300", "gray.700")}
      position={"relative"}
      bottom={0}
    >
      <HStack justifyContent="center" gap={10}>
        <Link to="/Test">Test</Link>
        {authUser ? (<Link to="/profile">Profile</Link>) : (<>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        </>)}
        <Link to="/tasks">Tasks</Link>
        <Link to="/connect">Connect</Link>
      </HStack>
      <Text mt={2} fontSize="sm">
        &copy; {new Date().getFullYear()} Soul Sync. All Right Reserved. 
      </Text>
    </Box>
  );
};

export default Footer;
