import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setUserId, setUserEmail } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        const status = await axios.post("/login", {email, password});        
        
        if(status.data.userId && status.data.email) {
            setUserId(status.data.userId);
            setUserEmail(status.data.email);
            navigate("/")
        }else {
            alert("Tài khoản hoặc mật khẩu không chính xác!");
        }
    }

    return ( 
        <div className="w-full h-screen bg-slate-400 flex items-center justify-center flex-col">
            <form className="flex flex-col w-56 -mt-4" onSubmit={handleLogin}>
                <h1 className="text-center text-xl mb-4 uppercase text-white">Đăng nhập</h1>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="px-2 py-1 my-2 rounded-md outline-none" required />
                <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} className="px-2 py-1 my-2 rounded-md outline-none" required />
                <button type="submit" className="px-2 py-1 my-2 bg-slate-500 rounded-md text-white">Đăng nhập</button>
            </form>
            <div className="text-white">
                Bạn chưa có tài khoản?
                <Link className="ml-1 underline" to={"/register"}>Đăng ký</Link>
            </div>
        </div>    
    );
}

export default Login;