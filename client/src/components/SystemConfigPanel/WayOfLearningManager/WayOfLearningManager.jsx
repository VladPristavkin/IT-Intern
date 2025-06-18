import React, { useState, useEffect } from 'react';
import './WayOfLearningManager.css';
import db from '../../../utils/localDb';

const WayOfLearningManager = () => {
    const [ways, setWays] = useState([]);
    const [newWay, setNewWay] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState('');

    useEffect(() => {
        loadWays();
    }, []);

    const loadWays = () => {
        const waysData = db.getAll('waysOfLearning');
        setWays(waysData);
    };

    const handleAddWay = () => {
        if (!newWay.trim()) return;
        
        const way = {
            name: newWay.trim(),
            createdAt: new Date().toISOString()
        };

        db.insert('waysOfLearning', way);
        setNewWay('');
        loadWays();
    };

    const handleUpdateWay = (id) => {
        if (!editingName.trim()) return;
        
        const way = ways.find(w => w.id === id);
        if (!way) return;

        const updatedWay = {
            ...way,
            name: editingName.trim()
        };

        db.update('waysOfLearning', id, updatedWay);
        setEditingId(null);
        setEditingName('');
        loadWays();
    };

    const handleDeleteWay = (id) => {
        db.delete('waysOfLearning', id);
        loadWays();
    };

    const startEditing = (way) => {
        setEditingId(way.id);
        setEditingName(way.name);
    };

    return (
        <div className="way-of-learning-manager">
            <h2 className="learning-manager-title">Способы обучения</h2>
            
            <div className="learning-add-form">
                <input
                    type="text"
                    className="learning-add-input"
                    placeholder="Название"
                    value={newWay}
                    onChange={(e) => setNewWay(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddWay()}
                />
                <button className="learning-add-button" onClick={handleAddWay}>Добавить</button>
            </div>

            <div className="learning-items-list">
                {ways.map(way => (
                    <div key={way.id} className="learning-item">
                        {editingId === way.id ? (
                            <div className="learning-edit-form">
                                <input
                                    type="text"
                                    className="learning-edit-input"
                                    value={editingName}
                                    onChange={(e) => setEditingName(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleUpdateWay(way.id)}
                                    autoFocus
                                />
                                <div className="learning-actions">
                                    <button className="learning-action-button" onClick={() => handleUpdateWay(way.id)}>✓</button>
                                    <button className="learning-action-button" onClick={() => setEditingId(null)}>✕</button>
                                </div>
                            </div>
                        ) : (
                            <div className="learning-item-content">
                                <span className="learning-item-text">{way.name}</span>
                                <div className="learning-actions">
                                    <button className="learning-action-button" onClick={() => startEditing(way)}>✎</button>
                                    <button className="learning-action-button" onClick={() => handleDeleteWay(way.id)}>✕</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WayOfLearningManager; 