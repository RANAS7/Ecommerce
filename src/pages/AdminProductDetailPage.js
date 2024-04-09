import AdminProductDetail from "../features/admin/components/AdminProductDetails";
import NavBar from "../features/navbar/components/NavBar";
import FooterBar from "./FooterBar";
function AdminProductDetailPage() {
  return (
    <div>
      <NavBar>
        <AdminProductDetail />
        <FooterBar />
      </NavBar>
    </div>
  );
}

export default AdminProductDetailPage;
