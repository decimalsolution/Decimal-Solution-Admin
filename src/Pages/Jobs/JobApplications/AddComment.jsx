import { Anchor, Box, Group, Modal } from "@mantine/core";
import TextArea from "../../../components/TextArea";
import Button from "../../../components/Button";
import { useState } from "react";

const AddComment = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Anchor
        onClick={() => {
          setOpen(true);
        }}
      >
        Add Comment
      </Anchor>
      <Modal
        title="Add Comment"
        opened={open}
        onClose={() => setOpen(false)}
        withCloseButton={false}
        centered
        radius={"lg"}
      >
        <TextArea
          rows="4"
          label={"Application Comment"}
          placeholder={"Enter application comments"}
        />
        <Group position="right" mt={"md"}>
          <Button
            label={"Cancel"}
            variant={"outline"}
            onClick={() => setOpen(false)}
          />
          <Button
            label={"Add Comment"}
            type={"submit"}
            // loading={handleAddJob.isLoading}
          />
        </Group>
      </Modal>
    </Box>
  );
};
export default AddComment;
