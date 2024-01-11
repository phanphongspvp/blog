import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import Login from "./Login";

function Home() {

    const { userId, userEmail, setUserId, setUserEmail } = useContext(AuthContext);

    if(!userId && !userEmail) {
        return <Login />
    }

    const handleLogout = async () => {
        document.cookie = "token=";
        setUserId("");
        setUserEmail("");
    }

    return ( 
        <div>
            <div>Xin chào: {userEmail}</div>
            <button onClick={handleLogout}>Đăng xuất</button>
        </div>
    );

}

export default Home;