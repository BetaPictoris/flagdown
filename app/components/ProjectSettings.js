import { Box, Heading } from "@chakra-ui/react";

import RenameProjectPrompt from "./RenameProjectPrompt";
import DeleteProjectPrompt from "./DeleteProjectPrompt";

import "./styles/ProjectSettings.scss";

export default function ProjectSettings(props) {
  return (
    <div className="ProjectSettings">
      <Box
        className="infoZone"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <RenameProjectPrompt project={props.project} />
      </Box>

      <Heading as="h3">Danager Zone</Heading>
      <Box
        className="dangerZone"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        borderColor="tomato"
      >
        <DeleteProjectPrompt projectID={props.project.ProjectID} />
      </Box>
    </div>
  );
}
