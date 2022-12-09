import {
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Badge,
  Code,
} from "@chakra-ui/react";

import DeleteFlagPrompt from "./DeleteFlagPrompt";

export default function Flag(props) {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {props.flag.FlagName} <Badge>{props.flag.FlagID}</Badge>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <div className="flag">
          {props.flag.Description
            ? props.flag.Description
            : "This flag has no description."}
        </div>

        <div className="flagValueBox">
          Value: <Code>{props.flag.Value}</Code>
        </div>

        <DeleteFlagPrompt
          projectName={props.project.ProjectName}
          flagName={props.flag.flagName}
        />
      </AccordionPanel>
    </AccordionItem>
  );
}
