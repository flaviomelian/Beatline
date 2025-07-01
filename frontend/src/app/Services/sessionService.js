import api from "./index";

export const createSession = (project) => {
    const res = api.post("/session/", project)
    console.log(res)
    return res.status;
}