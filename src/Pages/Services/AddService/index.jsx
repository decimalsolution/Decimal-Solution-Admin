import { Container, Group } from "@mantine/core";
import InputField from "../../../components/InputField";
import TextArea from "../../../components/TextArea";
import { useForm } from "@mantine/form";
import Button from "../../../components/Button";
import PageHeader from "../../../components/PageHeader";

export const AddService = () => {
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      title: "",
      description: "",
      shortDescription: "",
      coverImage: null,
      homeImage: null,
    },

    validate: {
      title: (value) =>
        value?.length > 1 && value?.length < 30
          ? null
          : "Please enter service title between 2 to 30 characters",
      description: (value) =>
        value?.length > 0 ? null : "Please enter project description",
      shortDescription: (value) =>
        value?.length > 0 ? null : "Please enter short description",
    },
  });

  return (
    <Container fluid>
      <PageHeader label={"Add Service"} />
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <InputField
          label={"Title"}
          placeholder={"Enter Service Title"}
          form={form}
          validateName={"title"}
        />
        <TextArea
          label={"Short Description"}
          placeholder={"Enter Short Description"}
          rows="2"
          form={form}
          validateName={"shortDescription"}
        />
        <TextArea
          label={"Detail Description"}
          placeholder={"Enter Detailed Description"}
          rows="4"
          form={form}
          validateName={"description"}
        />
        <Group  position="right">
          <Button label={"Cancel"} variant={"outline"} />
          <Button label={"Add Service"} type={"submit"} />
        </Group>
      </form>
    </Container>
  );
};
