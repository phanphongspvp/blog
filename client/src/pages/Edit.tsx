import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Edit() {

    const localtion = useLocation();

    const id = localtion.pathname.split("/")[2];

    const navigate = useNavigate();
    
    const [avatar, setAvatar] = useState("");
    const [description, setDescription] = useState("");
    const [birth, setBirth] = useState("");

    useEffect(() => {
        axios.get("/userById/" + id).then(res => {
            setAvatar(res.data.avatar || "");
            setDescription(res.data.describeYourself || "");
            setBirth(res.data.dateOfBirth || "");
        })
    }, []);

    const handleEdit = () => {
        axios.put("/editUser", {id, avatar, description, birth});
        navigate("/");
    }

    return ( 
        <div className="w-full h-screen bg-slate-300 p-12 flex flex-col items-center pt-40">
            <h1 className="text-2xl mb-4">Sửa thông tin</h1>
            <form className="flex flex-col gap-4" onSubmit={handleEdit}>
                <input type="text" className="px-2 py-1 w-60 rounded-md outline-none" placeholder="Avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
                <input type="text" className="px-2 py-1 w-60 rounded-md outline-none" placeholder="Mô tả" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="date" className="px-2 py-1 w-60 rounded-md outline-none" placeholder="Ngày sinh" value={birth} onChange={(e) => setBirth(e.target.value)} />
                <button type="submit" className="px-2 py-1 w-60 rounded-md bg-blue-600 text-white">Lưu</button>
            </form>
        </div>
    );
}

export default Edit;