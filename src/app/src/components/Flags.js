import React from 'react';
import axios from 'axios';

import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'

export default function Projects(props) {
  const [flags, setFlags] = React.useState([])

  React.useEffect(() => {
    axios(`/api/v1/projects/${props.projectName}/flags`)
      .then(response => {
        if (response.data) { setFlags(response.data); alert(response.data) }
      })
  }, [])

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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                  commodo consequat.
                </AccordionPanel>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  )
}