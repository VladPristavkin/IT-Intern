import React from 'react';
import './ExportModal.css';
import { exportToWord, exportToPDF, exportToExcel } from '../../../utils/exportUtils';

const ExportModal = ({ isOpen, onClose, data }) => {
    if (!isOpen) return null;

    const handleExport = async (type) => {
        try {
            const exportData = {
                ...data,
                exportType: type
            };

            switch (data.type) {
                case 'analytics':
                    // Analytics page export (charts, test results)
                    switch (type) {
                        case 'docx':
                            await exportToWord(exportData);
                            break;
                        case 'pdf':
                            await exportToPDF(exportData);
                            break;
                        case 'excel':
                            await exportToExcel(exportData);
                            break;
                        default:
                            console.error('Неизвестный тип экспорта');
                    }
                    break;

                case 'market-analysis':
                    // Market analysis export (skills comparison)
                    switch (type) {
                        case 'docx':
                            await exportToWord(exportData);
                            break;
                        case 'pdf':
                            await exportToPDF(exportData);
                            break;
                        case 'excel':
                            await exportToExcel(exportData);
                            break;
                        default:
                            console.error('Неизвестный тип экспорта');
                    }
                    break;

                default:
                    console.error('Неизвестный тип данных для экспорта');
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
                        className="teacher-export-button docx"
                        onClick={() => handleExport('docx')}
                    >
                        Экспорт в docx
                    </button>
                    <button 
                        className="teacher-export-button pdf"
                        onClick={() => handleExport('pdf')}
                    >
                        Экспорт в pdf
                    </button>
                    <button 
                        className="teacher-export-button excel"
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