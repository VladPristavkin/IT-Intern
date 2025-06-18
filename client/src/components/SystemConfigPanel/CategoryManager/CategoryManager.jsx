import React, { useState, useEffect } from 'react';
import './CategoryManager.css';
import db from '../../../utils/localDb';

const CategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState('');

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () => {
        const categoriesData = db.getAll('categories');
        setCategories(categoriesData);
    };

    const handleAddCategory = () => {
        if (!newCategory.trim()) return;
        
        const category = {
            name: newCategory.trim(),
            createdAt: new Date().toISOString()
        };

        db.insert('categories', category);
        setNewCategory('');
        loadCategories();
    };

    const handleUpdateCategory = (id) => {
        if (!editingName.trim()) return;
        
        const category = categories.find(c => c.id === id);
        if (!category) return;

        const updatedCategory = {
            ...category,
            name: editingName.trim()
        };

        db.update('categories', id, updatedCategory);
        setEditingId(null);
        setEditingName('');
        loadCategories();
    };

    const handleDeleteCategory = (id) => {
        db.delete('categories', id);
        loadCategories();
    };

    const startEditing = (category) => {
        setEditingId(category.id);
        setEditingName(category.name);
    };

    return (
        <div className="category-manager">
            <h2 className="category-manager-title">Категории</h2>
            
            <div className="category-add-form">
                <input
                    type="text"
                    className="category-add-input"
                    placeholder="Название категории"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                />
                <button className="category-add-button" onClick={handleAddCategory}>Добавить</button>
            </div>

            <div className="category-items-list">
                {categories.map(category => (
                    <div key={category.id} className="category-item">
                        {editingId === category.id ? (
                            <div className="category-edit-form">
                                <input
                                    type="text"
                                    className="category-edit-input"
                                    value={editingName}
                                    onChange={(e) => setEditingName(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleUpdateCategory(category.id)}
                                    autoFocus
                                />
                                <div className="category-actions">
                                    <button className="category-action-button" onClick={() => handleUpdateCategory(category.id)}>✓</button>
                                    <button className="category-action-button" onClick={() => setEditingId(null)}>✕</button>
                                </div>
                            </div>
                        ) : (
                            <div className="category-item-content">
                                <span className="category-item-text">{category.name}</span>
                                <div className="category-actions">
                                    <button className="category-action-button" onClick={() => startEditing(category)}>✎</button>
                                    <button className="category-action-button" onClick={() => handleDeleteCategory(category.id)}>✕</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryManager; 