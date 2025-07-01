import api from "./index";

export const createSession = (project) => {
    const res = api.post("/session/", project)
    return res.status;
}

export const getAllSessions = () => {
    const res = api.get("/session/");
    console.log(res)
    return res
}