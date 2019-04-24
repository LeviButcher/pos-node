import styled from "styled-components";

const CustomerBox = styled.div`
  background: #888;
  display: grid;
  padding: calc(${props => props.theme.padding} / 2)
    ${props => props.theme.padding};
`;

const CustomerDetails = () => {
  return (
    <CustomerBox>
      <h3>levi butcher</h3>
      <h4>1-111-111-1111</h4>
    </CustomerBox>
  );
};

export default CustomerDetails;
