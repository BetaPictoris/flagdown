import React from "react";
import axios from "axios";
import { Button, Center, Flex, Input, Text, useToast } from "@chakra-ui/react";

import "./styles/FlagValue.scss"

export default function FlagValue(props) {
  const [value, setValue] = React.useState(props.flag.Value);
  const handleChange = (event) => setValue(event.target.value);

  const toast = useToast();

  const onSubmit = () => {
    axios
      .patch(
        `/api/v1/projects/${props.flag.ProjectID}/flags/${props.flag.FlagID}`,
        { Value: value }
      )
      .then(() => {
        toast({
          title: `${props.flag.FlagName}'s value has been updated.`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  return (
    <div className="FlagValue">
      <Flex>
        <Center>
          <Text>Value:</Text>{" "}
        </Center>
        <Input value={value} onChange={handleChange} placeholder="Flag value" />
        <Button onClick={onSubmit}>Update</Button>
      </Flex>
    </div>
  );
}
