import styled from "styled-components";
import Popup from "reactjs-popup";

const CustomerBox = styled.div`
  background: #888;
  padding: calc(${props => props.theme.padding} / 2)
    ${props => props.theme.padding};
  display: grid;
  grid-template-columns: auto auto;
`;

const CustomerDetails = () => {
  return (
    <CustomerBox>
      <div>
        <h3>levi butcher</h3>
        <h4>1-111-111-1111</h4>
      </div>
      <Popup trigger={<button>Add Customer</button>} modal closeOnDocumentClick>
        {close => (
          <div>
            <p>Hello there</p>
          </div>
        )}
      </Popup>
    </CustomerBox>
  );
};

export default CustomerDetails;
