import React, {useEffect, useState} from 'react'


function Chat({socket, user, room}){

    const [msg, setMsg] = useState('')
    const [chat, setChat] = useState([])

    const sendMsg = async () => {
        if((msg !== '' || msg !== undefined)){
            const msgInfo = {
                room: room,
                user: user,
                msg: msg,
                time: 
                    new Date(Date.now()).getHours() 
                    + ":" + 
                    new Date(Date.now()).getMinutes(),
            };
            await socket.emit('handle_msg', msgInfo);
            setChat((chat) => [...chat, msgInfo])
        }
    };

    useEffect(() => {
        socket.on('msg_client', (msgInfo) => {
            setChat((chat) => [...chat, msgInfo])
        })
    }, [socket]);

    return (
        <div className='chat-window'>
            <div className='chat-head'>
                <p>{room}</p>
            </div>
            <div className='chat-mid'>
                {chat.map((msg, i) => {
                    return (
                    <div key = {i} className='message' id={user === msg.user ? "you" : "other"}>
                        <div>
                            <div className='message-content'>
                                <p>{msg.msg}</p>
                            </div>
                            <div className='message-meta'>
                                <p id="time">{msg.time}</p>
                                <p id="author">{msg.user}</p>
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>
            <div className='chat-foot'>
                <input 
                    type='text' 
                    placeholder = '...'
                    onChange={(e) => {
                        setMsg(e.target.value)
                    }}
                />
                <button onClick={sendMsg}>Send</button>
            </div>
        </div>
    )
}

export default Chat