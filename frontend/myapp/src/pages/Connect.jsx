import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Flex,
  Input,
  Button,
} from "@chakra-ui/react";
import { Radio, RadioGroup } from "@/components/ui/radio" 

const Connect = () => {
  const [value, setValue] = useState("1");

  return (
    <Container
      w={"full"}
      minH={"80vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      mt={-10}
    >
      <VStack gap={5} bg={"rgb(254, 244, 226)"} p={10} rounded={"xl"} shadow={"md"}>
        <Heading textAlign={"center"} fontSize={"4xl"}>
          Connect with Professionals
        </Heading>

        <Box w={"full"} p={5}>
          <VStack gap={5}>
            <HStack>
              <RadioGroup value={value} onChange={(e) => setValue(e.target.value)} fontSize={"xl"}>
                <HStack gap={10}>
                  <Radio value="1" fontSize={"xl"}>Counselor</Radio>
                  <Radio value="2" fontSize={"xl"}>Psychologist</Radio>
                  <Radio value="3" fontSize={"xl"}>Therapist</Radio>
                  <Radio value="4" fontSize={"xl"}>Psychatrist</Radio>
                </HStack>
              </RadioGroup>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Connect;
