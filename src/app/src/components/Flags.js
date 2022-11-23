import React from 'react';
import axios from 'axios';

import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from '@chakra-ui/react'
import { Divider, Box, Heading, Badge } from '@chakra-ui/react'

import DeleteFlagPrompt from './DeleteFlagPrompt';
import NewFlagPrompt from './NewFlagPrompt';

export default function Projects(props) {
  const [project, setProject] = React.useState({})
  const [flags, setFlags] = React.useState([])

  React.useEffect(() => {
    axios(`/api/v1/projects/${props.projectID}`)
      .then(response => {
        if (response.data) { setProject(response.data[0]); }
      })
  }, [props.projectID])

  React.useEffect(() => {
    axios(`/api/v1/projects/${project.ProjectName}/flags`)
      .then(response => {
        if (response.data) { setFlags(response.data); }
      })
  }, [project.ProjectName])

  return (
    <div className='Projects'>
      <Heading as='h2'>
        Flags
      </Heading>
      <NewFlagPrompt projectID={project.ProjectID} />

      <Divider />
      
      <Accordion>
        {flags.map(flag => 
          <AccordionItem
            key={flag.FlagID}
          >
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      {flag.FlagName} <Badge>{flag.FlagID}</Badge>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <DeleteFlagPrompt 
                    projectName={project.ProjectName}
                    flagName={flag.flagName}
                  />
                </AccordionPanel>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  )
}