import React, { useState } from 'react';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent,
    Button,
    Stack,
    TextField,
    Typography
} from '@mui/material';

const TestConstructorModal = ({ open, onClose }) => {
    const [testName, setTestName] = useState('');

    const handleClose = () => {
        setTestName('');
        onClose();
    };

    return (
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
                    Конструктор тестов
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
                                border: 'none', // без границ по умолчанию
                              },
                              '&.Mui-focused fieldset': {
                                border: '1px solid #1976d2', // граница только при фокусе
                              },
                              '& input': {
                                textAlign: 'center', // текст по центру
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
                        sx={{ 
                            py: 1.5,
                            backgroundColor: '#4285F4',
                            '&:hover': {
                                backgroundColor: '#3367D6'
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
    );
};

export default TestConstructorModal; 