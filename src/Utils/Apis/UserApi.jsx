import axios from "@/Utils/AxiosInstance";

// Ambil semua user
export const getAllUser = () => axios.get("/users");

// Ambil 1 user berdasarkan ID
export const getUser = (id) => axios.get(`/users/${id}`);

// Tambah user baru
export const storeUser = (data) => axios.post("/users", data);

// Update user
export const updateUser = (id, data) => axios.put(`/users/${id}`, data);

// Hapus user
export const deleteUser = (id) => axios.delete(`/users/${id}`);

// Ambil user berdasarkan email (untuk login)
export const getUserByEmail = (email) => axios.get(`/users?email=${email}`);

// Update password user
export const updateUserPassword = (id, passwordData) => axios.put(`/users/${id}/password`, passwordData);

// Update role user
export const updateUserRole = (id, roleData) => axios.put(`/users/${id}/role`, roleData);

// Update permissions user
export const updateUserPermissions = (id, permissionData) => axios.put(`/users/${id}/permissions`, permissionData);

// Ambil user berdasarkan role
export const getUsersByRole = (role) => axios.get(`/users?role=${role}`);

// Validasi user (untuk authentication)
export const validateUser = (credentials) => axios.post("/users/validate", credentials);