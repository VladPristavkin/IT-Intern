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

        db.update('waysOfLearning', updatedWay);
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
            <h2>Способы обучения</h2>
            
            <div className="add-form">
                <input
                    type="text"
                    placeholder="Название"
                    value={newWay}
                    onChange={(e) => setNewWay(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddWay()}
                />
                <button onClick={handleAddWay}>Добавить</button>
            </div>

            <div className="items-list">
                {ways.map(way => (
                    <div key={way.id} className="item">
                        {editingId === way.id ? (
                            <div className="edit-form">
                                <input
                                    type="text"
                                    value={editingName}
                                    onChange={(e) => setEditingName(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleUpdateWay(way.id)}
                                    autoFocus
                                />
                                <div className="actions">
                                    <button onClick={() => handleUpdateWay(way.id)}>✓</button>
                                    <button onClick={() => setEditingId(null)}>✕</button>
                                </div>
                            </div>
                        ) : (
                            <div className="item-content">
                                <span>{way.name}</span>
                                <div className="actions">
                                    <button onClick={() => startEditing(way)}>✎</button>
                                    <button onClick={() => handleDeleteWay(way.id)}>✕</button>
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