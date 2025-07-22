import React from "react";
import {useState,useEffect} from "react";
import "./style.less"

const HistorySession:React.FC = () => {
    const [historySessions, setHistorySessions] = useState([]);
    useEffect(() => {
        // fetch history sessions from server
        setHistorySessions( [
            {id: 1, title: "Session 1", description: "This is the first session"},
            {id: 2, title: "Session 2", description: "This is the first session"},
            {id: 3, title: "Session 3", description: "This is the first session"},
            {id: 4, title: "Session 4", description: "This is the first session"},
            {id: 5, title: "Session 5", description: "This is the first session"},
            {id: 6, title: "Session 6", description: "This is the first session"},
            {id: 7, title: "Session 7", description: "This is the first session"},
            {id: 8, title: "Session 8", description: "This is the first session"},
            {id: 9, title: "Session 9", description: "This is the first session"},
            {id: 10, title: "Session 10", description: "This is the first session"},
            {id: 11, title: "Session 11", description: "This is the first session"},
            {id: 12, title: "Session 12", description: "This is the first session"},
            {id: 13, title: "Session 13", description: "This is the first session"},
            {id: 14, title: "Session 14", description: "This is the first session"},
        ])
    }, []);
    return (
        <div className="history">
            {historySessions.map((session) => (
                <div key={session.id} className="session">
                    <h2 className="title">{session.title}</h2>
                    <p className="description">{session.description}</p>
                </div>
            ))}
        </div>
    );
}

export default HistorySession;