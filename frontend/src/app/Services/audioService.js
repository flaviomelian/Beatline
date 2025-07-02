import api from "./index";

export const createAudio = (audio) => {
    const res = api.post("/audio/", audio)
    return res.status;
}

export const getAllAudiosFromSession = () => {
    const res = api.get(`session/${id}/audios/`);
    return res
}

export const getAudio = (id) => {
    const res = api.get(`/audio/${id}`);
    return res
}

export const deleteAudio = (id) => {
    const res = api.delete(`/audio/${id}`)
    return res.status
}

export const updateAudio = (id, project) => {
    const res = api.put(`/audio/${id}`, project)
    return res.status;
}