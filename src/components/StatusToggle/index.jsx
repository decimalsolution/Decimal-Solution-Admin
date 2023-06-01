import { Badge, Loader, Menu } from "@mantine/core";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { backendUrl } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContext";

const StatusToggle = ({ status, id, type, queryName }) => {
  const { user } = useContext(UserContext);
  const [blocked, setBlocked] = useState(status ? true : false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setBlocked(status);
  }, [status]);
  //to change status
  const handleStatusChange = useMutation(
    async () => {
      const link = backendUrl + `/api/v1/${type}/${id}`;
      return axios.patch(link, { blocked: !blocked });
    },
    {
      onSuccess: (res) => {
        queryName && queryClient.invalidateQueries(queryName);
        setBlocked(blocked ? "unBlocked" : "Block");
      },
      onError: (res) => {},
    }
  );

  if (handleStatusChange.isLoading) {
    return <Loader style={{ margin: "auto" }} size="sm" />;
  }
  console.log(status);
  return (
    <Menu
      trigger="hover"
      openDelay={100}
      closeDelay={400}
      position="bottom"
      style={{
        cursor: "pointer",
      }}
    >
      <Menu.Target>
        <Badge color={blocked ? "red" : "green"} w="100px">
          {blocked ? "Blocked" : "Unblocked"}
        </Badge>
      </Menu.Target>
      <Menu.Dropdown>
        {!blocked ? (
          <Menu.Item color="red" onClick={() => handleStatusChange.mutate()}>
            Block
          </Menu.Item>
        ) : (
          <Menu.Item color="green" onClick={() => handleStatusChange.mutate()}>
            Unblock
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

export default StatusToggle;
