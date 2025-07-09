import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login/index'
import Jobs from './components/Jobs/index'
import Home from './components/Home/index'
import JobDetails from './components/JobDetails/index'
import ProtectedRoute from './components/ProtectedRoute/index'
import NotFound from './components/NotFound/index'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
      <Route path="/jobs/:id" element={<ProtectedRoute><JobDetails /></ProtectedRoute>} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  </BrowserRouter>
)

export default App