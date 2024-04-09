import NavBar from "../features/navbar/components/NavBar";
import UserOrders from "../../src/features/user/components/userOrders";

function UserOrdersPage() {
  return (
    <div>
      <NavBar>
        <h1 className="mx-auto text-2xl">My Orders</h1>
        <UserOrders></UserOrders>
      </NavBar>
    </div>
  );
}

export default UserOrdersPage;
