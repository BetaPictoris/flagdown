import React from "react";
import axios from "axios";
import {
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner
} from "@chakra-ui/react";

import Flags from "../components/Flags";
import ProjectSettings from "../components/ProjectSettings";

export default function Project(props) {
  const [projectLoaded, setProjectLoaded] = React.useState(false);
  const [project, setProject] = React.useState({});

  React.useEffect(() => {
    axios(`/api/v1/projects/${props.projectID}`).then((response) => {
      if (response.data) {
        setProject(response.data[0]);
        setProjectLoaded(true);
      }
    });
  }, [props.projectID]);

  return (
    <div className="ProjectPage Page">
      {projectLoaded ? ( 
      <div>
        <Heading as="h2">{project.ProjectName}</Heading>

        <Tabs>
          <TabList>
            <Tab>Flags</Tab>
            <Tab>Settings</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Flags project={project} />
            </TabPanel>
            <TabPanel>
              <ProjectSettings project={project} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
