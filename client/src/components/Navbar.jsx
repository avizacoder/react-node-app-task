import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-zinc-700 mb-3 flex justify-between py-5 px-10">
      <Link to={"/"}>
        <h2 className="text-2xl font-bold"> My Tasks</h2>
      </Link>
      <ul className="flex gap-x-5">
        {isAuthenticated ? (
          <>
            <li>
              <Link className="bg-sky-500 hover:bg-sky-700 px-2 py-2 rounded-md" to={"/add-tasks"}>Add Task</Link>
            </li>
            <li>
              <Link className="bg-sky-500 hover:bg-sky-700 px-2 py-2 rounded-md"
                to={"/"}
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className="bg-sky-500 hover:bg-sky-700 px-2 py-2 rounded-md" to={"/signin"}>Signin</Link>
            </li>
            <li>
              <Link className="bg-sky-500 hover:bg-sky-700 px-2 py-2 rounded-md" to={"/signup"}>Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
