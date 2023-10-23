import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from '../views/Landing/Landing';

export interface IMainRouteProps {
}

export default function MainRoute (props: IMainRouteProps) {
  return (
    <Routes>
        <Route path="/landing" Component={Landing} />
        <Route path="/*" Component={Landing} />
        {/* Add other routes as needed */}
    </Routes>
  );
}
