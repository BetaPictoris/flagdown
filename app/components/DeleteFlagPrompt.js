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
  useToast,
} from "@chakra-ui/react";

/*
  Creates a button that, when clicked, will open a dialog box that
  asks the user to confirm that they want to delete a flag.
*/
export default function DeleteFlagPrompt(props) {
  const [flag, setFlag] = React.useState({});
  const [isOpen, setIsOpen] = React.useState(false);
  const cancelRef = React.useRef();
  const toast = useToast();

  // Get the flag data from the server.
  React.useEffect(() => {
    axios(`/api/v1/projects/${props.projectName}/flags/${props.flagName}`).then(
      (response) => {
        if (response.data) {
          setFlag(response.data[0]);
        }
      }
    );
  }, [props.projectName, props.flagName]);

  // Delete the flag and close the dialog box.
  const onDelete = () => {
    onClose();

    axios.delete(`/api/v1/projects/${flag.ProjectID}/flags/${flag.FlagID}`);
    toast({
      title: `${flag.FlagName} has been deleted.`,
      status: `success`,
      duration: 2000,
      isClosable: true,
    });
    window.location.reload();
  };

  return (
    <>
      <Button colorScheme="red" onClick={() => setIsOpen(true)}>
        Delete {flag.FlagName}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete flag</AlertDialogHeader>

            <AlertDialogBody>
              This will delete &quot;{flag.FlagName}&quot; and can not be
              undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
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
