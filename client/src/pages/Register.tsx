import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordSame, setPasswordSame] = useState("");

    const { setUserId, setUserEmail } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const handleRegister = async (e) => {
        e.preventDefault();
        if(password === passwordSame) {
            const status = await axios.post("/register", {email, password});            
            if(status.data.userId && status.data.email) {
                setUserId(status.data.userId);
                setUserEmail(status.data.email);
                navigate("/")
            }else {
                alert("Tài khoản này đã tồn tại!");
            }
        }else {
            alert("Mật khẩu chưa khớp hãy nhập lại!");
        }
    }

    return ( 
        <div className="w-full h-screen bg-slate-400 flex items-center justify-center flex-col">
            <form className="flex flex-col w-56 -mt-4" onSubmit={handleRegister}>
                <h1 className="text-center text-xl mb-4 uppercase text-white">Đăng ký</h1>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="px-2 py-1 my-2 rounded-md outline-none" required />
                <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} className="px-2 py-1 my-2 rounded-md outline-none" required />
                <input type="password" placeholder="Nhập lại mật khẩu" value={passwordSame} onChange={(e) => setPasswordSame(e.target.value)} className="px-2 py-1 my-2 rounded-md outline-none" required />
                <button type="submit" className="px-2 py-1 my-2 bg-slate-500 rounded-md text-white">Đăng ký</button>
            </form>
            <div className="text-white">
                Bạn đã có tài khoản?
                <Link className="ml-1 underline" to={"/login"}>Đăng nhập</Link>
            </div>
        </div>    
    );
}

export default Register;