import Editor from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Avatar from 'react-avatar';
import { initSocket } from './initSocket';
import SOCKET_ACTIONS from './SocketActions';
import ChatPage from './chat/ChatPage';

const Room = () => {
    const { roomId } = useParams();
    // Editor dynamic properties -------------------------------------
    const socketRef = useRef(null);
    const reactNavigate = useNavigate();
    const location = useLocation();
    const languagesAvailable = [
        'javaScript', 'typeScript',
        'cpp', 'java',
        'python', 'php',
        'html', 'css',
    ]
    const editorThemes = [
        'vs-dark', 'light'
    ]
    const [editorLanguage, setEditorLanguage] = useState('javaScript');
    const [editorTheme, setEditorTheme] = useState('vs-dark');

    function handleLanguageChange(e) {
        setEditorLanguage(e.target.value);
    }
    function handleThemeChange(e) {
        setEditorTheme(e.target.value);
    }

    // Users connected in the room -----------------------------------
    const [connectedUsers, setConnectedUsers] = useState([]);

    // copy to clipboard functioality ------------------------
    function copyToClipboard() {
        try {
            navigator.clipboard.writeText(roomId);
            toast.success('Room ID copied to clipboard');
        } catch (err) {
            console.log(err);
            toast.error()
        }
    }

    const handleLeave = () => {
        !socketRef.current.connected && reactNavigate('/', { replace: true, state: {} })
        socketRef.current.disconnect()
    }


    useEffect(() => {
        // console.log('UseEffect called ----------------------------');
        const handleErrors = (err) => {
            console.log('Socket error: ', err);
            toast.error('Socket connection failed, try again later');
            reactNavigate('/');
        }
        const initScoketClient = async () => {
            socketRef.current = await initSocket();
            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));

            console.log('Socket Connection Done')
            socketRef.current.emit(SOCKET_ACTIONS.JOIN, {
                roomId,
                username: location.state?.username,
            });

            //  Listeinging for joined event
            socketRef.current.on(SOCKET_ACTIONS.CLIENTLIST_UPDATE, ({ userList }) => {
                setConnectedUsers(userList);
            })
            socketRef.current.on(SOCKET_ACTIONS.JOINED, ({ username }) => {
                if (username !== location.state?.username) {
                    toast.success(`${username} joined the room`);
                }
            });

            socketRef.current.on(SOCKET_ACTIONS.DISCONNECTED, ({ socketId, username }) => {
                toast.success(`${username} left the room.`);
                setConnectedUsers((prev) => {
                    return prev.filter(connectedUser => connectedUser.socketId !== socketId)
                })
            });

        }
        initScoketClient();
        return () => {
            socketRef.current.off(SOCKET_ACTIONS.JOINED);
            socketRef.current.off(SOCKET_ACTIONS.CLIENTLIST_UPDATE);
            socketRef.current.off(SOCKET_ACTIONS.DISCONNECTED);
            socketRef.current.disconnect();
        }
    }, [location.state?.username, reactNavigate, roomId]);

    return (
        <div className="flex flex-col h-screen gap-2.5 min-h-screen pt-2.5 pb-5 px-2.5">

            {/* Tollbar -------------------------------------------------- */}
            <div className="flex flex-row  justify-center gap-2.5">
                <div className="flex flex-row items-center gap-1">

                    <div className='bg-[#f0f0f0] px-1.5 py-0.5 rounded-[5px]'>
                        <select className='bg-[#f0f0f0] capitalize px-2.5 py-1.5 border-[none]'
                            name="language" id="language"
                            onChange={handleLanguageChange}
                        >
                            {
                                languagesAvailable.map((eachLanguage) => (
                                    <option key={eachLanguage}
                                        value={eachLanguage}>
                                        {eachLanguage}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='bg-[#f0f0f0] px-1.5 py-0.5 rounded-[5px]'>
                        <select className='bg-[#f0f0f0] capitalize px-2.5 py-1.5 border-[none]'
                            name="language" id="language"
                            onChange={handleThemeChange}
                        >
                            {editorThemes.map((eachTheme) => (
                                <option key={eachTheme}
                                    value={eachTheme}>
                                    {eachTheme}
                                </option>
                            ))}
                        </select>
                    </div>


                    <button onClick={copyToClipboard}
                        className='font-bold text-white bg-orange-500 border cursor-pointer transition-all duration-75 ease-in-out delay-100 px-4 py-2 rounded-[5px] border-solid border-[#ffdd00] hover:text-black outline-none'
                    >Copy Room ID</button>

                    <button
                        className='font-bold text-white bg-orange-500 border cursor-pointer transition-all duration-75 ease-in-out delay-100 px-4 py-2 rounded-[5px] border-solid border-[#ffdd00] hover:text-black outline-none'
                        onClick={handleLeave}
                    >Leave</button>

                </div>

            </div>

            {/* Connected Users ------------------------------------- */}
            <p>Connected Users:</p>
            <div className="flex gap-2">
                {connectedUsers.map((eachUser) => (
                    <div key={eachUser}
                        className='cursor-context-menu'
                    ><Avatar name={eachUser} size={40} round="10px" />
                    </div>
                ))}
            </div>

            {/* Editor ---------------------------------------------- */}
            {/* <Editor
                height={"90vh"}
                className='bg-slate-900 p-2'
                theme={editorTheme}
                language={editorLanguage}
                defaultValue="// WWrite your code here"
            /> */}

            {/* Group chat ----------------------------------------- */}
            <ChatPage />

        </div>
    )
}

export default Room