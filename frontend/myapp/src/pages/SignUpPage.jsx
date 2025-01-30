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
import { PasswordInput } from "@/components/ui/password-input";
import { useAuthStore } from "../store/useAuthStore.js";
import { useColorModeValue } from "../components/ui/color-mode.jsx";
import { toast } from "react-hot-toast";

const SignUpPage = () => {
  useEffect(() => {
    if (isSigningUp && !authUser) {
      return (
        <VStack gap={2} justifyContent={"center"} minH={"100vh"}>
          <Spinner
            size="xl"
            thickness="10px"
            speed="0.65s"
            emptyColor="orange"
            color="blue.500"
            justifyContent={"center"}
            css={{ "--spinner-track-color": "colors.gray.400" }}
            borderWidth={"4px"}
          />
          <Text
            fontSize={"2xl"}
            color={useColorModeValue("gray.600", "gray.200")}
          >
            Loading...
          </Text>
        </VStack>
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
      w={"full"}
      minH={"80vh"}
      alignItems={"center"}
      justifyContent={"center"}
      alignContent={"center"}
    >
      <VStack gap={1}>
        <Heading textAlign={"center"} fontSize={"4xl"}>Register</Heading>
      <Box
        justifyContent={"center"}
        alignItems={"center"}
        w={{ base: "100%", sm: "90%", md: "80%", lg: "60%", xl: "50%" }}
        h={"max-content"}
        bg={useColorModeValue("gray.200", "gray.800")}
        mx={"auto"}
        p={5}
        rounded={"md"}
        marginTop={10}
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
            bg={useColorModeValue("gray.100", "gray.700")}
          />

          <Input
            placeholder="Enter Email"
            name="email"
            type="email"
            bg={useColorModeValue("gray.100", "gray.700")}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <PasswordInput
            placeholder="Enter Password"
            name="password"
            type="password"
            bg={useColorModeValue("gray.100", "gray.700")}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            visible={showPassword}
            onVisibleChange={setShowPassword}
          />

          <Button onClick={handleSubmit}>Sign Up</Button>
        </VStack>
      </Box>

      </VStack>

    </Container>
  );
};

export default SignUpPage;
