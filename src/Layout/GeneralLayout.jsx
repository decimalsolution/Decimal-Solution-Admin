import {
  AppShell,
  Burger,
  Container,
  Group,
  MediaQuery,
  Navbar,
  useMantineTheme,
} from "@mantine/core";
import { useContext, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SideBar } from "../Components/Sidebar/Sidebar";
import { routeNames } from "../Routes/routeNames";
import { Header } from "../components/Header";
import { UserContext } from "../contexts/UserContext";

const GeneralLayout = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { user } = useContext(UserContext);

  const allowed = () => {
    return true;
  };

  return user?.role && user?.token ? (
    <AppShell
      styles={{
        main: {
          background: theme.colors.background,
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 320, lg: 320 }}
          bg={""}
        >
          <SideBar opened={opened} setOpened={setOpened} />
        </Navbar>
      }
      footer={<></>}
      header={<></>}
    >
      <Container mih="100%" size="xl" p={"0px"}>
        <Group noWrap>
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color={theme.colors.black}
            />
          </MediaQuery>
          <Header />
        </Group>
        <Container
          bg={theme.colors.container}
          size="xl"
          style={{ borderRadius: "20px", border: "1px solid rgb(0,0,0,0.1)" }}
        >
          {allowed() && <Outlet />}
        </Container>
      </Container>
    </AppShell>
  ) : (
    <Navigate to={routeNames.general.landing} />
  );
};
export default GeneralLayout;
