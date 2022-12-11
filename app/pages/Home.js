import React from "react";

import NewProjectPrompt from "../components/NewProjectPrompt";
import ProjectsTable from "../components/ProjectsTable";

export default function Home() {
  return (
    <div className="HomePage Page">
      <NewProjectPrompt />
      
      <ProjectsTable />
    </div>
  );
}
