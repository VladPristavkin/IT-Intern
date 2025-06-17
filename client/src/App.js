// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LogInForm from './components/modals/login/LogInForm';
// import RegistrationForm from './components/modals/registration/RegistrationForm';
// import UserInfoForm from './components/modals/userInfo/UserInfoForm';
// import PageMain from './pages/main/PageMain';
// import VacancyPage from './pages/vacancy/VacancyPage'

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<PageMain />} />
//         <Route path="/login" element={<LogInForm />} />
//         <Route path="/registration" element={<RegistrationForm />} />
//         <Route path="/userInfo" element={<UserInfoForm />} />
//         <Route path="/vacancy/:id" element={<VacancyPage />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

// import React, { useEffect, useState } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import LogInForm from "./components/modals/login/LogInForm";
// import RegistrationForm from "./components/modals/registration/RegistrationForm";
// import PageMain from "./pages/main/PageMain";
// import VacancyPage from "./pages/vacancy/VacancyPage";
// import UserProfile from "./pages/userProfile/userProfile";
// import PrivateRoute from "./PrivateRoute";

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("jwtToken");
//     if (token) {
//       setIsAuthenticated(true); // Если токен есть в localStorage, устанавливаем isAuthenticated в true
//     } else {
//       setIsAuthenticated(false); // Иначе устанавливаем в false
//     }
//   }, []); // useEffect будет вызван только при монтировании компонента

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<PageMain />} />
//         <Route path="/login" element={<LogInForm />} />
//         <Route path="/registration" element={<RegistrationForm />} />
//         <Route
//           path="/userInfo/:id"
//           element={
//             <PrivateRoute
//               isAuthenticated={isAuthenticated}
//               element={<UserProfile />}
//             />
//           }
//         />

//         <Route path="/vacancy/:id" element={<VacancyPage />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;



import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogInForm from './components/modals/login/LogInForm';
import RegistrationForm from './components/modals/registration/RegistrationForm';
import PageMain from './pages/main/PageMain';
import VacancyPage from './pages/vacancy/VacancyPage';
import PrivateRoute from './PrivateRoute'
import StudentHomePage from './pages/StudentHomePage/StudentHomePage';
import { AuthProvider } from './context/AuthContext';
import PageSearch from './pages/SearchVacancy';
import StudentSavedPage from './pages/StudentSavedPage/StudentSavedPage';
import SuggestedVacanciesPage from './pages/SuggedtedVacanciesPage/SuggedtedVacanciesPage';
import StudentsTestsHistory from './pages/StudentsTestsHistory/StudentsTestsHistory';
import TestsToPassPage from './pages/TestsToPassPage/TestsToPassPage';
import StudentAnalyticsPage from './pages/StudentAnalyticsPage/StudentAnalyticsPage';
import StudentSelectedTestAnalyticsPage from './pages/StudentAnalyticsPage/StudentSelectedTestAnalyticsPage';
import TeacherHomePage from './pages/TeacherHomePage/TeacherHomePage';
import TeacherTestingPage from './pages/TeacherTestingPage/TeacherTestingPage';
import AdminPage from './pages/AdminPage/AdminPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PageMain />} />
          <Route path="/login" element={<LogInForm />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/student" element={<StudentHomePage />} /> {/* Временный маршрут для разработки */}
          <Route path="/student/saved" element={<StudentSavedPage />} /> {/* Временный маршрут для разработки */}
          <Route path="/student/suggested" element={<SuggestedVacanciesPage />} /> {/* Временный маршрут для разработки */}
          <Route path='/student/testing/history' element={<StudentsTestsHistory />} />
          <Route path='/student/testing' element={<TestsToPassPage />} />
          <Route path='/student/analytics' element={<StudentAnalyticsPage/>} />
          <Route path='/student/tests/analytics/:testId' element={<StudentSelectedTestAnalyticsPage/>} />

          <Route path="/teacher" element={<TeacherHomePage />} /> {/* Временный маршрут для разработки */}
          <Route path="/teacher/testing" element={<TeacherTestingPage />} /> {/* Временный маршрут для разработки */}

          <Route path="/admin" element={<AdminPage />} />
          <Route
            path="/user/:userId"
            element={<PrivateRoute />}
          />
          <Route path="/vacancies/:id" element={<VacancyPage />} />
          <Route path="/search" element={<PageSearch />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;



