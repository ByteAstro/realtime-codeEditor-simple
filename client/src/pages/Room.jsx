import Editor from '@monaco-editor/react';
import { useState } from 'react';

const Room = () => {
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

    function copyToClipboard() {

    }

    return (
        <div className="flex flex-col gap-2.5 min-h-screen pt-2.5 pb-5 px-2.5">
            <div className="flex flex-col gap-2.5">
                <div className="flex flex-col items-center gap-1">

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

                    <p>Connected Users:</p>
                    <div className="##roomSidebarUsers">

                    </div>

                    <button onClick={copyToClipboard}
                        className='font-bold text-white bg-orange-500 border cursor-pointer transition-all duration-75 ease-in-out delay-100 px-4 py-2 rounded-[5px] border-solid border-[#ffdd00] hover:text-black outline-none'
                    >Copy Room ID</button>

                    <button
                        className='font-bold text-white bg-orange-500 border cursor-pointer transition-all duration-75 ease-in-out delay-100 px-4 py-2 rounded-[5px] border-solid border-[#ffdd00] hover:text-black outline-none'
                    >Leave</button>
                </div>
            </div>

            <Editor
                height={"90vh"}

                theme={editorTheme}
                language={editorLanguage}
                defaultValue="// WWrite your code here"
            />

        </div>
    )
}

export default Room