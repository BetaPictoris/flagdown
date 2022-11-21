import React from 'react';
import axios from 'axios';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import { Input, Button, useToast } from '@chakra-ui/react'

export default function DeleteProjectPrompt(props) {
  const [project, setProject] = React.useState({})
  const [ isOpen, setIsOpen ] = React.useState(false)
  const cancelRef = React.useRef()
  const toast = useToast()

  const [projectName, setProjectName] = React.useState('')
  const handleProjectNameChange = (event) => setProjectName(event.target.value)

  React.useEffect(() => {
    axios(`/api/v1/projects/${props.projectID}`)
      .then(response => {
        if (response.data) { setProject(response.data[0]) }
      })
  }, [])

  function onClose() {
    setIsOpen(false)
  }

  function onOpen() {
    setIsOpen(true)
  }

  function onCreate() {
    setIsOpen(false)
    
    if (projectName === props.projectName) {
      axios.delete(`/api/v1/projects/${project.ProjectID}`)
      toast({
        title: `${project.ProjectName} has been deleted.`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Failed to delete project.',
        description: "The project names don\'t match.",
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Button colorScheme='red' onClick={onOpen}>
        Delete {project.ProjectName}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete project
            </AlertDialogHeader>
  
            <AlertDialogBody>
              Type "{project.ProjectName}" to confirm this action.
              <Input
                value={projectName}
                onChange={handleProjectNameChange}
                id='projectNameConfirm'
                placeholder='Project name'
              />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={onCreate} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}