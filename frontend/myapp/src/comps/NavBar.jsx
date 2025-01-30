import React, { useState } from "react";
import { Box, HStack, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorMode, useColorModeValue } from "../components/ui/color-mode";
import { useAuthStore } from "../store/useAuthStore.js";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

const NavBar = () => {
  const { authUser, logout } = useAuthStore();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLogout = () => {
    logout();
  };

  return (
    <Box
      h={"max-content"}
      w={"98%"}
      position={"sticky"}
      top={1}
      mx={"auto"}
      bg={useColorModeValue("gray.200", "gray.800")}
      px={10}
      py={3}
      display={"flex"}
      justifyContent={"space-between"}
      zIndex={1000}
      rounded={"md"}
      color={useColorModeValue("white", "black")}
      alignItems={"center"}
    >
      <HStack gap={5}>
        <Link to="/">
          <Text fontSize={"2xl"} color={useColorModeValue("black", "white")}>
            Home
          </Text>
        </Link>

        <Link to={"/tasks"}>
          <Button
            bg={useColorModeValue("gray.300", "gray.700")}
            color={useColorModeValue("black", "white")}
          >
            Daily Tasks
          </Button>
        </Link>
        <Link to={"/test"}>
          <Button
            bg={useColorModeValue("gray.300", "gray.700")}
            color={useColorModeValue("black", "white")}
          >
            Take Test
          </Button>
        </Link>
        <Link to={"/connect"}>
          <Button
            bg={useColorModeValue("gray.300", "gray.700")}
            color={useColorModeValue("black", "white")}
          >
            Connect
          </Button>
        </Link>
      </HStack>

      <HStack gap={3}>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <MdDarkMode /> : <MdOutlineLightMode />}
        </Button>

        {authUser && (
          <>
            <Link to={"/profile"}>
              <Button
                bg={useColorModeValue("gray.300", "gray.700")}
                color={useColorModeValue("black", "white")}
              >
                Profile
              </Button>
            </Link>
            <Button
              onClick={handleLogout}
              bg={useColorModeValue("gray.300", "gray.700")}
              color={useColorModeValue("black", "white")}
            >
              Logout
            </Button>
          </>
        )}

        {!authUser && (
          <>
            <Link to={"/login"}>
              <Button
                bg={useColorModeValue("gray.300", "gray.700")}
                color={useColorModeValue("black", "white")}
              >
                Login
              </Button>
            </Link>
            <Link to={"/signup"}>
              <Button
                bg={useColorModeValue("gray.300", "gray.700")}
                color={useColorModeValue("black", "white")}
              >
                Register
              </Button>
            </Link>
          </>
        )}
      </HStack>
    </Box>
  );
};

export default NavBar;
