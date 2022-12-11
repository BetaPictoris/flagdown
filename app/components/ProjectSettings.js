import {Box, Heading} from "@chakra-ui/react"

import DeleteProjectPrompt from "./DeleteProjectPrompt";

import "./styles/ProjectSettings.scss"

export default function ProjectSettings(props) {
  return (
    <div className="ProjectSettings">
      <Heading as="h2">{props.project.ProjectName} settings</Heading>

      <Heading as="h3">Danager Zone</Heading>
      <Box className="dangerZone" borderWidth='1px' borderRadius='lg' overflow='hidden' borderColor='tomato'>
        <DeleteProjectPrompt projectID={props.project.projectID} />
      </Box>
    </div>
  )
}