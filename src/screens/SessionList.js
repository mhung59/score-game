// src/screens/SessionList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../firebase';
import { ref, onValue, set } from 'firebase/database';
import './SessionList.css'; // Thêm file CSS nếu cần
import PlayerInputModal from '../components/PlayerInputModal'; // Nhập component popup

const SessionList = () => {
    const navigate = useNavigate();
    const [sessions, setSessions] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [newPlayers, setNewPlayers] = useState(['', '', '', '']); // Mảng tên người chơi

    useEffect(() => {
        const sessionsRef = ref(database, 'sessions');
        onValue(sessionsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const sessionList = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setSessions(sessionList);
            }
        });
    }, []);

    const getSessionName = (players) => {
        return players.slice(0, 4).join(', ') || "Chưa có người chơi"; // Kết hợp tên của 4 người chơi
    };

    console.log(sessions)

    const createNewSession = () => {
        const newSessionId = Date.now().toString(); // Tạo ID cho session mới
        const newSessionRef = ref(database, `sessions/${newSessionId}`);

        set(newSessionRef, {
            players: newPlayers,
            scores: {}
        })
            .then(() => {
                // Điều hướng đến bảng điểm của phiên mới
                navigate(`/scoreboard/${newSessionId}`);
            })
            .catch((error) => {
                console.error("Error creating new session:", error);
            });
    };

    console.log(sessions)

    const handleModalSubmit = () => {
        createNewSession();
        setModalOpen(false);
    };

    return (
        <div className="session-list">
            <h1>Danh Sách Các Ván Chơi</h1>
            <ul>
                {sessions.map((session) => (
                    <li key={session.id}>
                        <span>{getSessionName(session.players)}</span> {/* Hiển thị tên phiên chơi dựa trên người chơi */}
                        <button onClick={() => navigate(`/scoreboard/${session.id}`)}>Xem</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => setModalOpen(true)}>Tạo Phiên Mới</button>
    {/* Hiện modal nhập tên người chơi */}
            <PlayerInputModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleModalSubmit}
                players={newPlayers}
                setPlayers={setNewPlayers}
            />
        </div>
    );
};

export default SessionList;
