import AdminOrders from "../features/admin/components/AdminOrders";
import NavBar from "../features/navbar/components/NavBar";

export default function AdminOrdersPage() {
  return (
    <div>
      <NavBar>
        <AdminOrders></AdminOrders>
      </NavBar>
    </div>
  );
}
