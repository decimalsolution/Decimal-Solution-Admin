import { Flex, Image, Text, Title } from "@mantine/core";
import logo from "../../assets/logo.svg";

export const Header = () => {
  return (
    <Flex w={"100vw"} style={{ color: "black" }} justify={"space-between"} align={"center"}>
      <Image src={logo} width={"100px"} />
      <Title order={2} color="purple">Admin Panel</Title>
      <Text>Logout</Text>
    </Flex>
  );
};
