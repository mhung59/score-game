import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { database } from '../firebase';
import { ref, onValue, set } from 'firebase/database';
import ScoreInputModal from '../components/ScoreInputModal';
import './ScoreBoard.css';

const ScoreBoard = () => {
    const { sessionId } = useParams();
    const navigate = useNavigate();
    const [players, setPlayers] = useState([]);
    const [scores, setScores] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingScoreRow, setEditingScoreRow] = useState(null);
    const [newScore, setNewScore] = useState([]);

    useEffect(() => {
        const sessionRef = ref(database, `sessions/${sessionId}`);
        onValue(sessionRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setPlayers(data.players || []);
                setScores(Object.keys(data.scores).map(key => ({
                    id: key,
                    value: data.scores[key]
                })));
            }
        });
    }, [sessionId]);

    console.log(scores);

    const addScoreRow = (newScore) => {
        ref(database, `sessions/${sessionId}/scores`);
        const newScoreEntry = {};
        players.forEach((player, index) => {
            newScoreEntry[player] = parseInt(newScore[index]) || 0;
        });
        const newScoreKey = Date.now().toString();
        set(ref(database, `sessions/${sessionId}/scores/${newScoreKey}`), newScoreEntry);
    };

    const updateScoreRow = (updatedScore, id) => {
        ref(database, `sessions/${sessionId}/scores`);
        const updatedScoreEntry = {};

        players.forEach((player, i) => {
            updatedScoreEntry[player] = parseInt(updatedScore[i]) || 0; // Cập nhật điểm cho từng người chơi
        });

        // Cập nhật giá trị tại đường dẫn cụ thể
        set(ref(database, `sessions/${sessionId}/scores/${id}`), updatedScoreEntry)
            .then(() => {
                console.log("Điểm đã được cập nhật thành công!");
            })
            .catch((error) => {
                console.error("Lỗi cập nhật điểm:", error);
            });
    };

    const openEditScoreModal = (scoreRow, index) => {
        setNewScore(players.map(player => scoreRow[player] || '')); // Thiết lập điểm cho modal khi chỉnh sửa
        setEditingScoreRow(index); // Ghi lại chỉ số của record đang chỉnh sửa
        setModalOpen(true); // Mở modal
    };

    const calculateTotalScores = () => {
        const totals = {};
        scores.forEach(scoreRow => {
            players.forEach(player => {
                if (!totals[player]) totals[player] = 0;
                totals[player] += scoreRow.value[player] || 0;
            });
        });
        return totals;
    };

    const totalScores = calculateTotalScores();

    return (
        <div className="session-list">
            <h1 style={{textAlign: "center"}}>Bảng Điểm</h1>
            <div style={{textAlign: "center"}}>
                <span style={{fontWeight: "bold", background: "red", padding: "10px", marginBottom: "50px", color: "white", borderRadius: "50%"}}>{scores.length}</span>
            </div>
            <br/>
            {players.length === 0 ? (
                <p>Chưa có người chơi.</p>
            ) : (
                <>
                    <div className="table-container"> {/* Thêm div chứa bảng */}
                        <table>
                            <thead>
                            <tr>
                                {players.map((player) => (
                                    <th key={player}>{player}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {scores.length === 0 ? (
                                <tr>
                                    <td colSpan={players.length}>Chưa có điểm số.</td>
                                </tr>
                            ) : (
                                scores.map((scoreRow, index) => (
                                    <tr key={index} onClick={() => openEditScoreModal(scoreRow.value, scoreRow.id)}>
                                        {players.map((player) => (
                                            <td key={player}>{scoreRow.value[player] || 0}</td>
                                        ))}
                                    </tr>
                                ))
                            )}
                            <tr className="total-row">
                                {players.map((player) => (
                                    <td key={player}><strong>{totalScores[player] || 0}</strong></td>
                                ))}
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <button className={"back-button"} onClick={() => navigate("/")}>Trở về</button>
                        <button className={"add-score-button"} onClick={() => {
                            setModalOpen(true);
                            setNewScore(Array(players.length).fill('')); // Đặt lại điểm nếu không chỉnh sửa
                        }}>Thêm Điểm
                        </button>
                    </div>

                    <ScoreInputModal
                    isOpen={isModalOpen}
                    onClose={() => {
                    setModalOpen(false);
                    setEditingScoreRow(null); // Reset editing state
                }}
                onAddScore={addScoreRow}
                onUpdateScore={updateScoreRow}
                players={players}
                        editingScoreRow={editingScoreRow}
                        newScore={newScore}
                        setNewScore={setNewScore}
                    />
                </>
            )}
        </div>
    );
};

export default ScoreBoard;
