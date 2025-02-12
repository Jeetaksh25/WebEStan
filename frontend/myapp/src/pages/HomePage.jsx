import React,{useEffect} from "react";
import {
  Container,
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Image,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

  const handleScroll = () => {
    window.scrollTo({
      top: 900,
      behavior: "smooth",
    });
  };
  const navigate = useNavigate();

  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleTestN = () => {
    navigate("/test");
  }

  return (
    <Container w="100%" minH="100vh" p={5}>
      <VStack m={5} justifyContent="center" gap={10}>
        <Box
          w="full"
          p={8}
          bg={useColorModeValue("rgb(254, 244, 226)", "gray.800")}
          rounded="lg"
          shadow="md"
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            alignItems="center"
            gap={6}
          >
            {!isMobile && (
              <Image
                src="/home1.jpg"
                width={{ base: "100%", md: "50%" }}
                rounded="md"
              />
            )}

            <VStack w={{ base: "100%", md: "50%" }} textAlign="center" gap={4}>
              <Flex direction="row" justify="center" py={10}>
                <Heading fontSize={{ base: "5xl", md: "8xl" }} color="blue.700">
                  Soul
                </Heading>
                <Heading
                  fontSize={{ base: "5xl", md: "8xl" }}
                  color="orange.400"
                  ml={2}
                >
                  Sync
                </Heading>
              </Flex>

              <Text fontSize={{ base: "lg", md: "2xl" }} px={2}>
                "Your mental well-being matters. Whether you're seeking
                guidance, daily motivation, or a safe space to reflect, we’re
                here for you. Connect with professionals, engage in self-care
                challenges, and track your progress—all in one place."
              </Text>

              <Button rounded="full" p={6} fontSize="xl" onClick={handleScroll} mt={5}>
                Get Started
              </Button>
            </VStack>

            {isMobile && (
              <Image src="/home1.jpg" width="100%" rounded="md" mt={4} />
            )}
          </Flex>
        </Box>

        <Box
          w="full"
          p={4}
          bg={useColorModeValue("rgb(254, 244, 226)", "gray.800")}
          rounded="lg"
          shadow="md"
        >
          <Text fontSize={{ base: "lg", md: "xl" }} textAlign={"center"}>
            “Happiness can be found even in the darkest of times if one only
            remembers to turn on the light.”
          </Text>
          <Text textAlign={"center"} mx={"auto"}>
            ― J.K.Rowling
          </Text>
        </Box>

        <Box
          w="full"
          p={4}
          bg={useColorModeValue("rgb(254, 244, 226)", "gray.800")}
          rounded="lg"
          shadow="md"
        >
          <Heading
            fontSize={{ base: "2xl", md: "3xl" }}
            textAlign={"center"}
            m={4}
          >
            Key Features
          </Heading>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            textAlign={"center"}
            maxW={"80%"}
            mx={"auto"}
          >
            At Maven, we are dedicated to providing effective psychotherapy
            methods that promote self-understanding and empower individuals to
            adopt new attitudes and emotions towards life's challenges. Since
            our establishment in 2023, we have been committed to offering a
            comprehensive range of personalized mental health services to
            individuals. From minor difficulties to traumatic experiences, we
            are here to support you on your journey to mental well-being.
          </Text>
        </Box>

        <Box w="full">
          <Flex
            direction={{ base: "column", md: "row" }}
            wrap="wrap"
            align="center"
            gap={20}
            justify="center"
            mt={0}
            p={5}
            rounded="lg"
            bg={useColorModeValue("rgb(254, 244, 226)", "gray.800")}
            shadow="md"
          >
            {[
              { img: "/B1.jpg", text: "Identifying Problems" },
              { img: "/B2.jpg", text: "Easy Guide" },
              { img: "/B3.jpg", text: "Daily Tasks" },
              { img: "/B4.jpg", text: "Rewards for Progress" },
            ].map((feature, index) => (
              <Box
                key={index}
                w={{ base: "100%", sm: "45%", md: "250px" }}
                textAlign="center"
              >
                <Image
                  src={feature.img}
                  w="100%"
                  rounded="md"
                  aspectRatio={1}
                />
                <Text fontSize="2xl" mt={3}>
                  {feature.text}
                </Text>
              </Box>
            ))}
          </Flex>
        </Box>

        <Box
          w="full"
          p={4}
          bg={useColorModeValue("rgb(254, 244, 226)", "gray.800")}
          rounded="lg"
          shadow="md"
          alignItems={"center"}
          justifyContent={"center"}
          alignContent={"center"}
          className="Test"
        >
          <VStack gap={5}>
            <Heading
              fontSize={{ base: "2xl", md: "3xl" }}
              textAlign={"center"}
              m={4}
            >
              Know Yourself
            </Heading>

            <Text
              fontSize={{ base: "md", md: "lg" }}
              textAlign={"center"}
              maxW={"80%"}
              mx={"auto"}
            >
              This is a simple quiz like test that will help you understand
              your mental health.
            </Text>

            <Button rounded="full" p={6} fontSize="xl" mx={"auto"} onClick={handleTestN}>
              Take Test
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default HomePage;
