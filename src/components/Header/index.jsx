import { Image } from "@mantine/core";
import logo from "../../assets/logo.svg"

export const Header = () => {
  return <div style={{ color: "black" }}>
    <Image src={logo} width={"130px"}/>
  </div>;
};
