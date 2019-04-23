import styled from "styled-components";
import withLayout from "../components/Layout";

const Index = () => (
  <div>
    <Title>My First Next.js Page</Title>
  </div>
);

const Title = styled.h1`
  color: red;
`;

export default withLayout(Index);
