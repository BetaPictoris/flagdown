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
  Text,
  useToast,
} from "@chakra-ui/react";

export default function RenameFlagPrompt(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const cancelRef = React.useRef();
  const toast = useToast();

  const [newFlagName, setNewFlagName] = React.useState(props.flag.FlagName);
  const handleFlagNameChange = (event) => setNewFlagName(event.target.value);

  const onRename = () => {
    setIsOpen(false);

    axios
      .patch(
        `/api/v1/projects/${props.flag.ProjectID}/flags/${props.flag.FlagID}`,
        {
          FlagName: newFlagName,
        }
      )
      .then((response) => {
        if (response.data) {
          toast({
            title: `Renamed flag`,
            description: `Renamed flag ${props.flag.FlagName} to ${newFlagName}`,
            status: "success",
            duration: 2000,
            isClosable: true,
          });

          window.location.reload();
        }
      });
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} colorScheme="yellow">
        Rename {props.flag.FlagName}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Rename flag</AlertDialogHeader>

            <AlertDialogBody>
              This will rename &quot;{props.flag.FlagName}&quot;.
              <Text>Flag name:</Text>
              <Input
                value={newFlagName}
                onChange={handleFlagNameChange}
                id="newFlagName"
                placeholder="Flag name"
              />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="yellow" onClick={onRename} ml={3}>
                Rename
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
