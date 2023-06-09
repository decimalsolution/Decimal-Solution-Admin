import { Anchor, Text } from "@mantine/core";
import ActionIcons from "../../../components/ActionIcons";
import StatusToggle from "../../../components/StatusToggle";
import ViewJob from "./ViewJob";
import moment from "moment";

export const Columns = [
  {
    name: "Sr No.",
    selector: (row) => row.serialNo,
    width: "100px",
    sortable: true,
  },
  {
    name: "Applicant Name",
    selector: (row) => row.fullName,
    sortable: true,
    // center: true,
    width: "170px",
  },
  {
    name: "Email",
    selector: (row) => row?.email,
    width: "170px",
    sortable: true,
  },
  {
    name: "Applied Date",
    selector: (row) => moment(row.createdAt).format("DD-MMM-YYYY"),
    sortable: true,
    // center: true,
    width: "200px",
  },

  {
    name: "Gender",
    selector: (row) => row?.gender,
    sortable: true,
    // center: true,
    width: "150px",
  },
  {
    name: "Resume",
    selector: (row) => row?.resume,
    sortable: true,
    // center: true,
    width: "120px",
    cell: (row) => {
      return row?.resume !== "" ? <Anchor href={row?.resume} target="_blank">File</Anchor> : <Text>No file</Text>;
    },
  },

  // {
  //   name: "Status",
  //   selector: (row) => row.blocked,
  //   width: "150px",
  //   sortable: true,
  //   center: true,
  //   cell: (row) => (
  //     <StatusToggle
  //       status={row.blocked}
  //       id={row._id}
  //       type={"jobs"}
  //       queryName="fetchJobs"
  //     />
  //   ),
  // },
  {
    name: "Actions",
    center: true,
    cell: (row) => (
      <ActionIcons
        rowData={row}
        view={true}
        // del={true}
        // edit={true}
        viewData={<ViewJob rowData={row} />}
        type="Job Application"
      />
    ),
  },
];

export const filterbyStatus = [
  { label: "All", value: null },
  { label: "Blocked", value: true },
  { label: "Unblocked", value: false },
];
