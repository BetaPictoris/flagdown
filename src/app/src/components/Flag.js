import {
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { Box, Badge } from "@chakra-ui/react";

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
        <DeleteFlagPrompt
          projectName={props.project.ProjectName}
          flagName={props.flag.flagName}
        />
      </AccordionPanel>
    </AccordionItem>
  );
}
