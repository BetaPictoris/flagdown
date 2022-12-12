import React from "react";
import axios from "axios";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Spinner,
} from "@chakra-ui/react";

import ProjectsTableRow from "./ProjectsTableRow";

export default function ProjectsTable() {
  const [projectLoaded, setProjectLoaded] = React.useState(false);
  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    axios(`/api/v1/projects`).then((response) => {
      if (response.data) {
        setProjects(response.data);
        setProjectLoaded(true);
      }
    });
  }, []);

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Project Name</Th>
            <Th isNumeric>ID</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {projects !== [] &&
            projects.map((project) => (
              <ProjectsTableRow 
                key={project.ProjectID}
                project={project}
              />
            ))}
          {!projectLoaded && <Spinner className="projectLoadingSpinner" />}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
