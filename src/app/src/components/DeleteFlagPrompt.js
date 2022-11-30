import React from "react";
import axios from "axios";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useToast
} from '@chakra-ui/react'

export default function DeleteFlagPrompt(props) {
  const [flag, setFlag] = React.useState({});
  const [isOpen, setIsOpen] = React.useState(false);
  const cancelRef = React.useRef();
  const toast = useToast();

  React.useEffect(() => {
    axios(`/api/v1/projects/${props.projectName}/flags/${props.flagName}`).then(
      (response) => {
        if (response.data) {
          setFlag(response.data[0]);
        }
      }
    );
  }, [props.projectName, props.flagName]);

  function onClose() {
    setIsOpen(false);
  }

  function onOpen() {
    setIsOpen(true);
  }

  function onDelete() {
    onClose();

    axios.delete(`/api/v1/projects/${flag.ProjectID}/flags/${flag.FlagID}`);
    toast({
      title: `${flag.FlagName} has been deleted.`,
      status: `success`,
      duration: 2000,
      isClosable: true,
    });
  }

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Delete {flag.FlagName}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete flag</AlertDialogHeader>

            <AlertDialogBody>
              This will delete "{flag.FlagName}" and can not be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
