import React from "react";
import axios from "axios";

import { Accordion, Divider, Heading } from "@chakra-ui/react";

import NewFlagPrompt from "./NewFlagPrompt";
import Flag from "./Flag";

import "./styles/Flags.scss";

export default function Flags(props) {
  const [project, setProject] = React.useState({});
  const [flags, setFlags] = React.useState([]);

  React.useEffect(() => {
    axios(`/api/v1/projects/${props.projectID}`).then((response) => {
      if (response.data) {
        setProject(response.data[0]);
      }
    });
  }, [props.projectID]);

  React.useEffect(() => {
    axios(`/api/v1/projects/${project.ProjectName}/flags`).then((response) => {
      if (response.data) {
        setFlags(response.data);
      }
    });
  }, [project.ProjectName]);

  return (
    <div className="Projects">
      <Heading as="h2">Flags</Heading>
      <NewFlagPrompt projectID={project.ProjectID} />

      <Divider />

      <div className="flagList">
        <Accordion allowToggle>
          {flags.map((flag) => (
            <Flag key={flag.FlagID} flag={flag} project={project} />
          ))}
        </Accordion>
      </div>
    </div>
  );
}
