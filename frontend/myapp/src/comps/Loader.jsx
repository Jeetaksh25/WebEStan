import React from "react";
import { Text, VStack, Spinner } from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";

const Loader = (props) => {
  return (
    <VStack gap={2} justifyContent={"center"} h={props.h} boxSizing={"border-box"} alignContent={"center"} alignItems={"center"} {...props}>
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
      <Text fontSize={"2xl"} color={useColorModeValue("gray.600", "gray.200")}>
        Loading...
      </Text>
    </VStack>
  );
};

export default Loader;
