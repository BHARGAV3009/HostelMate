import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import IntroPage from "./pages/IntroPage";
import LoginPage from "./pages/LoginPage";

import StudentLayout from "./layouts/StudentLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import MyRoom from "./pages/student/MyRoom";
import StudentComplaints from "./pages/student/StudentComplaints";
import StudentPayments from "./pages/student/StudentPayments";
import StudentNotices from "./pages/student/StudentNotices";
import StudentFoodMenu from "./pages/student/StudentFoodMenu";
import StudentProfile from "./pages/student/StudentProfile";
import StudentHelp from "./pages/student/StudentHelp";

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageStudents from "./pages/admin/ManageStudents";
import ManageRooms from "./pages/admin/ManageRooms";
import ManageAllocations from "./pages/admin/ManageAllocations";
import ManageComplaints from "./pages/admin/ManageComplaints";
import ManagePayments from "./pages/admin/ManagePayments";
import ManageNotices from "./pages/admin/ManageNotices";
import ManageFoodMenu from "./pages/admin/ManageFoodMenu";

function App() {
  const { login, isAuthenticated, user, loading } = useAuth();

  const handleLogin = (userData) => {
    
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h3>Loading HostelMate Auth...</h3>
      </div>
    );
  }

  return (
    <Routes>
      {}
      <Route path="/" element={<IntroPage />} />
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate
              to={user?.role === "admin" ? "/admin" : "/home"}
              replace
            />
          ) : (
            <LoginPage onLogin={login} />
          )
        }
      />
      <Route
        path="/signup"
        element={
          isAuthenticated ? (
            <Navigate to="/home" replace />
          ) : (
            <LoginPage onLogin={login} />
          )
        }
      />

      {}
      <Route
        element={
          <ProtectedRoute requiredRole="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<StudentDashboard />} />
        <Route path="/my-room" element={<MyRoom />} />
        <Route path="/complaints" element={<StudentComplaints />} />
        <Route path="/fees" element={<StudentPayments />} />
        <Route path="/notices" element={<StudentNotices />} />
        <Route path="/food-menu" element={<StudentFoodMenu />} />
        <Route path="/account" element={<StudentProfile />} />
        <Route path="/help" element={<StudentHelp />} />
      </Route>

      {}
      <Route
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/students" element={<ManageStudents />} />
        <Route path="/admin/rooms" element={<ManageRooms />} />
        <Route path="/admin/allocations" element={<ManageAllocations />} />
        <Route path="/admin/complaints" element={<ManageComplaints />} />
        <Route path="/admin/payments" element={<ManagePayments />} />
        <Route path="/admin/notices" element={<ManageNotices />} />
        <Route path="/admin/food-menu" element={<ManageFoodMenu />} />
      </Route>

      {}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
