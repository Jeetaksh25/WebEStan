import React, { useEffect } from "react";
import { useTaskStore } from "../store/useTaskStore.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Heading, Box, Button, Flex, Container } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorModeValue } from "../components/ui/color-mode.jsx";

const TaskPage = () => {
  const { tasks, fetchTasks, completeTask } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

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
      <Box
        alignItems={"center"}
        w={{ base: "100%", sm: "90%", md: "80%", lg: "60%", xl: "50%" }}
        h={"max-content"}
        bg={useColorModeValue("rgb(254, 244, 226)", "gray.800")}
        mx={"auto"}
        p={5}
        rounded={"md"}
        shadow={useColorModeValue("md", "md")}
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flexDir={"column"}
          gap={10}
        >
          <Heading fontSize={"4xl"}>Task: {tasks.title}</Heading>
          <Link to={tasks.task}><Button>Do Task</Button></Link>
          <Button colorScheme="blue" onClick={() => completeTask(tasks._id)}>
            Task Completed
          </Button>
        </Flex>
      </Box>
    </Container>
  );
};

export default TaskPage;
