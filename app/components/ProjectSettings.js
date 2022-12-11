import {Heading} from "@chakra-ui/react"

import DeleteProjectPrompt from "./DeleteProjectPrompt";


export default function ProjectSettings(props) {
  <div className="ProjectSettings">
    <Heading as="h2">{props.project.ProjectName} settings</Heading>

    <DeleteProjectPrompt projectID={props.project.projectID} />
  </div>
}