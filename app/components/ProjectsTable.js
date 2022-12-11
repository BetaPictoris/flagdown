import React from "react";
import axios from "axios";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
} from "@chakra-ui/react";

export default function ProjectsTable(props) {
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
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {projects !== [] &&
            projects.map((project) => (
              <Tr>
                <Td>{project.ProjectName}</Td>
                <Td isNumeric>{project.ProjectID}</Td>
                <Td>
                  <a href={`#project/${project.ProjectID}`}>Go</a>
                </Td>
              </Tr>
            ))}
          {!projectLoaded && <Spinner className="projectLoadingSpinner" />}
        </Tbody>
      </Table>
    </TableContainer>
  )
}