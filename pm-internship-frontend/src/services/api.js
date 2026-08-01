import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api"
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;

export async function openResume(fileName) {
    const response = await api.get(`/student/resume/${encodeURIComponent(fileName)}`, {
        responseType: "blob"
    });

    const url = URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
    );

    window.open(url, "_blank", "noopener,noreferrer");
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
