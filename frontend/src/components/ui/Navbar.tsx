import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header>
      <nav className="flex justify-between">
        <div>
       
          <h1 className="font-sans text-3xl font-semibold tracking-tight">Job Tracker</h1>

        </div>
        <div className="flex gap-2 mt-2">
          <Button variant="outline">
              Home
          </Button>
          <Button variant="outline">
              Account
          </Button>
        </div>
      </nav>
    </header>
  );
}
