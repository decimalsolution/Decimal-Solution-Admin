import { Container, Text } from "@mantine/core";
import { useStyles } from "./styles";

const Card = ({data}) => {
  const { classes } = useStyles();
  return (
    <Container className={classes.card}>
      <Text fz="1.3rem" fw={"bold"} align="center">
        {data?.label}
      </Text>
      <Text fz="30px" fw={"bold"}>
        {data?.value}
      </Text>
    </Container>
  );
};
export default Card;