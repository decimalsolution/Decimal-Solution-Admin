import {
  Badge,
  Flex,
  Image,
  SimpleGrid,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React from "react";

const ViewEmployee = ({ rowData }) => {
  const theme = useMantineTheme();
  return (
    <Flex direction={"column"} align="center" w={"100%"}>
      <SimpleGrid cols={2} spacing="lg">
        <Text fw={"bold"} color="orange">
          Vin #:{" "}
        </Text>
        <Text>{rowData?.vehicle?.vin}</Text>
        <Text fw={"bold"} color="orange">
          Sales Tax:{" "}
        </Text>
        <Text>{rowData?.salesTax}</Text>
        <Text fw={"bold"} color="orange">
          Title Fee:{" "}
        </Text>
        <Text>{rowData?.titleFee}</Text>
        <Text fw={"bold"} color="orange">
          Registration Fee:{" "}
        </Text>
        <Text>{rowData?.registrationFee}</Text>
        <Text fw={"bold"} color="orange">
          Lien Fee:{" "}
        </Text>
        <Text>{rowData?.lienFee}</Text>
        <Text fw={"bold"} color="orange">
          GAP Fee:{" "}
        </Text>
        <Text>{rowData.GAP}</Text>
        <Text fw={"bold"} color="orange">
          Frieght Fee:{" "}
        </Text>
        <Text>{rowData?.freightFee}</Text>
        <Text fw={"bold"} color="orange">
          Dealer Processing Fee:{" "}
        </Text>
        <Text>{rowData?.dealerProcessingFee}</Text>
        <Text fw={"bold"} color="orange">
          Warranty Fee:{" "}
        </Text>
        <Text>{rowData?.warranty}</Text>
        <Text fw={"bold"} color="orange">
          Amount Finances (From Bank):{" "}
        </Text>
        <Text>{rowData?.amountFinanced}</Text>
        <Text fw={"bold"} color="orange">
          Dealer Center Fee:{" "}
        </Text>
        <Text>{rowData?.dealerCenterFee}</Text>
        <Text fw={"bold"} color="orange">
          Vehicle Price:{" "}
        </Text>
        <Text>{rowData?.vehicle?.price}</Text>
        <Text fw={"bold"} color="orange">
          Customer:{" "}
        </Text>
        <Text>
          {rowData?.customer?.firstName + " " + rowData?.customer?.lastName}
        </Text>
        <Text fw={"bold"} color="orange">
          Order Status:{" "}
        </Text>
        <Badge w={"100px"}>{rowData?.status}</Badge>
        <Text fw={"bold"} color="orange">
          Total Price:{" "}
        </Text>
        <Text>{rowData?.total}</Text>
        <Text fw={"bold"} color="orange">
          Down Payment:{" "}
        </Text>
        <Text>{rowData?.downPayment}</Text>
        <Text fw={"bold"} color="orange">
          Remianing Amount:{" "}
        </Text>
        <Text>{rowData?.total - rowData?.downPayment}</Text>
      </SimpleGrid>
    </Flex>
  );
};
export default ViewEmployee;
