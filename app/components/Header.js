import { Flex, Heading, Box, Spacer, ButtonGroup } from "@chakra-ui/react";

export default function Header() {
  return (
    <Flex className="Header" minWidth="max-content" alignItems="center" gap="2">
      <Box p="2">
        <Heading as="h1" size="xl">
          <a href="/app">Flagdown</a>
        </Heading>
      </Box>
      <Spacer />
      <ButtonGroup gap="2">
        {/* Settings, admin, and account buttons will go here. */}
      </ButtonGroup>
    </Flex>
  );
}
