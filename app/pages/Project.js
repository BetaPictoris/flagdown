import { Divider } from "@chakra-ui/react";
import DeleteProjectPrompt from "../components/DeleteProjectPrompt";
import Flags from "../components/Flags"

export default function Project(props) {
  return (
    <div className="ProjectPage Page">
      <Flags projectID={props.projectID} />

      <Divider />
      
      <DeleteProjectPrompt projectID={props.projectID} />
    </div>
  )
}