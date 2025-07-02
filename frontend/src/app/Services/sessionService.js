import api from "./index";

export const createSession = (project) => {
    const res = api.post("/session/", project)
    return res.status;
}

export const getAllSessions = () => {
    const res = api.get("/session/");
    return res
}

export const getSession = (id) => {
    const res = api.get(`/session/${id}`);
    return res
}

export const deleteSession = (id) => {
    const res = api.delete(`/session/${id}`)
    return res.status
}

export const updateSession = (id, project) => {
    const res = api.put(`/session/${id}`, project)
    return res.status;
}