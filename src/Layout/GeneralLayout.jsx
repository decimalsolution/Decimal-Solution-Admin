import {
  AppShell,
  Burger,
  Container,
  Header,
  MediaQuery,
  Navbar,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SideBar } from "../components/Sidebar";
import { routeNames } from "../Routes/routeNames";
import { Header as MyHeader } from "../components/Header";

const GeneralLayout = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const allowed = () => {
    return true;
  };

  return true ? (
    <AppShell
      styles={{
        main: {
          background: "rgb(0,0,0,0.05)",
        },
      }}
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <SideBar opened={opened} setOpened={setOpened} />
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <MyHeader />
          </div>
        </Header>
      }
    >
      <Container bg="white" m="lg" p="md" size={"xl"} style={{ borderRadius: "10px" }}>
        {allowed() && <Outlet />}
      </Container>
    </AppShell>
  ) : (
    <Navigate to={routeNames.general.landing} />
  );
};
export default GeneralLayout;
