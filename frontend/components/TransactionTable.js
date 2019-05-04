import Table from "../styled/Table";
import useTransactions from "../hooks/useTransactions";

const TransactionTable = () => {
  const [transactions] = useTransactions();
  console.log(transactions);
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Number of items</th>
            <th>Total</th>
            <th>Amount Payed</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transact => (
            <Transaction transaction={transact} key={transact._id} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const Transaction = ({ transaction }) => {
  const { customer, cartItems, payment } = transaction;
  return (
    <tr>
      <td>
        {(customer?.firstName || "None") +
          " " +
          (customer?.lastName || "Given")}
      </td>
      <td>{customer?.phone || "None"}</td>
      <td>{cartItems.reduce((acc, curr) => curr.quantity + acc, 0)}</td>
      <td>{"output total here"}</td>
      <td>{payment.amountPayed}</td>
    </tr>
  );
};

export default TransactionTable;
