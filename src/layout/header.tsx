import { Link } from "react-router-dom";
import { GetUserName } from "../utils/auth.ts";

const userName = GetUserName();

export function Header() {
    return (
        <>
            <header>
                <Link to={'/'}>
                    Header
                </Link>
                <Link to={'/register'}>
                    Login/Register
                </Link>
                {userName && <span>Welcome {userName}</span>}
            </header>
        </>
    )
}