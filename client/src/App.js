import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from './components/modals/login/LoginForm';
import RegistrationForm from './components/modals/registration/RegistrationForm';
import TeacherApplications from './pages/admin/AdminPage';
import TeacherManagement from './pages/admin/TeacherManagement';
import StudentHomePage from './pages/StudentHomePage/StudentHomePage';
import TeacherHomePage from './pages/TeacherHomePage/TeacherHomePage';
import PageMain from './pages/main/PageMain';
import InternshipsPage from './pages/InternshipsPage/InternshipsPage';
import TestsToPassPage from './pages/TestsToPassPage/TestsToPassPage';
import StudentsTestsHistory from './pages/StudentsTestsHistory/StudentsTestsHistory';
import StudentAnalyticsPage from './pages/StudentAnalyticsPage/StudentAnalyticsPage';
import StudentSelectedTestAnalyticsPage from './pages/StudentAnalyticsPage/StudentSelectedTestAnalyticsPage';
import CreateTestPage from './pages/TeacherTests/CreateTestPage';
import TeacherTestsPage from './pages/TeacherTests/TeacherTestsPage';
import TestResultsPage from './pages/TeacherTests/TestResultsPage';
import { AuthProvider } from './context/AuthContext';
import LocalStorageService, { STORAGE_KEYS } from './services/localStorageService';
import './App.css';
import TeacherTests from './components/TeacherTests/TeacherTests';
import StudentTests from './components/StudentTests/StudentTests';
import TestTaking from './components/TestTaking/TestTaking';
import TestResults from './components/TestResults/TestResults';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  // Инициализация админа при первом запуске
  useEffect(() => {
    const applications = LocalStorageService.getItem(STORAGE_KEYS.TEACHER_APPLICATIONS, []);
    const adminExists = applications.some(app => app.username === 'admin123');

    if (!adminExists) {
      const adminUser = {
        id: 'admin-' + Date.now(),
        username: 'admin123',
        password: 'admin123',
        email: 'admin@example.com',
        role: 'teacher',
        isAdmin: true,
        status: 'approved',
        dateSubmitted: new Date().toISOString(),
        approvedAt: new Date().toISOString()
      };

      LocalStorageService.setItem(STORAGE_KEYS.TEACHER_APPLICATIONS, [...applications, adminUser]);
    }
  }, []);

  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<PageMain />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/student" element={<StudentHomePage />} />
            <Route path="/student/testing" element={<TestsToPassPage />} />
            <Route path="/student/testing/history" element={<StudentsTestsHistory />} />
            <Route path="/student/analytics" element={<StudentAnalyticsPage />} />
            <Route path="/student/analytics/:testId" element={<StudentSelectedTestAnalyticsPage />} />
            <Route path="/teacher" element={<TeacherHomePage />} />
            <Route path="/teacher/tests/create" element={<CreateTestPage />} />
            <Route path="/teacher/tests/list" element={<TeacherTestsPage />} />
            <Route path="/teacher/tests/results" element={<TestResultsPage />} />
            <Route path="/teacher/admin/applications" element={<TeacherApplications />} />
            <Route path="/teacher/admin/teachers" element={<TeacherManagement />} />
            <Route path="/internships" element={<InternshipsPage />} />
            <Route
              path="/teacher/tests"
              element={
                <PrivateRoute allowedRoles={['teacher', 'admin']}>
                  <TeacherTests />
                </PrivateRoute>
              }
            />
            <Route
              path="/student/tests"
              element={
                <PrivateRoute allowedRoles={['student']}>
                  <StudentTests />
                </PrivateRoute>
              }
            />
            <Route
              path="/student/test/:testId"
              element={
                <PrivateRoute allowedRoles={['student']}>
                  <TestTaking />
                </PrivateRoute>
              }
            />
            <Route
              path="/student/test-results/:testId"
              element={
                <PrivateRoute allowedRoles={['student']}>
                  <TestResults />
                </PrivateRoute>
              }
            />
          </Routes>
          <ToastContainer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;



