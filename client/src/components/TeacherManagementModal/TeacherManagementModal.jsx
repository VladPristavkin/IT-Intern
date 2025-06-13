import React, { useState, useEffect } from 'react';
import './TeacherManagementModal.css';
import db from '../../utils/localDb';

const TeacherManagementModal = ({ open, onClose, teacherData }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        department: '',
        password: '' // Only for new teachers or password changes
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        username: '',
        department: '',
        password: ''
    });

    useEffect(() => {
        if (teacherData) {
            setFormData({
                name: teacherData.name || '',
                email: teacherData.email || '',
                username: teacherData.username || '',
                department: teacherData.department || '',
                password: '' // Don't populate password for existing teachers
            });
        } else {
            setFormData({
                name: '',
                email: '',
                username: '',
                department: '',
                password: ''
            });
        }
        setErrors({
            name: '',
            email: '',
            username: '',
            department: '',
            password: ''
        });
    }, [teacherData]);

    const validateName = (name) => {
        if (!name) return 'ФИО обязательно для заполнения';
        if (!/^[А-ЯЁа-яё\s-]+$/.test(name)) return 'ФИО может содержать только русские буквы, пробелы и дефис';
        const words = name.trim().split(/\s+/);
        if (words.length < 2) return 'Введите полное ФИО (минимум имя и фамилия)';
        return '';
    };

    const validateEmail = (email) => {
        if (!email) return 'Email обязателен для заполнения';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return 'Введите корректный email';

        // Проверка на существование email в базе
        const users = db.getAll('users');
        const existingUser = users.find(user => 
            user.email === email && (!teacherData || user.userId !== teacherData.userId)
        );
        if (existingUser) return 'Пользователь с таким email уже существует';
        
        return '';
    };

    const validateUsername = (username) => {
        if (!username) return 'Никнейм обязателен для заполнения';
        if (username.length < 3) return 'Никнейм должен быть не менее 3 символов';
        if (!/^[a-zA-Z0-9_]+$/.test(username)) return 'Никнейм может содержать только буквы, цифры и подчеркивания';

        // Проверка на существование username в базе
        const users = db.getAll('users');
        const existingUser = users.find(user => 
            user.username === username && (!teacherData || user.userId !== teacherData.userId)
        );
        if (existingUser) return 'Пользователь с таким никнеймом уже существует';

        return '';
    };

    const validateDepartment = (department) => {
        if (!department) return 'Кафедра обязательна для заполнения';
        return '';
    };

    const validatePassword = (password, isNew) => {
        if (!password && isNew) return 'Пароль обязателен для заполнения';
        if (password && password.length > 0) {
            if (password.length < 6) return 'Пароль должен быть не менее 6 символов';
            if (!/[A-Z]/.test(password)) return 'Пароль должен содержать хотя бы одну заглавную букву';
            if (!/[0-9]/.test(password)) return 'Пароль должен содержать хотя бы одну цифру';
        }
        return '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isNew = !teacherData;

        const newErrors = {
            name: validateName(formData.name),
            email: validateEmail(formData.email),
            username: validateUsername(formData.username),
            department: validateDepartment(formData.department),
            password: validatePassword(formData.password, isNew)
        };

        setErrors(newErrors);

        // Check if there are any errors
        if (Object.values(newErrors).some(error => error !== '')) {
            return;
        }

        const teacherInfo = {
            ...formData,
            id: teacherData?.id || null,
            role: 'teacher',
            isAdmin: false
        };

        // Only include password in the update if it was changed
        if (!formData.password) {
            delete teacherInfo.password;
        }

        onClose(teacherInfo);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    };

    if (!open) return null;

    return (
        <div className="modal-overlay">
            <div className="teacher-management-modal">
                <h2>{teacherData ? 'Редактировать преподавателя' : 'Добавить преподавателя'}</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label>ФИО</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={errors.name ? 'error' : ''}
                        />
                        <div className="error-message">{errors.name}</div>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'error' : ''}
                        />
                        <div className="error-message">{errors.email}</div>
                    </div>
                    <div className="form-group">
                        <label>Никнейм</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={errors.username ? 'error' : ''}
                        />
                        <div className="error-message">{errors.username}</div>
                    </div>
                    <div className="form-group">
                        <label>Кафедра</label>
                        <input
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className={errors.department ? 'error' : ''}
                        />
                        <div className="error-message">{errors.department}</div>
                    </div>
                    <div className="form-group">
                        <label>{teacherData ? 'Новый пароль (оставьте пустым, чтобы не менять)' : 'Пароль'}</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'error' : ''}
                            placeholder={teacherData ? 'Введите новый пароль' : 'Введите пароль'}
                            noValidate
                        />
                        <div className="error-message">{errors.password}</div>
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="cancel-button" onClick={() => onClose()}>
                            Отмена
                        </button>
                        <button type="submit" className="submit-button">
                            {teacherData ? 'Сохранить' : 'Добавить'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TeacherManagementModal; 