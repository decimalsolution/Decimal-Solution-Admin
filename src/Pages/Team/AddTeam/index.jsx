import axios from "axios";
import { Container, Group } from "@mantine/core";
import { useMutation } from "react-query";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import InputField from "../../../components/InputField";
import TextArea from "../../../components/TextArea";
import Button from "../../../components/Button";
import PageHeader from "../../../components/PageHeader";
import { backendUrl } from "../../../constants/constants";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../contexts/UserContext";
import DropZone from "../../../components/Dropzone";
import { useLocation, useNavigate } from "react-router";
import { routeNames } from "../../../Routes/routeNames";

export const AddTeam = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let { state } = useLocation();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      teamMemberName: "",
      teamMemberTitle: "",
      teamMemberEmail: "",
      teamMemberImage: null,
      teamMemberPhone: "",
      teamMemberFacebookLink: "facebook.com/",
      teamMemberTwitterLink: "twitter.com/",
      teamMemberLinkedInLink: "linkedin.com/",
      memberPriority: "",
    },
    // we will add team member CNIC as well
    validate: {
      teamMemberName: (val) =>
        val.trim().length < 1
          ? "Please Enter Value Of Length Greater Than 0"
          : null,
      teamMemberTitle: (val) =>
        val.trim().length < 1
          ? "Please Enter Value Of Length Greater Than 0"
          : null,
      teamMemberEmail: (val) =>
        /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,6}$/i.test(val)
          ? null
          : "Please Enter A Valid Email",
      // teamMemberPhone, must be 11 digits and digits only
      teamMemberPhone: (val) =>
        /^(\+92|0)?3\d{2}-?\d{7}$/.test(val)
          ? null
          : "Please Enter A Valid Phone Number",
      teamMemberFacebookLink: (val) =>
        val.trim().length < 1
          ? "Please Enter Value Of Length Greater Than 0"
          : null,
      teamMemberTwitterLink: (val) =>
        val.trim().length < 1
          ? "Please Enter Value Of Length Greater Than 0"
          : null,
      teamMemberLinkedInLink: (val) =>
        val.trim().length < 1
          ? "Please Enter Value Of Length Greater Than 0"
          : null,
      memberPriority: (val) => val.trim().length < 1,
    },
  });

  useEffect(() => {
    if (state?.isUpdate) {
      form.setValues(state.data);
    }
  }, [state]);
  const handleAddTeam = useMutation(
    (values) => {
      if (state?.isUpdate)
        return axios.patch(
          `${backendUrl + `/api/v1/teamMember/${state?.data?._id}`}`,
          values,
          {
            headers: {
              authorization: `bearer ${user.token}`,
            },
          }
        );
      else
        return axios.post(`${backendUrl + "/api/v1/teamMember"}`, values, {
          headers: {
            authorization: `bearer ${user.token}`,
          },
        });
    },
    {
      onSuccess: (response) => {
        if (response.data?.success) {
          showNotification({
            title: "Success",
            message: response?.data?.message,
            color: "green",
          });
          navigate(routeNames.general.viewTeams);
          form.reset();
        } else {
          showNotification({
            title: "Error",
            message: response?.data?.message,
            color: "red",
          });
        }
      },
    }
  );
  return (
    <Container fluid>
      <PageHeader
        label={state?.isUpdate ? "Edit Team Member" : "Add Team Member"}
      />
      <form onSubmit={form.onSubmit((values) => handleAddTeam.mutate(values))}>
        <InputField
          label={"Team Member Name"}
          placeholder={"Enter Team Member Name"}
          form={form}
          withAsterisk
          validateName={"teamMemberName"}
        />
        <InputField
          label={"Job Title"}
          placeholder={"Enter Job Title"}
          form={form}
          withAsterisk
          validateName={"teamMemberTitle"}
        />
        <InputField
          label={"Email Address"}
          placeholder={"Enter Email Address of Team Member"}
          form={form}
          withAsterisk
          validateName={"teamMemberEmail"}
        />
        <InputField
          label={"Contact Number"}
          placeholder={"Enter Contact Number of Team Member"}
          form={form}
          withAsterisk
          validateName={"teamMemberPhone"}
        />
        <InputField
          label={"Priority"}
          placeholder={"Enter Priority"}
          form={form}
          withAsterisk
          validateName={"memberPriority"}
        />
        <InputField
          label={"Facebook Link"}
          placeholder={"www.facebook.com/team-member-profile"}
          form={form}
          validateName={"teamMemberFacebookLink"}
        />
        <InputField
          label={"Twitter Link"}
          placeholder={"www.twitter.com/team-member-profile"}
          form={form}
          validateName={"teamMemberTwitterLink"}
        />
        <InputField
          label={"LinkedIn Link"}
          placeholder={"www.linkedin.com/team-member-profile"}
          form={form}
          validateName={"teamMemberLinkedInLink"}
        />

        <Group position="center">
          <DropZone
            form={form}
            folderName={"teamMember"}
            name={"teamMemberImage"}
            label="Team Member Image"
          />
        </Group>
        <Group position="right" mt={"md"}>
          <Button
            label={"Cancel"}
            variant={"outline"}
            onClick={() => navigate(routeNames.general.viewService)}
          />
          <Button
            label={state?.isUpdate ? "Edit Team Member" : "Add Team Member"}
            type={"submit"}
            loading={handleAddTeam.isLoading}
          />
        </Group>
      </form>
    </Container>
  );
};
