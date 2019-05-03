import Table from "../styled/Table";
import useCustomers from "../hooks/useCustomers";

const CustomerTable = () => {
  const [customers] = useCustomers();
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(cust => (
            <Customer customer={cust} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const Customer = ({ customer }) => {
  const { address } = customer;
  return (
    <tr>
      <td>{customer.firstName + " " + customer.lastName}</td>
      <td>{customer.phone}</td>
      <td>{address.streetAddress}</td>
      <td>{address.city}</td>
      <td>{address.state}</td>
      <td>{address.zip}</td>
    </tr>
  );
};

export default CustomerTable;
