const API_BASE = "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
};

export const loginUser = (email, password) =>
  fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);

export const signupUser = (name, email, password, phoneNumber, role) =>
  fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, phoneNumber, role }),
  }).then(handleResponse);

export const loginWithGoogle = (credential) =>
  fetch(`${API_BASE}/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ credential }),
  }).then(handleResponse);

export const getProfile = () =>
  fetch(`${API_BASE}/auth/profile`, { headers: getAuthHeaders() }).then(handleResponse);

export const updateProfile = (data) =>
  fetch(`${API_BASE}/auth/profile`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse);

export const getMyRoom = () =>
  fetch(`${API_BASE}/student/room`, { headers: getAuthHeaders() }).then(handleResponse);

export const getStudentNotices = () =>
  fetch(`${API_BASE}/student/notices`, { headers: getAuthHeaders() }).then(handleResponse);

export const createStudentComplaint = (issue) =>
  fetch(`${API_BASE}/student/complaints`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ issue }),
  }).then(handleResponse);

export const getMyComplaints = () =>
  fetch(`${API_BASE}/student/complaints`, { headers: getAuthHeaders() }).then(handleResponse);

export const getMyPayments = () =>
  fetch(`${API_BASE}/student/payments`, { headers: getAuthHeaders() }).then(handleResponse);

export const payFee = (id) =>
  fetch(`${API_BASE}/student/payments/${id}/pay`, {
    method: "PUT",
    headers: getAuthHeaders(),
  }).then(handleResponse);

export const getFoodMenu = () =>
  fetch(`${API_BASE}/food`, { headers: getAuthHeaders() }).then(handleResponse);

export const getAdminStats = () =>
  fetch(`${API_BASE}/admin/stats`, { headers: getAuthHeaders() }).then(handleResponse);

export const getStudents = () =>
  fetch(`${API_BASE}/users/students`, { headers: getAuthHeaders() }).then(handleResponse);

export const createStudent = (data) =>
  fetch(`${API_BASE}/users/students`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse);

export const updateStudent = (id, data) =>
  fetch(`${API_BASE}/users/students/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse);

export const deleteStudent = (id) =>
  fetch(`${API_BASE}/users/students/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  }).then(handleResponse);

export const getRooms = () =>
  fetch(`${API_BASE}/rooms/all`, { headers: getAuthHeaders() }).then(handleResponse);

export const createRoom = (data) =>
  fetch(`${API_BASE}/rooms/create`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse);

export const updateRoom = (id, data) =>
  fetch(`${API_BASE}/rooms/update/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse);

export const deleteRoom = (id) =>
  fetch(`${API_BASE}/rooms/delete/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  }).then(handleResponse);

export const getAllAllocations = () =>
  fetch(`${API_BASE}/allocations/all`, { headers: getAuthHeaders() }).then(handleResponse);

export const assignRoom = (userId, roomId) =>
  fetch(`${API_BASE}/allocations/assign`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ userId, roomId }),
  }).then(handleResponse);

export const deallocateRoom = (id) =>
  fetch(`${API_BASE}/allocations/vacate/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
  }).then(handleResponse);

export const getAllComplaints = () =>
  fetch(`${API_BASE}/complaints/all`, { headers: getAuthHeaders() }).then(handleResponse);

export const updateComplaintStatus = (id, status) =>
  fetch(`${API_BASE}/complaints/update/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  }).then(handleResponse);

export const deleteComplaint = (id) =>
  fetch(`${API_BASE}/complaints/delete/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  }).then(handleResponse);

export const getAllPayments = () =>
  fetch(`${API_BASE}/payments/all`, { headers: getAuthHeaders() }).then(handleResponse);

export const createPayment = (data) =>
  fetch(`${API_BASE}/payments/new`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse);

export const deletePayment = (id) =>
  fetch(`${API_BASE}/payments/delete/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  }).then(handleResponse);

export const getAllNotices = () =>
  fetch(`${API_BASE}/notices/all`, { headers: getAuthHeaders() }).then(handleResponse);

export const createNotice = (data) =>
  fetch(`${API_BASE}/notices/new`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse);

export const updateNotice = (id, data) =>
  fetch(`${API_BASE}/notices/update/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse);

export const deleteNotice = (id) =>
  fetch(`${API_BASE}/notices/delete/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  }).then(handleResponse);

export const setFoodMenu = (data) =>
  fetch(`${API_BASE}/food`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse);

export const deleteFoodMenu = (id) =>
  fetch(`${API_BASE}/food/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  }).then(handleResponse);
