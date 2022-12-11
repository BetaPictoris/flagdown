import {
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

import DeleteProjectPrompt from "../components/DeleteProjectPrompt";
import Flags from "../components/Flags";

export default function Project(props) {
  return (
    <div className="ProjectPage Page">
      <Heading as="h2">{props.ProjectName}</Heading>

      <Tabs>
        <TabList>
          <Tab>Flags</Tab>
          <Tab>Settings</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Flags projectID={props.projectID} />
          </TabPanel>
          <TabPanel>
            <DeleteProjectPrompt projectID={props.projectID} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
