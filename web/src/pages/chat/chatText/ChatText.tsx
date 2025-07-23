import React, {useEffect, useRef, useState} from "react";
import "./type.d.ts"
import Quill, {QuillOptions} from 'quill';
import "quill/dist/quill.snow.css";
import "./style.less"

const ChatText: React.FC = () => {
    const initialized = useRef(false);
    const quill: React.RefObject<Quill | null> = useRef(null);
    const [showEmbedDialog, setShowEmbedDialog] = useState(false)
    const options: QuillOptions = {
            // debug: 'info',
            modules: {
                toolbar: {
                    container: '#quill-edit-toolbar',
                    handlers: {
                        /** 嵌入 */
                        emoji: () => {
                            setShowEmbedDialog(true);
                        },
                    },
                },
            },
            theme: 'snow'
        }
    ;

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;
        quill.current = new Quill('#editor', options);
    }, [])

    return (
        <>
            <div id="editor-container" className="chat-text">
                <div id="quill-edit-toolbar">
                    <div
                        className="ql-btn ql-emoji"
                        onClick={() =>
                            (quill.current?.getModule('toolbar') as QuillToolbarModule).handler('emoji')
                        }
                    ></div>
                </div>
                <div id="editor"></div>
            </div>
            {showEmbedDialog &&
                <div>
                    表情
                </div>
            }
        </>
    )
}

export default ChatText;