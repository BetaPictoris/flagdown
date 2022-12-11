import React from "react";

import { Heading } from "@chakra-ui/react";

import NewProjectPrompt from "../components/NewProjectPrompt";
import ProjectsTable from "../components/ProjectsTable";

export default function Home() {
  return (
    <div className="HomePage Page">
      <Heading as="h2" size="lg">
        Home
      </Heading>

      <NewProjectPrompt />
      <ProjectsTable />
    </div>
  );
}
