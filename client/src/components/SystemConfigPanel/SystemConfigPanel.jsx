import React, { useState, useEffect } from 'react';
import './SystemConfigPanel.css';
import db from '../../utils/localDb';
import { v4 as uuidv4 } from 'uuid';

const SystemConfigPanel = () => {
    // Ways of Learning
    const [ways, setWays] = useState([]);
    const [newWay, setNewWay] = useState('');
    const [editingWay, setEditingWay] = useState(null);

    // Categories
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [editingCategoryName, setEditingCategoryName] = useState('');

    // Subcategories
    const [newSubcategory, setNewSubcategory] = useState('');
    const [editingSubcategoryId, setEditingSubcategoryId] = useState(null);
    const [editingSubcategoryName, setEditingSubcategoryName] = useState('');
    const [expandedCategories, setExpandedCategories] = useState(new Set());

    useEffect(() => {
        loadWays();
        loadCategories();
    }, []);

    // Ways of Learning handlers
    const loadWays = () => {
        const waysData = db.getAll('waysOfLearning') || [];
        setWays(waysData);
    };

    const handleAddWay = () => {
        if (!newWay.trim()) return;
        
        const way = {
            id: uuidv4(),
            name: newWay.trim(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        db.insert('waysOfLearning', way);
        setNewWay('');
        loadWays();
    };

    const startEditingWay = (way) => {
        setEditingWay({
            id: way.id,
            name: way.name,
            createdAt: way.createdAt,
            updatedAt: way.updatedAt
        });
    };

    const handleUpdateWay = () => {
        if (!editingWay || !editingWay.name.trim()) return;

        const updatedWay = {
            ...editingWay,
            name: editingWay.name.trim(),
            updatedAt: new Date().toISOString()
        };

        db.update('waysOfLearning', updatedWay.id, updatedWay);
        setEditingWay(null);
        loadWays();
    };

    const handleDeleteWay = (id) => {
        db.delete('waysOfLearning', id);
        loadWays();
    };

    // Categories handlers
    const loadCategories = () => {
        const categoriesData = db.getAll('categories');
        const subcategoriesData = db.getAll('subcategories');
        
        const categoriesWithSubs = categoriesData.map(category => ({
            ...category,
            subcategories: subcategoriesData.filter(sub => sub.categoryId === category.id)
        }));
        
        setCategories(categoriesWithSubs);
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
        if (!editingCategoryName.trim()) return;
        
        const category = categories.find(c => c.id === id);
        if (!category) return;

        const updatedCategory = {
            ...category,
            name: editingCategoryName.trim()
        };

        db.update('categories', id, updatedCategory);
        setEditingCategoryId(null);
        setEditingCategoryName('');
        loadCategories();
    };

    const handleDeleteCategory = (id) => {
        // Удаляем все подкатегории этой категории
        const category = categories.find(c => c.id === id);
        if (category) {
            category.subcategories.forEach(sub => {
                db.delete('subcategories', sub.id);
            });
        }
        db.delete('categories', id);
        loadCategories();
    };

    // Subcategories handlers
    const handleAddSubcategory = (categoryId) => {
        if (!newSubcategory.trim()) return;
        
        const subcategory = {
            name: newSubcategory.trim(),
            categoryId: categoryId,
            createdAt: new Date().toISOString()
        };

        db.insert('subcategories', subcategory);
        setNewSubcategory('');
        loadCategories();
    };

    const handleUpdateSubcategory = (id, categoryId) => {
        if (!editingSubcategoryName.trim()) return;
        
        const category = categories.find(c => c.id === categoryId);
        if (!category) return;

        const subcategory = category.subcategories.find(s => s.id === id);
        if (!subcategory) return;

        const updatedSubcategory = {
            ...subcategory,
            name: editingSubcategoryName.trim()
        };

        db.update('subcategories', id, updatedSubcategory);
        setEditingSubcategoryId(null);
        setEditingSubcategoryName('');
        loadCategories();
    };

    const handleDeleteSubcategory = (id) => {
        db.delete('subcategories', id);
        loadCategories();
    };

    const toggleCategory = (categoryId) => {
        const newExpanded = new Set(expandedCategories);
        if (newExpanded.has(categoryId)) {
            newExpanded.delete(categoryId);
        } else {
            newExpanded.add(categoryId);
        }
        setExpandedCategories(newExpanded);
    };

    return (
        <div className="system-config-panel">
            <h1 className="config-panel-title">Настройки системы</h1>

            {/* Ways of Learning */}
            <section className="config-section">
                <h2 className="config-section-title">Способы обучения</h2>
                <div className="config-add-form">
                    <input
                        type="text"
                        className="config-add-input"
                        placeholder="Название"
                        value={newWay}
                        onChange={(e) => setNewWay(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddWay()}
                    />
                    <button className="config-add-button" onClick={handleAddWay}>Добавить</button>
                </div>

                <div className="config-items-list">
                    {ways && ways.map(way => (
                        <div key={way.id} className="config-item">
                            {editingWay && editingWay.id === way.id ? (
                                <div className="config-edit-form">
                                    <input
                                        type="text"
                                        className="config-edit-input"
                                        value={editingWay.name || ''}
                                        onChange={(e) => setEditingWay({
                                            ...editingWay,
                                            name: e.target.value
                                        })}
                                        onKeyPress={(e) => e.key === 'Enter' && handleUpdateWay()}
                                        autoFocus
                                    />
                                    <div className="config-actions">
                                        <button className="config-action-button" onClick={handleUpdateWay}>✓</button>
                                        <button className="config-action-button" onClick={() => setEditingWay(null)}>✕</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="config-item-content">
                                    <span className="config-item-text">{way.name}</span>
                                    <div className="config-actions">
                                        <button className="config-action-button" onClick={() => startEditingWay(way)}>✎</button>
                                        <button className="config-action-button" onClick={() => handleDeleteWay(way.id)}>✕</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Categories and Subcategories */}
            <section className="config-section">
                <h2 className="config-section-title">Категории</h2>
                <div className="config-add-form">
                    <input
                        type="text"
                        className="config-add-input"
                        placeholder="Название категории"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                    />
                    <button className="config-add-button" onClick={handleAddCategory}>Добавить</button>
                </div>

                <div className="config-items-list">
                    {categories.map(category => (
                        <div key={category.id} className="config-category-item">
                            <div className="config-item">
                                {editingCategoryId === category.id ? (
                                    <div className="config-edit-form">
                                        <input
                                            type="text"
                                            className="config-edit-input"
                                            value={editingCategoryName}
                                            onChange={(e) => setEditingCategoryName(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleUpdateCategory(category.id)}
                                            autoFocus
                                        />
                                        <div className="config-actions">
                                            <button className="config-action-button" onClick={() => handleUpdateCategory(category.id)}>✓</button>
                                            <button className="config-action-button" onClick={() => setEditingCategoryId(null)}>✕</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="config-item-content">
                                        <div className="config-category-name">
                                            <button 
                                                className={`config-expand-button ${expandedCategories.has(category.id) ? 'expanded' : ''}`}
                                                onClick={() => toggleCategory(category.id)}
                                            >
                                                {expandedCategories.has(category.id) ? '▼' : '▶'}
                                            </button>
                                            <span className="config-item-text">{category.name}</span>
                                        </div>
                                        <div className="config-actions">
                                            <button className="config-action-button" onClick={() => {
                                                setEditingCategoryId(category.id);
                                                setEditingCategoryName(category.name);
                                            }}>✎</button>
                                            <button className="config-action-button" onClick={() => handleDeleteCategory(category.id)}>✕</button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Subcategories */}
                            {expandedCategories.has(category.id) && (
                                <div className="config-subcategories">
                                    <div className="config-add-form">
                                        <input
                                            type="text"
                                            className="config-add-input"
                                            placeholder="Название подкатегории"
                                            value={newSubcategory}
                                            onChange={(e) => setNewSubcategory(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleAddSubcategory(category.id)}
                                        />
                                        <button className="config-add-button" onClick={() => handleAddSubcategory(category.id)}>Добавить</button>
                                    </div>

                                    <div className="config-items-list">
                                        {category.subcategories.map(subcategory => (
                                            <div key={subcategory.id} className="config-item">
                                                {editingSubcategoryId === subcategory.id ? (
                                                    <div className="config-edit-form">
                                                        <input
                                                            type="text"
                                                            className="config-edit-input"
                                                            value={editingSubcategoryName}
                                                            onChange={(e) => setEditingSubcategoryName(e.target.value)}
                                                            onKeyPress={(e) => e.key === 'Enter' && handleUpdateSubcategory(subcategory.id, category.id)}
                                                            autoFocus
                                                        />
                                                        <div className="config-actions">
                                                            <button className="config-action-button" onClick={() => handleUpdateSubcategory(subcategory.id, category.id)}>✓</button>
                                                            <button className="config-action-button" onClick={() => setEditingSubcategoryId(null)}>✕</button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="config-item-content">
                                                        <span className="config-item-text">{subcategory.name}</span>
                                                        <div className="config-actions">
                                                            <button className="config-action-button" onClick={() => {
                                                                setEditingSubcategoryId(subcategory.id);
                                                                setEditingSubcategoryName(subcategory.name);
                                                            }}>✎</button>
                                                            <button className="config-action-button" onClick={() => handleDeleteSubcategory(subcategory.id)}>✕</button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default SystemConfigPanel; 