// src/components/PlayerInputModal.js
import React from 'react';
import './modal.css'; // Import CSS cho modal

const PlayerInputModal = ({ isOpen, onClose, onSubmit, players, setPlayers }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Nhập Tên Người Chơi</h2>
                {players.map((player, index) => (
                    <div key={index}>
                        <label>{`Người Chơi ${index + 1}`}</label>
                        <input
                            type="text"
                            value={player}
                            onChange={(e) => {
                                const updatedPlayers = [...players];
                                updatedPlayers[index] = e.target.value;
                                setPlayers(updatedPlayers);
                            }}
                            placeholder={`Tên người chơi ${index + 1}`}
                        />
                    </div>
                ))}
                <button onClick={onSubmit}>Tạo Phiên</button>
                <button onClick={onClose}>Đóng</button>
            </div>
        </div>
    );
};

export default PlayerInputModal;
