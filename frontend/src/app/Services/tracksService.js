import api from "./index";

export const createTrack = (project) => {
    const res = api.post("/track/", project)
    return res.status;
}

export const getAllTracksFromSession = () => {
    const res = api.get(`session/${id}/tracks/`);
    return res
}

export const getTrack = (id) => {
    const res = api.get(`/track/${id}`);
    return res
}

export const deleteTrack = (id) => {
    const res = api.delete(`/track/${id}`)
    return res.status
}

export const updateTrack = (id, project) => {
    const res = api.put(`/track/${id}`, project)
    return res.status;
}