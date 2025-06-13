import React from 'react';
import {
    TextField,
    Stack,
    IconButton,
    FormControlLabel,
    Checkbox,
    Typography,
    Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { AnswerOption } from '../../../models';

const ClosedQuestionForm = ({ question, onChange }) => {
    const handleQuestionTextChange = (e) => {
        onChange({
            ...question,
            text: e.target.value
        });
    };

    const handleAddOption = () => {
        const newOption = new AnswerOption();
        onChange({
            ...question,
            options: [...(question.options || []), newOption]
        });
    };

    const handleOptionChange = (index, field) => (e) => {
        const newOptions = [...(question.options || [])];
        newOptions[index] = {
            ...newOptions[index],
            [field]: field === 'isCorrect' ? e.target.checked : e.target.value
        };
        onChange({
            ...question,
            options: newOptions
        });
    };

    const handleDeleteOption = (index) => {
        const newOptions = question.options.filter((_, i) => i !== index);
        onChange({
            ...question,
            options: newOptions
        });
    };

    return (
        <Stack spacing={2}>
            <TextField
                fullWidth
                label="Текст вопроса"
                value={question.text}
                onChange={handleQuestionTextChange}
                required
                multiline
                rows={2}
            />

            <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1">Варианты ответов</Typography>
                    <Button
                        startIcon={<AddIcon />}
                        onClick={handleAddOption}
                        variant="outlined"
                        size="small"
                    >
                        Добавить вариант
                    </Button>
                </Stack>

                {(question.options || []).map((option, index) => (
                    <Stack
                        key={index}
                        direction="row"
                        spacing={2}
                        alignItems="center"
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={option.isCorrect}
                                    onChange={handleOptionChange(index, 'isCorrect')}
                                />
                            }
                            label="Правильный"
                        />
                        <TextField
                            fullWidth
                            label={`Вариант ${index + 1}`}
                            value={option.text}
                            onChange={handleOptionChange(index, 'text')}
                            required
                        />
                        <IconButton
                            onClick={() => handleDeleteOption(index)}
                            color="error"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Stack>
                ))}
            </Stack>
        </Stack>
    );
};

export default ClosedQuestionForm; 