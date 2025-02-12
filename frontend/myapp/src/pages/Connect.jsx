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
import { Radio, RadioGroup } from "@/components/ui/radio";
import { useColorModeValue } from "../components/ui/color-mode";

const Connect = () => {
  const [value, setValue] = useState("Counselor");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleBook = () => {
    toast.success("Successfully Booked");
  };

  const handleJoin = () => {
    const today = new Date();
    const curDate = today.toISOString().split("T")[0];
    const curTime = today.getHours() * 60 + today.getMinutes();

    const [selectedHour, selectedMinute] = time.split(":").map(Number);
    const selectedTime = selectedHour * 60 + selectedMinute;

    if (curDate < date || (curDate === date && curTime < selectedTime)) {
      toast.error(`You can join the meeting after ${date} at ${time}`);
    } else {
      toast.success("Joining Meeting");
      window.location.href = "https://meet.google.com/zxu-todg-sfb";
    }
  };

  return (
    <Container
      w={"full"}
      minH={"80vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      color={"black"}
    >
      <VStack gap={10} p={10} w={"full"}>
        <Heading textAlign={"center"} fontSize={"4xl"} color={useColorModeValue("black", "white")}>
          Connect with Professionals
        </Heading>
        <Box w={"full"} p={10} bg={useColorModeValue("rgb(254, 244, 226)", "gray.800")} shadow={"md"} rounded={"xl"} color={useColorModeValue("black", "white")}>
          <VStack gap={10}>
            <RadioGroup
              value={value}
              onChange={(e) => setValue(e.target.value)}
              fontSize={"xl"}
            >
              <Flex gap={10} fontSize={"xl"} flexDir={{ base: "column", md: "row" }}>
                <Radio value="Counselor" fontSize={"xl"}>
                  Counselor
                </Radio>
                <Radio value="Psychologist" fontSize={"xl"}>
                  Psychologist
                </Radio>
                <Radio value="Therapist" fontSize={"xl"}>
                  Therapist
                </Radio>
                <Radio value="Psychatrist" fontSize={"xl"}>
                  Psychatrist
                </Radio>
              </Flex>
            </RadioGroup>

            <Flex gap={10} flexDir={{ base: "column", md: "row" }}>
              <VStack>
                <Text>Enter Appointment Date</Text>
                <Input
                  placeholder="Enter Appointment Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  name="date"
                  required
                />
              </VStack>

              <VStack>
                <Text>Enter Appointment Time</Text>
                <Input
                  placeholder="Enter Appointment Time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  type="time"
                  name="time"
                  required
                />
              </VStack>
            </Flex>
            <Button onClick={handleBook}>Book Appointment</Button>
            <Button onClick={handleJoin}>Join Meeting</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Connect;
