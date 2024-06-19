import clientHandler from "@/app/networking/clientHandler";

export const loginVecino = (email: string, password: string) => clientHandler.client.post("login", {email, password})
export const loginMunicipal = (legajo: string, password: string) => clientHandler.client.post("login", {legajo, password})
export const registroVecino = (email: string, documento: string) => clientHandler.client.post("signin", {email, documento})
export const changePassword = (password: string) => clientHandler.client_auth.put("perfil?password", {password})
export const changePasswordProfile = (oldpassword: string, password: string) => clientHandler.client_auth.put("perfil?password_profile", {oldpassword, password})
export const solicitarRecupero = (email: string, documento: string) => clientHandler.client.post("perfil?solicitud_pass", {email, documento})
export const verificarCodigo = (codigo: string) => clientHandler.client.post("perfil?verificar_codigo", {codigo})
export const verPerfil = () => clientHandler.client_auth.get("perfil")
export const obtenerPublicaciones = () => clientHandler.client.get("publicaciones")