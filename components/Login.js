import Head from "next/head";
import { Box, Button, Center, Stack } from "@chakra-ui/react";
import { Image, Heading } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../firebaseconfig";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="bg">
        <div className="cards ">
          <div className="row">
            <div className="col-md-6 left p-1">
              <Center>
                <Image
                  className="img"
                  boxSize="350px"
                  objectFit="cover"
                  src="https://img.freepik.com/free-vector/content-concept-illustration_114360-1483.jpg?w=2000"
                  alt="Dan Abramov"
                />{" "}
              </Center>

              <Center>
                <Heading as="h5" size="md" color="Teal " p={1} noOfLines={1}>
                  WELCOME
                </Heading>
              </Center>
            </div>
            <div className="col-md-6 right p-5">
              <Heading as="h5" size="md" color="White " noOfLines={1}>
                Hello !
              </Heading>
              <Center>
                <Heading as="h5" size="md" mt={10} color="White " noOfLines={1}>
                  Login Your Account
                </Heading>
              </Center>

              <Center className="btn" mt={10}>
                <Button
                  boxShadow="xl"
                  leftIcon={<FcGoogle />}
                  colorScheme="gray"
                  variant="solid"
                  onClick={() =>
                    signInWithGoogle("", { prompt: "select_account" })
                  }
                >
                  Click to Login
                </Button>
              </Center>
            </div>
          </div>
        </div>
      </div>

      {/* <Center h="100vh">
        <Stack
          align="center"
          bgColor="gray.600"
          p={16}
          rounded="3xl"
          spacing={12}
          boxShadow="lg"
        >
          <Box
            bgColor="blue.500"
            w="fit-content"
            p={5}
            rounded="3xl"
            boxShadow="md"
          >
            <ChatIcon w="100px" h="100px" color="white" />
          </Box>

          <Button
            boxShadow="md"
            onClick={() => signInWithGoogle("", { prompt: "select_account" })}
          >
            Sign In with Google
          </Button>
        </Stack>
      </Center> */}
    </>
  );
}
