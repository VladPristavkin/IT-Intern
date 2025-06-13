import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Stack,
    TextField,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import db from '../../utils/localDb';
import { v4 as uuidv4 } from 'uuid';

const QuestionsConfigModal = ({ open, onClose, onSave, test }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [isAddingQuestion, setIsAddingQuestion] = useState(false);
    const [categories] = useState(db.getAll('categories'));
    const [subcategories] = useState(db.getAll('subcategories'));

    useEffect(() => {
        // Ensure questions is always an array
        setQuestions(Array.isArray(test?.questions) ? test.questions : []);
    }, [test]);

    const handleAddQuestion = () => {
        setCurrentQuestion({
            id: uuidv4(),
            type: 'closed',
            categoryId: '',
            subcategoryId: '',
            text: '',
            correctAnswer: '',
            options: [{ id: uuidv4(), text: '', isCorrect: false }],
        });
        setIsAddingQuestion(true);
    };

    const handleQuestionTypeChange = (event) => {
        const type = event.target.value;
        setCurrentQuestion(prev => ({
            ...prev,
            type,
            options: type === 'closed' ? [{ id: uuidv4(), text: '', isCorrect: false }] : [],
            correctAnswer: type === 'open' ? '' : undefined
        }));
    };

    const handleAddOption = () => {
        setCurrentQuestion(prev => ({
            ...prev,
            options: [...prev.options, { id: uuidv4(), text: '', isCorrect: false }]
        }));
    };

    const handleOptionChange = (optionId, field, value) => {
        setCurrentQuestion(prev => ({
            ...prev,
            options: prev.options.map(opt =>
                opt.id === optionId ? { ...opt, [field]: value } : opt
            )
        }));
    };

    const handleRemoveOption = (optionId) => {
        setCurrentQuestion(prev => ({
            ...prev,
            options: prev.options.filter(opt => opt.id !== optionId)
        }));
    };

    const handleSaveQuestion = () => {
        if (currentQuestion.id && questions.some(q => q.id === currentQuestion.id)) {
            setQuestions(prev => 
                prev.map(q => q.id === currentQuestion.id ? currentQuestion : q)
            );
        } else {
            setQuestions(prev => [...prev, { ...currentQuestion, id: uuidv4() }]);
        }
        setCurrentQuestion(null);
        setIsAddingQuestion(false);
    };

    const handleEditQuestion = (question) => {
        setCurrentQuestion(question);
        setIsAddingQuestion(true);
    };

    const handleRemoveQuestion = (questionId) => {
        setQuestions(prev => prev.filter(q => q.id !== questionId));
    };

    const handleSaveAll = () => {
        const updatedTest = {
            ...test,
            questions
        };
        onSave(updatedTest);
        onClose();
    };

    const getSubcategoriesForCategory = (categoryId) => {
        return subcategories.filter(subcat => subcat.categoryId === categoryId);
    };

    const renderQuestionForm = () => (
        <Stack spacing={3} sx={{ paddingTop: 1 }}>
            <FormControl fullWidth> 
                <InputLabel>Тип вопроса</InputLabel>
                <Select
                    value={currentQuestion.type}
                    onChange={handleQuestionTypeChange}
                    label="Тип вопроса"
                >
                    <MenuItem value="closed">Закрытый (с вариантами ответа)</MenuItem>
                    <MenuItem value="open">Открытый (свободный ответ)</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel>Категория</InputLabel>
                <Select
                    value={currentQuestion.categoryId}
                    onChange={(e) => setCurrentQuestion(prev => ({
                        ...prev,
                        categoryId: e.target.value,
                        subcategoryId: ''
                    }))}
                    label="Категория"
                >
                    {categories.map(cat => (
                        <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            {currentQuestion.categoryId && (
                <FormControl fullWidth>
                    <InputLabel>Подкатегория</InputLabel>
                    <Select
                        value={currentQuestion.subcategoryId}
                        onChange={(e) => setCurrentQuestion(prev => ({
                            ...prev,
                            subcategoryId: e.target.value
                        }))}
                        label="Подкатегория"
                    >
                        {getSubcategoriesForCategory(currentQuestion.categoryId).map(subcat => (
                            <MenuItem key={subcat.id} value={subcat.id}>
                                {subcat.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            <TextField
                fullWidth
                multiline
                rows={3}
                label="Текст вопроса"
                value={currentQuestion.text}
                onChange={(e) => setCurrentQuestion(prev => ({
                    ...prev,
                    text: e.target.value
                }))}
            />

            {currentQuestion.type === 'open' ? (
                <TextField
                    fullWidth
                    label="Правильный ответ"
                    value={currentQuestion.correctAnswer}
                    onChange={(e) => setCurrentQuestion(prev => ({
                        ...prev,
                        correctAnswer: e.target.value
                    }))}
                />
            ) : (
                <Stack spacing={2}>
                    <Typography variant="subtitle1">Варианты ответов:</Typography>
                    {currentQuestion.options.map((option, index) => (
                        <Stack 
                            key={option.id} 
                            direction="row" 
                            spacing={2} 
                            alignItems="center"
                        >
                            <Checkbox
                                checked={option.isCorrect}
                                onChange={(e) => handleOptionChange(
                                    option.id,
                                    'isCorrect',
                                    e.target.checked
                                )}
                            />
                            <TextField
                                fullWidth
                                value={option.text}
                                onChange={(e) => handleOptionChange(
                                    option.id,
                                    'text',
                                    e.target.value
                                )}
                                placeholder={`Вариант ${index + 1}`}
                            />
                            <IconButton 
                                onClick={() => handleRemoveOption(option.id)}
                                disabled={currentQuestion.options.length === 1}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Stack>
                    ))}
                    <Button
                        startIcon={<AddIcon />}
                        onClick={handleAddOption}
                    >
                        Добавить вариант
                    </Button>
                </Stack>
            )}

            <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button onClick={() => setIsAddingQuestion(false)}>
                    Отмена
                </Button>
                <Button 
                    variant="contained" 
                    onClick={handleSaveQuestion}
                    disabled={!currentQuestion.text || !currentQuestion.categoryId || !currentQuestion.subcategoryId}
                >
                    Сохранить вопрос
                </Button>
            </Stack>
        </Stack>
    );

    const renderQuestionsList = () => (
        <Stack spacing={3}>
            <List>
                {Array.isArray(questions) && questions.map((question, index) => (
                    <ListItem 
                        key={question.id}
                        sx={{ 
                            bgcolor: 'background.paper',
                            mb: 1,
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'divider'
                        }}
                    >
                        <ListItemText
                            primary={`${index + 1}. ${question.text}`}
                            secondary={`${categories.find(c => c.id === question.categoryId)?.name} > 
                                      ${subcategories.find(s => s.id === question.subcategoryId)?.name}`}
                        />
                        <ListItemSecondaryAction>
                            <IconButton onClick={() => handleEditQuestion(question)}>
                                <AddIcon />
                            </IconButton>
                            <IconButton onClick={() => handleRemoveQuestion(question.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>

            <Button
                startIcon={<AddIcon />}
                onClick={handleAddQuestion}
                variant="contained"
                sx={{ borderRadius: 2 }}
            >
                Добавить вопрос
            </Button>

            <Button
                variant="contained"
                color="primary"
                onClick={handleSaveAll}
                sx={{ borderRadius: 2 }}
            >
                {Array.isArray(questions) && questions.length > 0 ? `Сохранить вопросы (${questions.length})` : 'Сохранить все вопросы'}
            </Button>
        </Stack>
    );

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle >
                <Typography variant="h5" component="div" align="center">
                    Настройка вопросов теста
                </Typography>
            </DialogTitle>
            <DialogContent>
                {isAddingQuestion ? renderQuestionForm() : renderQuestionsList()}
            </DialogContent>
        </Dialog>
    );
};

export default QuestionsConfigModal; 