import { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4, validate } from 'uuid';
import { useNavigate } from 'react-router-dom'

const JoinRoom = () => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState("");
    const [username, setUsername] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (!roomId || !username) {
            return toast.error("Please provide valid inputs!");
        }
        if (!validate(roomId)) {
            return toast.error("Incorrect room id");
        }
        username && navigate(`/room/${roomId}`, {
            state: { username }
        })
    }
    function createRoomId() {
        try {
            setRoomId(uuidv4());
            toast.success("Room id created");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="bg-blue-300 min-h-screen w-full flex justify-center">
            <form className="bg-orange-400 flex flex-col justify-center items-start gap-4 shadow-2xl shadow-cyan-500 rounded-lg px-7 py-4 m-48"
                onSubmit={handleSubmit}
            >
                <p className="text-xl border-b-2 border-black">Paste your invitation code</p>

                <div className="joinBoxInputWrapper">
                    <input type="text"
                        className="outline-none p-2 rounded-md"
                        id="roomIdInput"
                        placeholder="Enter Room ID"
                        value={roomId}
                        onChange={e => setRoomId(e.target.value)}
                    />
                    <label htmlFor="roomIdInput"
                        className="##joinBoxWarning"
                    ></label>
                </div>

                <div className="joinBoxInputWrapper">
                    <input type="text"
                        className="outline-none p-2 rounded-md"
                        id="usernameInput"
                        placeholder="Enter Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <label htmlFor="usernameInput"
                        className="##joinBoxWarning"
                    ></label>
                </div>

                <button type="submit"
                    className="bg-orange-700 text-white w-full px-5 py-4 rounded-lg transition-all hover:bg-slate-500"
                >Join</button>

                <p>
                    {"Don't"} hacve an invite code <br />
                    Create a&nbsp;
                    <span className="text-blue-900 underline cursor-pointer hover:text-red-800"
                        onClick={createRoomId}>new room</span>
                </p>
            </form>
        </div>
    )
}

export default JoinRoom