import ActionIcons from "../../../components/ActionIcons";
import StatusToggle from "../../../components/StatusToggle";
import TableImageView from "../../../components/TableImageView";
import ViewTeamMember from "./ViewTeamMember";

export const Columns = [
  {
    name: "Sr No.",
    selector: (row) => row.serialNo,
    width: "100px",
    sortable: true,
  },
  {
    name: "",
    selector: (row) => row.teamMemberImage,
    center: true,
    width: "40px",
    cell: (row) => <TableImageView src={row?.teamMemberImage} />,
  },
  {
    name: "Member Name",
    selector: (row) => row.teamMemberName,
    sortable: true,
    // center: true,
    width: "250px",
  },
  {
    name: "Job Title",
    selector: (row) => row.teamMemberTitle,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.teamMemberEmail,
    sortable: true,
  },
  {
    name: "Contact",
    selector: (row) => row.teamMemberPhone,
    sortable: true,
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
        type={"service"}
        queryName="fetchServices"
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
        viewData={<ViewTeamMember rowData={row} />}
        type="Team Member"
      />
    ),
  },
];

export const filterbyStatus = [
  { label: "All", value: null },
  { label: "Blocked", value: true },
  { label: "Unblocked", value: false },
];
