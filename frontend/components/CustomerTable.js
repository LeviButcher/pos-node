import useCustomers from "../hooks/useCustomers";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button
} from "@material-ui/core";

const CustomerTable = () => {
  const [customers] = useCustomers();
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>City</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Zip</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map(cust => (
            <Customer customer={cust} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const Customer = ({ customer }) => {
  const { address } = customer;
  return (
    <TableRow>
      <TableCell>{customer.firstName + " " + customer.lastName}</TableCell>
      <TableCell>{customer.phone}</TableCell>
      <TableCell>{address.streetAddress}</TableCell>
      <TableCell>{address.city}</TableCell>
      <TableCell>{address.state}</TableCell>
      <TableCell>{address.zip}</TableCell>
    </TableRow>
  );
};

export default CustomerTable;
