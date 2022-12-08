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
} from '@chakra-ui/react'

import NewProjectPrompt from "../components/NewProjectPrompt"

export default function Home() {
  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    axios(`/api/v1/projects`).then((response) => {
      if (response.data) {
        setProjects(response.data);
      }
    });
  }, []);

  return(
    <div className='HomePage Page'>
      <NewProjectPrompt /> 

      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Project Name</Th>
              <Th isNumeric>ID</Th>
              <Th>Link</Th>
            </Tr>
          </Thead>
          <Tbody>
            {projects.map((project) => (
              <Tr>
                <Td>{project.ProjectName}</Td>
                <Td isNumeric>{project.ProjectID}</Td>
                <Td><a href={`#project/${project.ProjectID}`}>Go</a></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}