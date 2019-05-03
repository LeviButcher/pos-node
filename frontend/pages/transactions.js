import withLayout from "../components/Layout";
import TransactionTable from "../components/TransactionTable";

const Transaction = () => {
  return (
    <div>
      <header>
        <h1>Transactions</h1>
      </header>
      <TransactionTable />
    </div>
  );
};

export default withLayout(Transaction);
