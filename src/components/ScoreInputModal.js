import React, { useEffect } from 'react';
import './modal.css';

const ScoreInputModal = ({ isOpen, onClose, onAddScore, onUpdateScore, players, editingScoreRow, newScore, setNewScore }) => {
    const handleSubmit = () => {
        if (editingScoreRow !== null) {
            onUpdateScore(newScore, editingScoreRow); // Gọi hàm cập nhật
        } else {
            onAddScore(newScore); // Gọi hàm thêm điểm
        }
        onClose();
        setNewScore(Array(players.length).fill('')); // Đặt lại giá trị điểm sau khi thêm hoặc cập nhật
    };

    // useEffect(() => {

    // }, [isOpen, editingScoreRow, players, newScore, setNewScore]);
    //
    // if (editingScoreRow !== null) {
    //     setNewScore(players.map(player => newScore[player] || '')); // Thiết lập điểm cho modal khi chỉnh sửa
    // } else {
    //
    // }

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{editingScoreRow !== null ? 'Cập nhật Điểm' : 'Nhập Điểm Mới'}</h2>
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
                <button onClick={handleSubmit}>{editingScoreRow !== null ? 'Cập nhật Điểm' : 'Thêm Điểm'}</button>
                <button onClick={onClose}>Đóng</button>
            </div>
        </div>
    );
};

export default ScoreInputModal;
