import clientHandler from "@/app/networking/clientHandler";

export const loginVecino = (email: string, password: string) => clientHandler.client.post("login", {email, password})
export const loginMunicipal = (legajo: string, password: string) => clientHandler.client.post("login", {legajo, password})
export const registroVecino = (email: string, documento: string) => clientHandler.client.post("signin", {email, documento})
export const changePassword = (password: string) => clientHandler.client_auth.put("perfil?password", {password})
