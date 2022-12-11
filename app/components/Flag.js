import {
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Badge,
} from "@chakra-ui/react";

import FlagValue from "./FlagValue";

import DeleteFlagPrompt from "./DeleteFlagPrompt";
import RenameFlagPrompt from "./RenameFlagPrompt";

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
        <div className="flagDescription">
          {props.flag.Description
            ? props.flag.Description
            : "This flag has no description."}
        </div>

        <div className="flagValueBox">
          <FlagValue flag={props.flag} />
        </div>

        <DeleteFlagPrompt
          projectName={props.project.ProjectName}
          flagName={props.flag.flagName}
        />

        <RenameFlagPrompt
          flag={props.flag}
        />
      </AccordionPanel>
    </AccordionItem>
  );
}
