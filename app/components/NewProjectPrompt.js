import React from "react";
import axios from "axios";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";

export default function NewProjectPrompt() {
  const [isOpen, setIsOpen] = React.useState(false);
  const cancelRef = React.useRef();
  const toast = useToast();

  const [projectName, setProjectName] = React.useState("");
  const handleProjectNameChange = (event) =>
    setProjectName(event.target.value.toLowerCase().replace(" ", "-"));

  const onCreate = () => {
    setIsOpen(false);

    if (projectName === "") {
      toast({
        title: "Project name can't be empty",
        description: "You must enter a project name.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      axios.post("/api/v1/projects", { ProjectName: projectName });
      toast({
        title: "Project created!",
        description: "The project has been created.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      window.location.reload();
    }
  };

  return (
    <>
      <Button colorScheme="green" onClick={() => setIsOpen(true)}>
        New project
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Create a new project
            </AlertDialogHeader>

            <AlertDialogBody>
              <Input
                value={projectName}
                onChange={handleProjectNameChange}
                id="createNewProject"
                placeholder="Project name"
              />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={onCreate} ml={3}>
                Create
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
