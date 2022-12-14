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

export default function NewFlagPrompt(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const cancelRef = React.useRef();
  const toast = useToast();

  const [flagName, setFlagName] = React.useState("");
  const handleFlagNameChange = (event) =>
    setFlagName(event.target.value.replace(" ", "-"));

  const [flagValue, setFlagValue] = React.useState("");
  const handleFlagValueChange = (event) => setFlagValue(event.target.value);

  const onCreate = () => {
    onClose();

    if (flagName === "") {
      toast({
        title: "Flag name can't be empty",
        description: "You must enter a flag name.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      axios.post(`/api/v1/projects/${props.projectID}/flags`, {
        FlagName: flagName,
        Value: flagValue,
      });
      toast({
        title: "Flag created!",
        description: "The flag has been created.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      window.location.reload();
    }
  };

  return (
    <>
      <Button color="green" onClick={() => setIsOpen(true)}>
        New flag
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Create a new flag
            </AlertDialogHeader>

            <AlertDialogBody>
              <label htmlFor="createNewFlagName">Flag name:</label>
              <Input
                value={flagName}
                onChange={handleFlagNameChange}
                id="createNewFlagName"
                placeholder="Flag name"
              />
              <label htmlFor="createNewFlagValue">Flag value:</label>
              <Input
                value={flagValue}
                onChange={handleFlagValueChange}
                id="createNewFlagValue"
                placeholder="Flag value"
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
