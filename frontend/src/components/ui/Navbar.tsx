//@ts-nocheck

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLogOut } from "../../hooks/useLogOut";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Badge } from "@/components/ui/badge"

export default function Navbar() {
  const { logout } = useLogOut();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };
  return (
    <header>
      <nav className="flex justify-between items-center">
        <div>
          <Link to="/">
            <h1 className="font-sans text-3xl font-semibold tracking-tight">
              Job Tracker
            </h1>
          </Link>
        </div>
        <div className="flex gap-2 mt-2 items-center">
          {user && (
            <>
              <Badge className="font-sans text-md font-light select-none">{user.email}</Badge>
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
