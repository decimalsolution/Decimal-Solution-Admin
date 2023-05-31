import { createStyles, Navbar, ScrollArea } from "@mantine/core";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { LinksGroup } from "./NavBarLinksGroup";
import { sidebarData } from "./sidebarData";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colors.white,
    boxShadow: "5px 10px 10px rgb(0,0,0,0.1)",
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colors.black,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    backgroundColor: theme.colors.white,
    // backgroundColor:
    //   role === "Social Worker" ? "pink" : role === "Admin" ? "white" : "teal",
    margin: "5px",
    borderRadius: "10px",
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    // maxHeight: "75vh",
    // overflow: "auto",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    color: "black",
    gap: "5px",
    marginTop: "20px",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "30px",
    ":hover": {
      cursor: "pointer",
    },
  },
  footer: {
    backgroundColor: "white",
    // backgroundColor:
    //   role === "Social Worker" ? "pink" : role === "Admin" ? "white" : "teal",
    borderTop: "1px solid rgb(0,0,0,0.05)",
    bottom: "10px",
    width: "100%",
    position: "absolute",
  },
}));

export function SideBar({setOpened, opened }) {
  const { user } = useContext(UserContext);
  const { classes } = useStyles();
  const [globalOpen, setGlobalOpen] = useState("");
  const links = sidebarData?.map((item, ind) => (
    <LinksGroup
      {...item}
      key={ind}
      ind={ind + 1}
      link={item.link}
      globalOpen={globalOpen}
      setGlobalOpen={setGlobalOpen}
      setSideOpen={setOpened}
    />
  ));

  return (
    <Navbar width={{ sm: 320 }} className={classes.navbar}>
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>
    </Navbar>
  );
}
