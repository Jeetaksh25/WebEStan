import React, { useEffect, useState } from "react";
import {
  Box,
  Input,
  VStack,
  Button,
  Container,
  Text,
  Spinner,
  Heading,
  HStack,
  Image,
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { PasswordInput } from "@/components/ui/password-input";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loader from "../comps/Loader.jsx";

const LoginPage = () => {
  const { login, isLoggingIn, authUser } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    if (isLoggingIn && !authUser) {
      return (
        <Loader minH={"100vh"} h={"100%"}/>
      );
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.password.trim()) return toast.error("Password is required");
    login(formData);
  };

  return (
    <Container
      w={"100%"}
      minH={"80vh"}
      alignItems={"center"}
      justifyContent={"center"}
      p={0}
      zIndex={10}
    >
      <HStack
        w={"full"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={{ base: "column", md: "row" }}
        h={"90vh"}
        mx={"auto"}
        gap={0}
      >
        <Image src="/login.svg" aspectRatio={"1/1"} h={"90vh"} />
        <VStack
          gap={20}
          alignItems={"center"}
          justifyContent={"center"}
          bg={"rgb(254, 244, 226)"}
          w={{ base: "100%", md: "50%" }}
          h={"90vh"}
        >
          <Heading
            textAlign={"center"}
            fontSize={"5xl"}
            fontFamily={"roboto 700"}
            color={useColorModeValue("black", "black")}
          >
            Login
          </Heading>
          <Box
            w={{ base: "100%", sm: "90%", md: "90%", lg: "70%", xl: "60%" }}
            alignItems={"center"}
          >
            <VStack gap={4} alignItems={"center"}>
              <Input
                placeholder="Enter Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                bg={"transparent"}
                outline={"none"}
                border={"none"}
                fontSize={"xl"}
              />
              <PasswordInput
                placeholder="Enter Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                visible={showPassword}
                onVisibleChange={setShowPassword}
                bg={"transparent"}
                outline={"none"}
                border={"none"}
                fontSize={"xl"}
              />
              <Button
                onClick={handleSubmit}
                mt={10}
                w={"10pc"}
                h={"auto"}
                fontSize={"xl"}
                p={4}
                rounded={"full"}
              >
                Login
              </Button>
            </VStack>

            <Text mt={4} fontSize={"lg"} color={"black"}>
              Don't have an account?
              <Link to="/signup" color={"blue.600"}>
                Sign Up
              </Link>
            </Text>
          </Box>
        </VStack>
      </HStack>
    </Container>
  );
};

export default LoginPage;
