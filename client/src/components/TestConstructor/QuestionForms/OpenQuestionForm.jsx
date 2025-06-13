import React from 'react';
import { TextField, Stack } from '@mui/material';

const OpenQuestionForm = ({ question, onChange }) => {
    const handleChange = (field) => (e) => {
        onChange({
            ...question,
            [field]: e.target.value
        });
    };

    return (
        <Stack spacing={2}>
            <TextField
                fullWidth
                label="Текст вопроса"
                value={question.text}
                onChange={handleChange('text')}
                required
                multiline
                rows={2}
            />
            <TextField
                fullWidth
                label="Правильный ответ"
                value={question.correctAnswer}
                onChange={handleChange('correctAnswer')}
                required
                multiline
                rows={2}
            />
        </Stack>
    );
};

export default OpenQuestionForm; 