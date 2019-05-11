import useTransactions from "../hooks/useTransactions";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button
} from "@material-ui/core";

const TransactionTable = () => {
  const [transactions] = useTransactions();
  console.log(transactions);
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Number of items</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Amount Payed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map(transact => (
            <Transaction transaction={transact} key={transact._id} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const Transaction = ({ transaction }) => {
  const { customer, cartItems, payment } = transaction;
  return (
    <TableRow>
      <TableCell>
        {(customer?.firstName || "None") +
          " " +
          (customer?.lastName || "Given")}
      </TableCell>
      <TableCell>{customer?.phone || "None"}</TableCell>
      <TableCell>
        {cartItems.reduce((acc, curr) => curr.quantity + acc, 0)}
      </TableCell>
      <TableCell>{"output total here"}</TableCell>
      <TableCell>{payment.amountPayed}</TableCell>
    </TableRow>
  );
};

export default TransactionTable;
