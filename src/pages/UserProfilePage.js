import NavBar from "../features/navbar/components/NavBar";
import UserProfile from "../features/user/components/userProfile";

function UserProfilePage() {
  return (
    <div>
      <NavBar>
        <UserProfile />
      </NavBar>
    </div>
  );
}

export default UserProfilePage;
