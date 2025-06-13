import React, { useState, useEffect } from 'react';
import { 
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Stack,
    TextField,
    Typography
} from '@mui/material';

const DateConfigModal = ({ open, onClose, onSave, initialConfig, test }) => {
    const [config, setConfig] = useState({
        startDate: '',
        endDate: '',
        timeLimit: ''
    });

    useEffect(() => {
        if (initialConfig) {
            setConfig(initialConfig);
        } else if (test?.dateConfig) {
            setConfig(test.dateConfig);
        } else {
            setConfig({
                startDate: '',
                endDate: '',
                timeLimit: ''
            });
        }
    }, [initialConfig, test, open]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setConfig(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        // Validate dates
        const start = new Date(config.startDate);
        const end = new Date(config.endDate);
        
        if (start >= end) {
            alert('Дата начала должна быть раньше даты окончания');
            return;
        }

        if (!config.timeLimit || config.timeLimit <= 0) {
            alert('Пожалуйста, укажите корректное ограничение по времени');
            return;
        }

        onSave(config);
        onClose();
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            maxWidth="sm"
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: '16px',
                    boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.1)',
                    width: '400px',
                },
            }}
            fullWidth
        >
            <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
                <Typography variant="h5" component="div">
                    {test ? 'Изменение настроек доступа' : 'Настройка дат и времени'}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Stack spacing={3} sx={{ py: 2 }}>
                    <TextField
                        fullWidth
                        type="datetime-local"
                        label="Дата и время начала"
                        name="startDate"
                        value={config.startDate}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        fullWidth
                        type="datetime-local"
                        label="Дата и время окончания"
                        name="endDate"
                        value={config.endDate}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        fullWidth
                        type="number"
                        label="Ограничение по времени (в минутах)"
                        name="timeLimit"
                        value={config.timeLimit}
                        onChange={handleInputChange}
                        InputProps={{ inputProps: { min: 1 } }}
                    />

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleSave}
                        sx={{ 
                            py: 1.5,
                            backgroundColor: '#4285F4',
                            '&:hover': {
                                backgroundColor: '#3367D6'
                            },
                            borderRadius: '10px',
                        }}
                    >
                        {test ? 'Сохранить изменения' : 'Сохранить'}
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default DateConfigModal; 