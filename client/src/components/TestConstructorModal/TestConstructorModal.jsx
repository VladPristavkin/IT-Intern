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
import DateConfigModal from '../DateConfigModal/DateConfigModal';
import db from '../../utils/localDb';

const TestConstructorModal = ({ open, onClose, testId = null }) => {
    const [testName, setTestName] = useState('');
    const [isDateConfigOpen, setIsDateConfigOpen] = useState(false);
    const [dateConfig, setDateConfig] = useState(null);
    const [test, setTest] = useState(null);

    useEffect(() => {
        if (testId) {
            const existingTest = db.getById('testTemplates', testId);
            if (existingTest) {
                setTest(existingTest);
                setTestName(existingTest.title);
                setDateConfig(existingTest.dateConfig);
            }
        } else {
            // Reset form when opening for new test
            setTest(null);
            setTestName('');
            setDateConfig(null);
        }
    }, [testId, open]);

    const handleClose = () => {
        setTestName('');
        setDateConfig(null);
        setTest(null);
        onClose();
    };

    const handleOpenDateConfig = () => {
        setIsDateConfigOpen(true);
    };

    const handleCloseDateConfig = () => {
        setIsDateConfigOpen(false);
    };

    const handleDateConfigSave = (config) => {
        setDateConfig(config);
        setIsDateConfigOpen(false);
    };

    return (
        <>
            <Dialog 
                open={open} 
                onClose={handleClose}
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
                        {testId ? 'Редактирование теста' : 'Конструктор тестов'}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={3} sx={{ py: 2 }}>
                        <TextField
                            fullWidth
                            label="Введите имя теста"
                            variant="outlined"
                            value={testName}
                            onChange={(e) => setTestName(e.target.value)}
                            sx={{
                                mb: 2,
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    border: 'none',
                                  },
                                  '&.Mui-focused fieldset': {
                                    border: '1px solid #1976d2',
                                  },
                                  '& input': {
                                    textAlign: 'center',
                                  },
                                },
                                '& .MuiInputLabel-root': {
                                  width: '100%',
                                  textAlign: 'center',
                                  left: 0,
                                },
                                '& .MuiInputLabel-shrink': {
                                  textAlign: 'left',
                                },
                              }}
                        />
                        
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleOpenDateConfig}
                            sx={{ 
                                py: 1.5,
                                backgroundColor: dateConfig ? '#43A047' : '#4285F4',
                                '&:hover': {
                                    backgroundColor: dateConfig ? '#2E7D32' : '#3367D6'
                                },
                                borderRadius: '10px',
                            }}
                        >
                            Настроить доступ к тесту
                        </Button>

                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ 
                                py: 1.5,
                                backgroundColor: '#4285F4',
                                '&:hover': {
                                    backgroundColor: '#3367D6'
                                },
                                borderRadius: '10px',
                            }}
                        >
                            Настроить вопросы и ответы
                        </Button>

                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ 
                                py: 1.5,
                                backgroundColor: '#4285F4',
                                '&:hover': {
                                    backgroundColor: '#3367D6'
                                },
                                borderRadius: '10px',
                            }}
                        >
                            Опубликовать
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>

            <DateConfigModal
                open={isDateConfigOpen}
                onClose={handleCloseDateConfig}
                onSave={handleDateConfigSave}
                initialConfig={dateConfig}
                test={test}
            />
        </>
    );
};

export default TestConstructorModal; 