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

        db.update('categories', updatedCategory);
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
            <h2>Категории</h2>
            
            <div className="add-form">
                <input
                    type="text"
                    placeholder="Название категории"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                />
                <button onClick={handleAddCategory}>Добавить</button>
            </div>

            <div className="items-list">
                {categories.map(category => (
                    <div key={category.id} className="item">
                        {editingId === category.id ? (
                            <div className="edit-form">
                                <input
                                    type="text"
                                    value={editingName}
                                    onChange={(e) => setEditingName(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleUpdateCategory(category.id)}
                                    autoFocus
                                />
                                <div className="actions">
                                    <button onClick={() => handleUpdateCategory(category.id)}>✓</button>
                                    <button onClick={() => setEditingId(null)}>✕</button>
                                </div>
                            </div>
                        ) : (
                            <div className="item-content">
                                <span>{category.name}</span>
                                <div className="actions">
                                    <button onClick={() => startEditing(category)}>✎</button>
                                    <button onClick={() => handleDeleteCategory(category.id)}>✕</button>
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