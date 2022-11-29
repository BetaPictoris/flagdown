import React from 'react';

import './styles/App.scss'

import { Heading } from '@chakra-ui/react'

import Flags from './components/Flags'
import NewProjectPrompt from './components/NewProjectPrompt'
import DeleteProjectPrompt from './components/DeleteProjectPrompt'

export default function App() {
  return (
    <div className='App'>
      <div className='Header'>
        <Heading as='h1'>🚩 Flagdown</Heading>
      </div>
      
      <div className='AppCont'>
        <NewProjectPrompt />
        <DeleteProjectPrompt projectID="1" />
        <Flags projectID="1" />
      </div>

      <div className='Footer'>
        Made with ❤ by <a href="//github.com/BetaPictoris">Beta Pictoris</a>.
      </div>
    </div>
  );
}
