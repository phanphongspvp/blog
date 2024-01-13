import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import Login from "./Login";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
    const { userId, userEmail, setUserId, setUserEmail } = useContext(AuthContext);
    
    const [userData, setUserData] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        if(userId) {
            axios.get("/userById/" + userId).then(res => {
                setUserData(res.data);    
            })
        }
    }, [userId])

    if (!userId && !userEmail) {
        return <Login />;
    }

    const handleEdit = () => {
        navigate("/edit/" + userId)
    }

    const handleLogout = async () => {
        document.cookie = "token=";
        setUserId("");
        setUserEmail("");
    };

    return (
        <div className="w-full h-screen bg-slate-300 p-12 flex flex-col">
            <div className="flex justify-between">
                <div className="text-gray-500 font-bold">Xin chào: {userEmail}</div>
                <button className="bg-gray-400 text-white px-2 py-1 rounded-md text-sm" onClick={handleLogout}>
                    Đăng xuất
                </button>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center my-6">
                    <h1 className="text-2xl">Thông tin người dùng</h1>
                    <button className="bg-blue-400 text-white px-2 py-1 rounded-md text-sm" onClick={handleEdit}>
                        Sửa thông tin
                    </button>
                </div>
                <div className="mb-4">
                    Avatar: {userData?.avatar?.length > 0 ? userData.avatar : "Chưa có"}
                </div>
                <div className="mb-4">
                    Mô tả: {userData?.describeYourself?.length > 0 ? userData.describeYourself : "Chưa có"}
                </div>
                <div className="mb-4">
                    Ngày sinh: {userData?.dateOfBirth?.length > 0 ? userData.dateOfBirth : "Chưa có"}
                </div>
            </div>
        </div>
    );
}

export default Home;