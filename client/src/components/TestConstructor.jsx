import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Paper, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

const StyledButton = styled(Button)({
  backgroundColor: '#3366FF',
  color: 'white',
  width: '100%',
  padding: '10px',
  marginTop: '15px',
  borderRadius: '10px',
  '&:hover': {
    backgroundColor: '#2952CC',
  },
});

const TestConstructor = ({ isEditing, testData, onClose }) => {
  const [testName, setTestName] = useState('');
  const [testDescription, setTestDescription] = useState('');

  useEffect(() => {
    if (isEditing && testData) {
      setTestName(testData.name || '');
      setTestDescription(testData.description || '');
    }
  }, [isEditing, testData]);

  const handleAccessSettings = () => {
    // Handle access settings logic
  };

  const handleQuestionsSettings = () => {
    // Handle questions and answers settings logic
  };

  const handlePublish = () => {
    // Handle publish logic
    onClose();
  };

  const textFieldStyles = {
    mb: 2,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none',
      },
      '&.Mui-focused fieldset': {
        border: '1px solid #1976d2',
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
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        maxWidth: 400,
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{ mb: 3, textAlign: 'center' }}
      >Конструктор тестов
      </Typography>

      <TextField
        fullWidth
        label="Введите имя теста"
        variant="outlined"
        value={testName}
        onChange={(e) => setTestName(e.target.value)}
        sx={textFieldStyles}
      />

      <TextField
        fullWidth
        label="Введите описание теста"
        variant="outlined"
        value={testDescription}
        onChange={(e) => setTestDescription(e.target.value)}
        multiline
        rows={3}
        sx={{
          ...textFieldStyles,
          '& .MuiOutlinedInput-root': {
            ...textFieldStyles['& .MuiOutlinedInput-root'],
            backgroundColor: '#f5f5f5',
          }
        }}
      />

      <StyledButton
        variant="contained"
        onClick={handleAccessSettings}
      >
        Настроить доступ к тесту
      </StyledButton>

      <StyledButton
        variant="contained"
        onClick={handleQuestionsSettings}
      >
        Настроить вопросы и ответы
      </StyledButton>

      <StyledButton
        variant="contained"
        onClick={handlePublish}
      >
        {isEditing ? 'Сохранить изменения' : 'Опубликовать'}
      </StyledButton>
    </Paper>
  );
};

export default TestConstructor; 