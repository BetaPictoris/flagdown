import React from 'react';
import axios from 'axios';

import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'

import DeleteFlagPrompt from './DeleteFlagPrompt';

export default function Projects(props) {
  const [flags, setFlags] = React.useState([])

  React.useEffect(() => {
    axios(`/api/v1/projects/${props.projectName}/flags`)
      .then(response => {
        if (response.data) { setFlags(response.data); }
      })
  }, [props.projectName])

  return (
    <div className='Projects'>
      <Accordion>
        {flags.map(flags => 
          <AccordionItem
            key={flags.FlagID}
          >
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      {flags.FlagName}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <DeleteFlagPrompt 
                    projectName={props.projectName}
                    flagName={flags.flagName}
                  />
                </AccordionPanel>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  )
}