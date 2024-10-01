/* eslint-disable react/prop-types */
import { Flex, Image, Text, Title, useMantineTheme } from "@mantine/core";

const ViewProduct = ({ rowData }) => {
  const theme = useMantineTheme();
  return (
    <Flex direction={"column"} w={"100%"}>
      <Image
        src={rowData?.blogImage}
        width="200px"
        height={"200px"}
        fit="fill"
        style={{
          border: `5px solid ${theme.primaryColor}`,
        }}
        styles={{
          root: {
            margin: "auto",
            borderRadius: "10%",
            overflow: "hidden",
          },
        }}
      />
      <Text fw={"bold"} color="purple" fz="xl" my={"md"} align="center">
        {rowData?.blogTitle}
      </Text>
      <Title order={3}>Blog Description</Title>
      <Text align="justify">{rowData?.blogDescription}</Text>
      <Title order={3}>Blog Data</Title>
      <Text align="justify">{rowData?.blogData}</Text>
    </Flex>
  );
};
export default ViewProduct;
