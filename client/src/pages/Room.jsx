import Editor from '@monaco-editor/react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import Avatar from 'react-avatar';

const Room = () => {
    const { roomId } = useParams();
    // Editor dynamic properties -------------------------------------
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

    return (
        <div className="flex flex-col gap-2.5 min-h-screen pt-2.5 pb-5 px-2.5">

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
            <Editor
                height={"90vh"}
                className='bg-slate-900 p-2'
                theme={editorTheme}
                language={editorLanguage}
                defaultValue="// WWrite your code here"
            />

        </div>
    )
}

export default Room