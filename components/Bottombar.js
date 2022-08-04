import { useState } from "react";
import { FormControl, Input, Button } from "@chakra-ui/react";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseconfig";

export default function Bottombar({ id, user }) {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, `chats/${id}/messages`), {
      text: input,
      sender: user.email,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <FormControl
      p={3}
      onSubmit={sendMessage}
      as="form"
      bgGradient="linear(to-r, green.100,teal.200)"
    >
      <Input
        boxShadow="sm"
        placeholder="Type a message..."
        autoComplete="off"
        onChange={(e) => setInput(e.target.value)}
        value={input}
        //variant="filled"
        focusBorderColor="green.400"
        errorBorderColor="red.300"
        color="black"
        _placeholder={{ color: "inherit" }}
      />
      <Button type="submit" hidden>
        Submit
      </Button>
    </FormControl>
  );
}
