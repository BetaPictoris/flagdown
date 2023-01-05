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
  Spinner,
} from "@chakra-ui/react";

export default function DeleteProjectPrompt(props) {
  const [project, setProject] = React.useState({});
  const [isOpen, setIsOpen] = React.useState(false);
  const cancelRef = React.useRef();
  const toast = useToast();

  const [projectName, setProjectName] = React.useState("");
  const handleProjectNameChange = (event) => setProjectName(event.target.value);

  React.useEffect(() => {
    axios(`/api/v1/projects/${props.projectID}`).then((response) => {
      if (response.data) {
        setProject(response.data[0]);
      }
    });
  }, [props.projectID]);

  const onDelete = () => {
    setIsOpen(false);

    if (projectName === project.ProjectName) {
      axios.delete(`/api/v1/projects/${project.ProjectID}`);
      toast({
        title: `${project.ProjectName} has been deleted.`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      window.location.reload();
    } else {
      toast({
        title: "Failed to delete project.",
        description: "The project names don't match.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button colorScheme="red" onClick={() => setIsOpen(true)}>
        {project.ProjectName ? <>Delete {project.ProjectName}</> : <Spinner />}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete project
            </AlertDialogHeader>

            <AlertDialogBody>
              Type &quot;{project.ProjectName}&quot; to confirm this action.
              <Input
                value={projectName}
                onChange={handleProjectNameChange}
                id="projectNameConfirm"
                placeholder="Project name"
              />
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
