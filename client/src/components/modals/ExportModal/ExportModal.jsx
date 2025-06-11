import React from 'react';
import './ExportModal.css';
import { exportToWord, exportToPDF, exportToExcel } from '../../../utils/exportUtils';

const ExportModal = ({ isOpen, onClose, data }) => {
    if (!isOpen) return null;

    const handleExport = async (type) => {
        try {
            switch (type) {
                case 'docx':
                    await exportToWord(data);
                    break;
                case 'pdf':
                    exportToPDF(data);
                    break;
                case 'excel':
                    exportToExcel(data);
                    break;
                default:
                    console.error('Неизвестный тип экспорта');
            }
            onClose();
        } catch (error) {
            console.error('Ошибка при экспорте:', error);
            alert('Произошла ошибка при экспорте файла');
        }
    };

    return (
        <div className="teacher-modal-overlay" onClick={onClose}>
            <div className="teacher-export-modal-content" onClick={e => e.stopPropagation()}>
                <div className="teacher-export-modal-header">
                    <h2>Экспортирование</h2>
                </div>
                
                <div className="teacher-export-options">
                    <button 
                        className="teacher-export-button"
                        onClick={() => handleExport('docx')}
                    >
                        Экспорт в docx
                    </button>
                    <button 
                        className="teacher-export-button"
                        onClick={() => handleExport('pdf')}
                    >
                        Экспорт в pdf
                    </button>
                    <button 
                        className="teacher-export-button"
                        onClick={() => handleExport('excel')}
                    >
                        Экспорт в excel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExportModal; 