import { Container, Grid } from "@mantine/core";
import axios from "axios";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import SelectMenu from "../../../components/SelectMenu";
import { useStyles } from "../styles";
import { Columns, filterbyStatus } from "./TableHeaders";
import PageHeader from "../../../components/PageHeader";
import DataGrid from "../../../components/Table";
import InputField from "../../../components/InputField";
import Button from "../../../components/Button";
import { UserContext } from "../../../contexts/UserContext";
import { backendUrl } from "../../../constants/constants";
import { routeNames } from "../../../Routes/routeNames";
import { useNavigate } from "react-router";

const ViewXTeams = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");
  const [blockedFilter, setBlockedFilter] = useState(null);

  const { status } = useQuery(
    "fetchTeamMembers",
    () => {
      return axios.get(backendUrl + "/api/v1/teamMember", {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });
    },
    {
      onSuccess: (res) => {
        const data = res.data.data;
        data.forEach((item, index) => {
          item.serialNo = index + 1;
        });
        setTableData(data);
      },
    }
  );

  // Filter to show only team members who have left
  const filteredItems = tableData.filter((item) => {
    return item?.left === true; // Only show members who have left
  });

  const handleClearFilters = () => {
    setSearch("");
    setBlockedFilter(null);
  };

  return (
    <Container size="xl" p="sm">
      <PageHeader label={"View Left Team Members"} />
      <Container size="xl" pb={"md"} bg={"white"} className={classes.table}>
        <Grid p="xs">
          <Grid.Col sm="6" md={"6"} lg="3">
            <InputField
              placeholder={"Search By Name"}
              leftIcon="search"
              value={search}
              onChange={(v) => setSearch(v.target.value)}
            />
          </Grid.Col>
          <Grid.Col sm="6" md="6" lg="3">
            <SelectMenu
              placeholder={"Filter by Status"}
              data={filterbyStatus}
              value={blockedFilter}
              onChange={setBlockedFilter}
            />
          </Grid.Col>
          <Grid.Col sm="6" md={"6"} lg="3">
            <Button
              label={"Clear Filters"}
              variant="outline"
              fullWidth
              onClick={handleClearFilters}
            />
          </Grid.Col>
          <Grid.Col sm="6" md={"6"} lg="3">
            <Button
              fullWidth
              label={"Add Team Member"}
              leftIcon="plus"
              onClick={() => navigate(routeNames.general.addTeam)}
            />
          </Grid.Col>
        </Grid>
        <DataGrid
          columns={Columns}
          data={filteredItems}
          progressPending={status === "loading"}
          type="teamMember"
        />
      </Container>
    </Container>
  );
};

export default ViewXTeams;