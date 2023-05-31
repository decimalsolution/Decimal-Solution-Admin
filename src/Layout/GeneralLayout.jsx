import {
    AppShell,
    Burger,
    Footer,
    Header,
    MediaQuery,
    Navbar,
    Text,
    useMantineTheme
} from "@mantine/core";
import { useState } from "react";
import { Header as HeaderCustom } from "../components/Header";

export default function GeneralLayout() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <Text>Application navbar</Text>
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
            <HeaderCustom />
          </div>
        </Header>
      }
    >
      <Text>Resize app to see responsive navbar in action</Text>
    </AppShell>
  );
}
