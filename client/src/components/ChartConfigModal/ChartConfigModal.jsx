import React, { useState, useEffect } from 'react';
import './ChartConfigModal.css';

const ChartConfigModal = ({ isOpen, onClose, onApply, initialConfig }) => {
    const [chartConfig, setChartConfig] = useState({
        type: 'pie',
        color: 'standard',
        scale: 100
    });

    useEffect(() => {
        if (initialConfig) {
            setChartConfig(initialConfig);
        }
    }, [initialConfig, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChartConfig(prev => ({
            ...prev,
            [name]: name === 'scale' ? Number(value) : value
        }));
    };

    const handleApply = () => {
        onApply(chartConfig);
    };

    return (
        <div className="chart-config-modal-overlay" onClick={onClose}>
            <div className="chart-config-modal-content" onClick={e => e.stopPropagation()}>
                <h2>Настройки графика</h2>
                
                <div className="chart-config-form">
                    <div className="config-group">
                        <label>
                            <span className="config-icon">📊</span>
                            Тип графика
                        </label>
                        <select 
                            className="config-select"
                            name="type"
                            value={chartConfig.type}
                            onChange={handleChange}
                        >
                            <option value="pie">Круговая диаграмма</option>
                            <option value="bar">Столбчатая диаграмма</option>
                            <option value="horizontal-bar">Линейчатая диаграмма</option>
                        </select>
                    </div>

                    <div className="config-group">
                        <label>
                            <span className="config-icon">🎨</span>
                            Цвет графика
                        </label>
                        <select 
                            className="config-select"
                            name="color"
                            value={chartConfig.color}
                            onChange={handleChange}
                        >
                            <option value="standard">Стандартный</option>
                            <option value="blue">Синий</option>
                            <option value="purple">Фиолетовый</option>
                            <option value="orange">Оранжевый</option>
                        </select>
                    </div>

                    <div className="config-group">
                        <label>
                            <span className="config-icon">📏</span>
                            Размер графика
                        </label>
                        <select 
                            className="config-select"
                            name="scale"
                            value={chartConfig.scale}
                            onChange={handleChange}
                        >
                            <option value="80">80%</option>
                            <option value="90">90%</option>
                            <option value="100">100%</option>
                            <option value="110">110%</option>
                            <option value="120">120%</option>
                        </select>
                    </div>

                    <button className="apply-button" onClick={handleApply}>
                        Применить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChartConfigModal; 