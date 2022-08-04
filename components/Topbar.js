import { Flex, Heading, Avatar } from "@chakra-ui/react";

export default function Topbar({ email }) {
  return (
    <Flex
      boxShadow="xl"
      bgGradient="linear(to-r, green.100,teal.200)"
      h="60px"
      w="100%"
      align="center"
      p={5}
      ps={10}
    >
      <Avatar src="" size="sm" marginEnd={3} />
      <Heading as="h5" size="sm" color="black.100 " ps={5} noOfLines={1}>
        {email}
      </Heading>
    </Flex>
  );
}
