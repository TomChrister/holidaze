import { Link } from "react-router-dom";
import { GetUserName } from "../utils/authHelpers.ts";

const userName = GetUserName();

export function Header() {
    return (
        <>
            <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
                <Link to="/" className="text-2xl font-bold text-[#F14016]">
                    Holidaze
                </Link>

                <div className="flex items-center gap-6">
                    <Link to="/register" className="text-gray-700 hover:text-[#F14016]">
                        Login/Register
                    </Link>
                    {userName && <span className="text-gray-600">Welcome {userName}</span>}
                </div>
            </header>

        </>
    )
}