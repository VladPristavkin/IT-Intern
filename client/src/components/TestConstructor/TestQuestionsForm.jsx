import React, { useState } from 'react';
import {
    Button,
    Paper,
    Stack,
    Typography,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { OpenQuestionEntity, ClosedQuestionEntity } from '../../models';
import OpenQuestionForm from './QuestionForms/OpenQuestionForm';
import ClosedQuestionForm from './QuestionForms/ClosedQuestionForm';

const TestQuestionsForm = ({ initialData, onSubmit, onPublish }) => {
    const [questions, setQuestions] = useState(initialData.questions || []);
    const [questionType, setQuestionType] = useState('closed');

    const handleAddQuestion = () => {
        const newQuestion = questionType === 'open' 
            ? new OpenQuestionEntity()
            : new ClosedQuestionEntity();
        
        setQuestions([...questions, newQuestion]);
    };

    const handleQuestionChange = (index, updatedQuestion) => {
        const newQuestions = [...questions];
        newQuestions[index] = updatedQuestion;
        setQuestions(newQuestions);
    };

    const handleDeleteQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(questions);
    };

    return (
        <Paper className="test-questions-form" sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 2 }}>
            <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <Typography variant="h6">Вопросы теста</Typography>

                    <Stack direction="row" spacing={2} alignItems="center">
                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel>Тип вопроса</InputLabel>
                            <Select
                                value={questionType}
                                label="Тип вопроса"
                                onChange={(e) => setQuestionType(e.target.value)}
                            >
                                <MenuItem value="closed">С вариантами ответа</MenuItem>
                                <MenuItem value="open">Открытый вопрос</MenuItem>
                            </Select>
                        </FormControl>

                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={handleAddQuestion}
                        >
                            Добавить вопрос
                        </Button>
                    </Stack>

                    {questions.map((question, index) => (
                        <Paper key={index} elevation={2} sx={{ p: 2, position: 'relative' }}>
                            <IconButton
                                sx={{ position: 'absolute', top: 8, right: 8 }}
                                onClick={() => handleDeleteQuestion(index)}
                            >
                                <DeleteIcon />
                            </IconButton>

                            {question instanceof OpenQuestionEntity ? (
                                <OpenQuestionForm
                                    question={question}
                                    onChange={(q) => handleQuestionChange(index, q)}
                                />
                            ) : (
                                <ClosedQuestionForm
                                    question={question}
                                    onChange={(q) => handleQuestionChange(index, q)}
                                />
                            )}
                        </Paper>
                    ))}

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onPublish}
                        disabled={questions.length === 0}
                        fullWidth
                    >
                        ОПУБЛИКОВАТЬ
                    </Button>
                </Stack>
            </form>
        </Paper>
    );
};

export default TestQuestionsForm; 