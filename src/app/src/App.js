import React from 'react';

import './styles/App.scss'

import NewProjectPrompt from './components/NewProjectPrompt'
import DeleteProjectPrompt from './components/DeleteProjectPrompt'

export default function App() {
  return (
    <div className='App'>
      <NewProjectPrompt />
      <DeleteProjectPrompt projectID="1" />
    </div>
  );
}
