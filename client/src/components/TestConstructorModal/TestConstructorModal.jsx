import React, { useState, useEffect, useContext } from 'react';
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
import QuestionsConfigModal from '../QuestionsConfigModal/QuestionsConfigModal';
import db from '../../utils/localDb';
import { v4 as uuidv4 } from 'uuid';
import AuthContext from '../../context/AuthContext';

const TestConstructorModal = ({ open, onClose, testData = null }) => {
    const [testName, setTestName] = useState('');
    const [isDateConfigOpen, setIsDateConfigOpen] = useState(false);
    const [isQuestionsConfigOpen, setIsQuestionsConfigOpen] = useState(false);
    const [dateConfig, setDateConfig] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [test, setTest] = useState(null);
    const [error, setError] = useState('');

    const { user, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if (testData) {
            setTest(testData);
            setTestName(testData.title || '');
            setDateConfig({
                startDate: testData.startDate,
                endDate: testData.endDate,
                timeLimit: testData.timeLimit
            });
            setQuestions(Array.isArray(testData.questions) ? testData.questions : []);
        } else {
            setTest(null);
            setTestName('');
            setDateConfig(null);
            setQuestions([]);
        }
        setError('');
    }, [testData, open]);

    const handleClose = () => {
        setTestName('');
        setDateConfig(null);
        setTest(null);
        setQuestions([]);
        setError('');
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

    const handleOpenQuestionsConfig = () => {
        setIsQuestionsConfigOpen(true);
    };

    const handleCloseQuestionsConfig = () => {
        setIsQuestionsConfigOpen(false);
    };

    const handleQuestionsConfigSave = (updatedTest) => {
        if (updatedTest?.questions) {
            setQuestions(Array.isArray(updatedTest.questions) ? updatedTest.questions : []);
            setTest(prev => ({
                ...prev,
                ...updatedTest,
                questions: Array.isArray(updatedTest.questions) ? updatedTest.questions : []
            }));
        }
        setIsQuestionsConfigOpen(false);
    };

    const validateTest = () => {
        if (!isAuthenticated || !user) {
            setError('Необходимо авторизоваться для создания теста');
            return false;
        }
        if (!testName.trim()) {
            setError('Пожалуйста, введите название теста');
            return false;
        }
        if (!dateConfig) {
            setError('Пожалуйста, настройте даты доступа к тесту');
            return false;
        }
        if (questions.length === 0) {
            setError('Добавьте хотя бы один вопрос в тест');
            return false;
        }
        setError('');
        return true;
    };

    const handlePublish = () => {
        if (!validateTest()) return;

        const userId = user.userId;
        const fullUser = db.find('users', user => user.userId === userId)[0];

        const testData = {
            id: test?.id || uuidv4(),
            title: testName.trim(),
            startDate: dateConfig.startDate,
            endDate: dateConfig.endDate,
            timeLimit: dateConfig.timeLimit,
            questions: questions,
            teacherId: fullUser.userId,
            teacherName: fullUser.name,
            createdAt: test?.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        onClose(testData);
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
                        {testData ? 'Редактирование теста' : 'Конструктор тестов'}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={3} sx={{ py: 2 }}>
                        {error && (
                            <Typography color="error" textAlign="center">
                                {error}
                            </Typography>
                        )}
                        
                        <TextField
                            fullWidth
                            label="Введите имя теста"
                            variant="outlined"
                            value={testName}
                            onChange={(e) => setTestName(e.target.value)}
                            error={!!error && !testName.trim()}
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
                            onClick={handleOpenQuestionsConfig}
                            sx={{ 
                                py: 1.5,
                                backgroundColor: questions.length > 0 ? '#43A047' : '#4285F4',
                                '&:hover': {
                                    backgroundColor: questions.length > 0 ? '#2E7D32' : '#3367D6'
                                },
                                borderRadius: '10px',
                            }}
                        >
                            Настроить вопросы и ответы
                        </Button>

                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handlePublish}
                            sx={{ 
                                py: 1.5,
                                backgroundColor: '#4285F4',
                                '&:hover': {
                                    backgroundColor: '#3367D6'
                                },
                                borderRadius: '10px',
                            }}
                        >
                            Опубликовать тест
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

            <QuestionsConfigModal
                open={isQuestionsConfigOpen}
                onClose={handleCloseQuestionsConfig}
                onSave={handleQuestionsConfigSave}
                test={{
                    ...test,
                    questions: Array.isArray(questions) ? questions : []
                }}
            />
        </>
    );
};

export default TestConstructorModal; 