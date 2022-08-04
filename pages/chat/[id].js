import { Flex, Text } from "@chakra-ui/layout";
import Sidebar from "../../components/Sidebar";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { db, auth } from "../../firebaseconfig";
import getOtherEmail from "../../utils/getOtherEmail";
import Topbar from "../../components/Topbar";
import Bottombar from "../../components/Bottombar";
import { useRef, useEffect } from "react";

export default function Chat() {
  const router = useRouter();
  const { id } = router.query;
  const [user] = useAuthState(auth);
  const [chat] = useDocumentData(doc(db, "chats", id));
  const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"));
  const [messages] = useCollectionData(q);
  const bottomOfChat = useRef();

  const getMessages = () =>
    messages?.map((msg) => {
      const sender = msg.sender === user.email;
      return (
        <Flex
          key={Math.random()}
          alignSelf={sender ? "flex-start" : "flex-end"}
          bg={sender ? "cyan.100" : "cyan.300"}
          w="fit-content"
          minWidth="100px"
          borderRadius="lg"
          p={2}
          m={2}
        >
          <Text>{msg.text}</Text>
        </Flex>
      );
    });

  useEffect(
    () =>
      setTimeout(
        bottomOfChat.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
        100
      ),
    [messages]
  );

  return (
    <div className="con_all m-4 shadow-lg">
      <Flex h="90vh">
        <Head>
          <title>Chat App</title>
        </Head>

        <Sidebar />

        <Flex flex={1} direction="column">
          <Topbar email={getOtherEmail(chat?.users, user)} />

          <Flex
            flex={1}
            direction="column"
            pt={4}
            pl={2}
            overflowY="scroll"
            sx={{ scrollbarWidth: "none" }}
            //bgPosition="center"
            backgroundPosition="center"
            backgroundRepeat="repeat"
            backdropFilter="auto"
            backdropContrast="50%"
            bgImage="url('https://www.itl.cat/pngfile/big/2-27655_whatsapp-background-wallpaper.jpg')"
          >
            {getMessages()}
            <div ref={bottomOfChat}></div>
          </Flex>

          <Bottombar id={id} user={user} />
        </Flex>
      </Flex>
    </div>
  );
}
