import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Login } from './components/Auth/Login';
import { Home } from './pages/Home';
import Doctor from './pages/Doctor';
import Patients from './pages/Patients';
import Layout from './Layout';
import { UserContextProvider } from './contexts/UserContextProvider';
import ProtectedRoute from './components/common/ProtectedRoute';
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout/>,
//     children: [
//       {
//         path: "",
//         element: <Home />
//       },
//       {
//         path: "about",
//         element: <About />
//       },
//       {
//         path: "contact",
//         element: <Contact />
//       }
//     ]
//   }
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />} >
        <Route path="/home" element={<ProtectedRoute element={Home} />} />
        <Route path="/doctors" element={<ProtectedRoute element={Doctor} />} />
        <Route path="/patients" element={<ProtectedRoute element={Patients} />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />

    </>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </UserContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
