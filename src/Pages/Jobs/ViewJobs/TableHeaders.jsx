import { Text } from "@mantine/core";
import ActionIcons from "../../../components/ActionIcons";
import StatusToggle from "../../../components/StatusToggle";
import ViewJob from "./ViewJob";

export const Columns = [
  {
    name: "Sr No.",
    selector: (row) => row.serialNo,
    width: "100px",
    sortable: true,
  },
  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
    // center: true,
    width: "200px",
  },
  {
    name: "Category",
    selector: (row) => row.category?.title,
    sortable: true,
    // center: true,
    width: "200px",
  },
  {
    name: "Vacancy",
    selector: (row) => row?.vacancies,
    sortable: true,
    center: true,
    width: "110px",
  },
  {
    name: "Job Level",
    selector: (row) => row?.jobLevel,
    sortable: true,
    // center: true,
    width: "150px",
  },
  {
    name: "Job Type",
    selector: (row) => row?.type,
    sortable: true,
    // center: true,
    width: "150px",
  },
  {
    name: "Salary Range (PKR)",
    selector: (row) => row?.minimumJobSalary,
    sortable: true,
    // center: true,
    width: "200px",
    cell: (row) => (
      <Text>
        {row?.minimumJobSalary} - {row?.maximumJobSalary}
      </Text>
    ),
  },
  {
    name: "Status",
    selector: (row) => row.blocked,
    width: "150px",
    sortable: true,
    center: true,
    cell: (row) => (
      <StatusToggle
        status={row.blocked}
        id={row._id}
        type={"jobs"}
        queryName="fetchJobs"
      />
    ),
  },
  {
    name: "Actions",
    center: true,
    cell: (row) => (
      <ActionIcons
        rowData={row}
        view={true}
        del={true}
        edit={true}
        viewData={<ViewJob rowData={row} />}
        type="jobs"
      />
    ),
  },
];

export const filterbyStatus = [
  { label: "All", value: null },
  { label: "Blocked", value: true },
  { label: "Unblocked", value: false },
];
