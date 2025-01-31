import React, { useState } from "react";
import {
  Box,
  HStack,
  Button,
  Text,
  IconButton,
  VStack,
  useBreakpointValue,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import { MdDarkMode, MdOutlineLightMode, MdMenu } from "react-icons/md";
import { CiMenuBurger } from "react-icons/ci";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerRoot,
} from "@/components/ui/drawer";

import { useColorModeValue, useColorMode } from "../components/ui/color-mode";

const NavBar = () => {
  const { authUser, logout } = useAuthStore();
  const { colorMode, toggleColorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleLogout = () => {
    logout();
  };

  const navItems = (
    <>
      <Flex alignItems="center" gap={3} flexDir={isMobile ? "column" : "row"} p={0} m={0}>
        <Link to="/">
          <Heading fontSize={"2xl"} color={useColorModeValue("black", "white")} mx={4}>
            Home
          </Heading>
        </Link>
        <Link to="/tasks">
          <Button bg={useColorModeValue("gray.300", "gray.600")} color={useColorModeValue("black", "white")}>
            Daily Tasks
          </Button>
        </Link>
        <Link to="/test">
          <Button bg={useColorModeValue("gray.300", "gray.600")} color={useColorModeValue("black", "white")}>
            Take Test
          </Button>
        </Link>
        <Link to="/connect">
          <Button bg={useColorModeValue("gray.300", "gray.600")} color={useColorModeValue("black", "white")}>
            Connect
          </Button>
        </Link>
      </Flex>
    </>
  );

  return (
    <Box
      w="98%"
      px={5}
      py={3}
      bg={useColorModeValue("gray.200", "gray.800")}
      color={useColorModeValue("black", "white")}
      borderRadius="md"
      mx={"auto"}
      my={1}
      position={"sticky"}
    >
      {isMobile ? (
        <DrawerRoot key={"start"} placement="start">
          <HStack justifyContent="space-between">
            <DrawerTrigger asChild>
              <Button>
                <CiMenuBurger />
              </Button>
            </DrawerTrigger>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MdDarkMode /> : <MdOutlineLightMode />}
            </Button>
            {!authUser && (
              <>
                <Link to="/login">
                  <Button bg={useColorModeValue("gray.300", "gray.600")} color={useColorModeValue("black", "white")}>
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button bg={useColorModeValue("gray.300", "gray.600")} color={useColorModeValue("black", "white")}>
                    Register
                  </Button>
                </Link>
              </>
            )}
          </HStack>
          <DrawerBackdrop />
          <DrawerContent w={"max-content"} p={4}>
            <DrawerHeader>
              <DrawerTitle>Menu</DrawerTitle>
              <DrawerCloseTrigger asChild>
                <span>
                  <Button>Close</Button>
                </span>
              </DrawerCloseTrigger>
            </DrawerHeader>
            <DrawerBody>
              <VStack gap={3} align="center">
                {navItems}
                {authUser ? (
                  <VStack gap={2}>
                    <Link to="/profile">
                      <Button bg={useColorModeValue("gray.300", "gray.600")} color={useColorModeValue("black", "white")}>
                        Profile
                      </Button>
                    </Link>
                    <Button onClick={handleLogout} bg={useColorModeValue("gray.300", "gray.600")} color={useColorModeValue("black", "white")}>
                      Logout
                    </Button>
                  </VStack>
                ) : null}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerRoot>
      ) : (
        <HStack justifyContent="space-between">
          <HStack gap={3}>{navItems}</HStack>
          <HStack gap={2}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MdDarkMode /> : <MdOutlineLightMode />}
            </Button>
            {!authUser ? (
              <>
                <Link to="/login">
                  <Button bg={useColorModeValue("gray.300", "gray.600")} color={useColorModeValue("black", "white")}>
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button bg={useColorModeValue("gray.300", "gray.600")} color={useColorModeValue("black", "white")}>
                    Register
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile">
                  <Button bg={useColorModeValue("gray.300", "gray.600")} color={useColorModeValue("black", "white")}>
                    Profile
                  </Button>
                </Link>
                <Button onClick={handleLogout} bg={useColorModeValue("gray.300", "gray.600")} color={useColorModeValue("black", "white")}>
                  Logout
                </Button>
              </>
            )}
          </HStack>
        </HStack>
      )}
    </Box>
  );
};

export default NavBar;