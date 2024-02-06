import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLogOut } from "../../hooks/useLogOut";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Navbar() {
  const { logout } = useLogOut();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };
  return (
    <header>
      <nav className="flex justify-between">
        <div>
          <Link to="/">
            <h1 className="font-sans text-3xl font-semibold tracking-tight">
              Job Tracker
            </h1>
          </Link>
        </div>
        <div className="flex gap-2 mt-2">
          {user && (
            <>
              <span>{user.email}</span>
              <Button onClick={handleClick} variant="outline">
                Log out
              </Button>
            </>
          )}
          {!user && (
            <>
              <Link to="/signup">
                <Button variant="outline">Sign Up</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
