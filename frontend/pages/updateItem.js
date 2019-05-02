import Router, { withRouter } from "next/router";
import withLayout from "../components/Layout";
import ItemForm from "../components/ItemForm";
import useItem from "../hooks/useItem";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const UpdateItem = withRouter(({ router }) => {
  //prefetch to get item data from ID
  const item = useItem(router.query.id);
  //pass into ItemForm
  return (
    <div>
      <ItemForm onSubmit={updateItemRequest} data={item} />
    </div>
  );
});

async function updateItemRequest(item) {
  const res = await fetch(`${publicRuntimeConfig.BACKEND}items/${item._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(item)
  });
  if (res.status === 200) {
    //if 201, navigate to /items
    alert(`ITEM UPDATED: ${item.sku}`);
    Router.push("/items");
  } else {
    //catch errors here!
  }
}

export default withLayout(UpdateItem);
