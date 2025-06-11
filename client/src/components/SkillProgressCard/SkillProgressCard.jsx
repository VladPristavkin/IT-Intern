import React from 'react';
import './SkillProgressCard.css';

const SkillProgressCard = ({ skillName, skillPercentage, progressPercentage }) => {
    const getProgressColor = (percentage) => {
        if (percentage === 0) return '#212529'; // черный для 0%
        if (percentage < 30) return '#FD7E14'; // оранжевый для <30%
        if (percentage < 70) return '#FFC107'; // желтый для <70%
        return '#198754'; // зеленый для >=70%
    };

    const getProgressStatus = (percentage) => {
        if (percentage === 0) return 'Не покрыто';
        if (percentage < 30) return 'Слабо покрыто';
        if (percentage < 70) return 'Частично покрыто';
        if (percentage < 85) return 'Достаточно покрыто';
        return 'Хорошо покрыто';
    };

    const generateDescription = (demandPercentage, coveragePercentage) => {
        let description = '';
        
        // Оценка востребованности
        if (demandPercentage >= 80) {
            description += 'Критически важный навык, ';
        } else if (demandPercentage >= 60) {
            description += 'Высоко востребованный навык, ';
        } else if (demandPercentage >= 40) {
            description += 'Умеренно востребованный навык, ';
        } else {
            description += 'Редко требуемый навык, ';
        }

        // Оценка покрытия относительно востребованности
        if (demandPercentage >= 60) { // Для важных навыков
            if (coveragePercentage >= 70) {
                description += 'имеет хорошее покрытие в тесте';
            } else if (coveragePercentage >= 40) {
                description += 'требует добавления вопросов';
            } else {
                description += 'срочно требует внимания';
            }
        } else { // Для менее важных навыков
            if (coveragePercentage >= 50) {
                description += 'достаточно вопросов в тесте';
            } else if (coveragePercentage > 0) {
                description += 'можно улучшить покрытие';
            } else {
                description += 'нет вопросов в тесте';
            }
        }

        return description;
    };

    const description = generateDescription(skillPercentage, progressPercentage);

    return (
        <div className="skill-card">
            <div className="skill-header">
                <span className="skill-name">{skillName}</span>
                <span className="skill-demand">{skillPercentage}% вакансий</span>
            </div>
            
            <p className="skill-description">{description}</p>
            
            <div className="progress-container">
                <div className="progress-bar">
                    <div 
                        className="progress-fill"
                        style={{ 
                            width: `${progressPercentage}%`,
                            backgroundColor: getProgressColor(progressPercentage)
                        }}
                    />
                </div>
                <div className="progress-info">
                    <span className="progress-status" style={{ color: getProgressColor(progressPercentage) }}>
                        {getProgressStatus(progressPercentage)}
                    </span>
                    <span>{progressPercentage}%</span>
                </div>
            </div>
        </div>
    );
};

export default SkillProgressCard; 