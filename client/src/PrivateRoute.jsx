import React, { useContext } from 'react';
import { Route, Navigate, useParams } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import StudentHomePage from './pages/StudentHomePage/StudentHomePage'; // Убедитесь, что регистр правильный

const PrivateRoute = ({ ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { userId } = useParams(); // Получаем userId из параметров маршрута

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <StudentHomePage userId={userId} /> : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;




