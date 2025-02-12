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
  HStack,
  Image,
  Flex,
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { useAuthStore } from "../store/useAuthStore.js";
import { useColorModeValue } from "../components/ui/color-mode.jsx";
import { toast } from "react-hot-toast";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Link } from "react-router-dom";
import Loader from "../comps/Loader.jsx";


const SignUpPage = () => {
  useEffect(() => {
    if (isSigningUp && !authUser) {
      return (
        <Loader minH={"100vh"} h={"100%"}/>
      );
    }
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { authUser, isSigningUp, signup } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full Name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters long");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) {
      signup(formData);
    }
  };

  return (
    <Container
      w={"100%"}
      minH={"80vh"}
      alignItems={"center"}
      justifyContent={"center"}
      alignContent={"center"}
      mt={-10}
      p={0}
      zIndex={10}
    >
      <HStack w={"full"} justifyContent={"center"} alignItems={"center"} flexDir={{base:"column", md:"row"}} h={"100vh"} mx={"auto"} gap={0} >
      <Image src="/login.svg" aspectRatio={"1/1"} h={"90vh"}/>
      <VStack gap={20} alignItems={"center"} justifyContent={"center"} bg={"rgb(254, 244, 226)"} w={{base:"100%", md:"50%"}} h={"90vh"}>
        <Heading textAlign={"center"} fontSize={"5xl"} fontFamily={"roboto 700"} color={useColorModeValue("black", "black")}>
          Register
        </Heading>
        <Box
          alignItems={"center"}
          w={{ base: "100%", sm: "90%", md: "90%", lg: "70%", xl: "60%" }}
          justifyItems={"center"}
        >
          <VStack gap={4}>
            <Input
              placeholder="Enter Full Name"
              name="name"
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              bg={"transparent"}
              outline={"none"}
              border={"none"}
              fontSize={"xl"} 
            />

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

          </VStack>
          <Button onClick={handleSubmit} mt={10} w={"10pc"} h={"auto"} fontSize={"xl"} p={4} rounded={"full"}>Sign Up</Button>
        </Box>
        <Text color={useColorModeValue("black", "black")}>
          Already have an account?
          <Link to="/login" color={"blue.600"}>
            Login
          </Link>
        </Text>
      </VStack>

      </HStack>

    </Container>
  );
};

export default SignUpPage;
