import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/button";
import { Flex, Text, Heading, Center } from "@chakra-ui/layout";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseconfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, addDoc } from "@firebase/firestore";
import { db } from "../firebaseconfig";
import getOtherEmail from "../utils/getOtherEmail";
import { useRouter } from "next/router";

import { BiLogOut, BiMessageAdd } from "react-icons/Bi";

export default function Sidebar() {
  const [user] = useAuthState(auth);
  const [snapshot, loading, error] = useCollection(collection(db, "chats"));
  const chats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const router = useRouter();

  const redirect = (id) => {
    router.push(`/chat/${id}`);
  };

  const chatExists = (email) =>
    chats?.find(
      (chat) => chat.users.includes(user.email) && chat.users.includes(email)
    );

    const newChat = async () => {
      const input = prompt("Enter email of chat recipient");
      if (!chatExists(input) && input != user.email) {
        await addDoc(collection(db, "chats"), { users: [user.email, input] });
      }
    };

  const chatList = () => {
    return chats
      ?.filter((chat) => chat.users.includes(user.email))
      .map((chat) => (
        <Flex
          key={Math.random()}
          p={2}
          ps={6}
          align="center"
          _hover={{
            bgGradient: "linear(to-r, teal.200, green.100)",
            cursor: "pointer",
          }}
          onClick={() => redirect(chat.id)}
          borderBottom="1px solid"
          borderColor="green.200"
        >
          <Avatar size="sm" src="" marginEnd={3} />
          <Text>{getOtherEmail(chat.users, user)}</Text>
        </Flex>
      ));
  };

  return (
    <Flex
      bgGradient="linear(to-r, teal.50, green.100)"
      h="100%"
      w="350px"
      borderEnd="1px solid"
      borderColor="green.200"
      direction="column"
    >
      <Flex
        bgGradient="linear(to-r, teal.200, green.100)"
        h="60px"
        w="100%"
        align="center"
        justifyContent="space-between"
        borderBottom="1px solid"
        borderColor="green.200"
        p={3}
      >
        <Flex align="center" ps={5}>
          <Avatar size="sm" src={user.photoURL} marginEnd={3} />
          <Center>
            <Heading as="h5" size="sm" color="black.100 " noOfLines={1}>
              {user.displayName}
            </Heading>
          </Center>
        </Flex>

        <IconButton
          boxShadow="sm"
          size="lg"
          bg="white.300"
          colorScheme="gray"
          color="red.100 "
          _hover={{
            bgGradient: "linear(to-r, teal.300, green.300)",
            cursor: "pointer",
          }}
          icon={<BiLogOut />}
          onClick={() => signOut(auth)}
        />
      </Flex>

      <Button
        m={5}
        p={2}
        _hover={{
          bgGradient: "linear(to-r, teal.300, green.300)",
          cursor: "pointer",
        }}
        bgGradient="linear(to-r, teal.100, green.200)"
        onClick={() => newChat()}
        leftIcon={<BiMessageAdd />}
      >
        New Chat
      </Button>

      <Flex
        overflow="hidden"
        direction="column"
        borderTop="1px solid"
        borderColor="green.200"
        bgGradient="linear(to-r, teal.50, green.100)"
        sx={{ scrollbarWidth: "none" }}
        flex={1}
      >
        {chatList()}
      </Flex>
    </Flex>
  );
}
