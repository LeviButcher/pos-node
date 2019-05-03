import withLayout from "../components/Layout";
import CustomerTable from "../components/CustomerTable";

const Customers = () => {
  return (
    <section>
      <header>
        <h1>Customers</h1>
      </header>
      <CustomerTable />
    </section>
  );
};

export default withLayout(Customers);
