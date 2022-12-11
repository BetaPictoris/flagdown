import React from 'react';
import axios from 'axios';

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

export default function RenameProjectPrompt(props) { 
  const [isOpen, setIsOpen] = React.useState(false);
  const cancelRef = React.useRef();
  const toast = useToast();
  
  const [newProjectName, setNewProjectName] = React.useState(props.project.ProjectName);
  const handleProjectNameChange = (event) => setNewProjectName(event.target.value);


  const onClose = () => {
    setIsOpen(false)
  }

  const onOpen = () => {
    setIsOpen(true)
  }

  const onRename = () => {
    setIsOpen(false);

    axios.patch(`/api/v1/projects/${props.project.ProjectID}`, {
      "ProjectName": newProjectName
    }).then((response) => {
      if (response.data) {
        toast({
          title: `Renamed project`,
          description: `Renamed project ${props.project.ProjectName} to ${newProjectName}`,
          status: "success",
          duration: 2000,
          isClosable: true,
        })

        window.location.reload();
      }
    });
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme="yellow" >Rename {props.project.ProjectName}</Button>
      
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent> 
            <AlertDialogHeader>Rename Project</AlertDialogHeader>
            
            <AlertDialogBody>
              This will rename "{props.project.ProjectName}".
              
              <Text>Project name:</Text>
              <Input
                value={newProjectName}
                onChange={handleProjectNameChange}
                id="newProjectName"
                placeholder="Project name"
              />
            </AlertDialogBody>
            
            
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
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
  )
}
