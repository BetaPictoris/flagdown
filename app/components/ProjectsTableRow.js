import {
  Tr,
  Td,
} from "@chakra-ui/react";

export default function ProjectsTableRow(props) {
  return (
    <Tr key={props.project.ProjectID}>
      <Td>{props.project.ProjectName}</Td>
      <Td isNumeric>{props.project.ProjectID}</Td>
      <Td>
        <a href={`#project/${props.project.ProjectID}`}>Go</a>
      </Td>
    </Tr>
  )
}