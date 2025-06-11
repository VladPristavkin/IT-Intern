import React, { useState, useEffect } from 'react';
import './MarketAnalysisModal.css';
import SkillProgressCard from '../../SkillProgressCard/SkillProgressCard';
import ExportModal from '../ExportModal/ExportModal';

const MarketAnalysisModal = ({ isOpen, onClose }) => {
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);

    useEffect(() => {
        if (isOpen || isExportModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, isExportModalOpen]);

    if (!isOpen) return null;

    const skills = [
        {
            name: 'Docker',
            demand: 67,
            coverage: 0,
            status: 'Требует внимания'
        },
        {
            name: 'SQL',
            demand: 81,
            coverage: 60,
            status: 'Удовлетворительно'
        },
        {
            name: 'Git',
            demand: 55,
            coverage: 40,
            status: 'Требует улучшения'
        },
        {
            name: 'JavaScript',
            demand: 89,
            coverage: 85,
            status: 'Отлично'
        },
        {
            name: 'React',
            demand: 73,
            coverage: 70,
            status: 'Хорошо'
        },
        {
            name: 'AWS',
            demand: 62,
            coverage: 25,
            status: 'Требует внимания'
        }
    ];

    const handleExportClick = () => {
        setIsExportModalOpen(true);
    };

    const handleExportModalClose = () => {
        setIsExportModalOpen(false);
    };

    return (
        <>
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <div>
                            <h2>Анализ соответствия теста рынку</h2>
                            <p className="modal-subtitle">
                                Сравните содержание теста с наиболее востребованными навыками в вакансиях
                            </p>
                        </div>
                    </div>

                    <div className="skills-list">
                        {skills.map((skill, index) => (
                            <SkillProgressCard
                                key={index}
                                skillName={skill.name}
                                skillPercentage={skill.demand}
                                progressPercentage={skill.coverage}
                            />
                        ))}
                    </div>

                    <div className="modal-actions">
                        <button className="action-button complement">Дополнить тест</button>
                        <button className="action-button export" onClick={handleExportClick}>
                            Экспорт отчета
                        </button>
                    </div>
                </div>
            </div>
            
            <ExportModal 
                isOpen={isExportModalOpen}
                onClose={handleExportModalClose}
                data={skills}
            />
        </>
    );
};

export default MarketAnalysisModal; 