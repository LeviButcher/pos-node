import styled from "styled-components";
import Popup from "reactjs-popup";
import CustomerForm from "./CustomerForm";
import { usePOSState } from "../context/POSContext";
import Button from "../styled/Button";

const CustomerBox = styled.div`
  background: #888;
  padding: calc(${props => props.theme.padding} / 2)
    ${props => props.theme.padding};
  display: grid;
  grid-template-columns: auto auto;
`;

const CustomerDetails = () => {
  const [{ customer }, dispatch] = usePOSState();

  function handleSubmission(e, customer) {
    e.preventDefault();
    dispatch({ type: "ADD-CUSTOMER", customer });
  }
  return (
    <CustomerBox>
      <div>
        <h3>{customer.firstName || "No Customer added"}</h3>
        <h4>{customer.phone || ""}</h4>
      </div>
      <Popup trigger={<Button>Add Customer</Button>} modal closeOnDocumentClick>
        {close => (
          <CustomerForm
            submitAction={(e, value) => {
              handleSubmission(e, value);
              close();
            }}
          />
        )}
      </Popup>
    </CustomerBox>
  );
};

export default CustomerDetails;
