// src/components/ScoreInputModal.js
import React, { useState } from 'react';

const ScoreInputModal = ({ isOpen, onClose, onAddScore, players }) => {
    const [newScore, setNewScore] = useState(Array(players.length).fill(''));

    const handleSubmit = () => {
        onAddScore(newScore);
        onClose();
        setNewScore(Array(players.length).fill('')); // Đặt lại giá trị điểm sau khi thêm
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Nhập Điểm Mới</h2>
                {players.map((player, index) => (
                    <div key={player}>
                        <label>{player}</label>
                        <input
                            type="number"
                            value={newScore[index]}
                            onChange={(e) => {
                                const updatedScores = [...newScore];
                                updatedScores[index] = e.target.value;
                                setNewScore(updatedScores);
                            }}
                            placeholder={`Điểm của ${player}`}
                        />
                    </div>
                ))}
                <button onClick={handleSubmit}>Thêm Điểm</button>
                <button onClick={onClose}>Đóng</button>
            </div>
        </div>
    );
};

export default ScoreInputModal;
