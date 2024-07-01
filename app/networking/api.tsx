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
export const obtenerThumbnail = (id: string) => clientHandler.client.get(`publicaciones/${id}/thumb`)
export const obtenerImagenPublicacion = (idPublicacion: string, idImagen: string) => clientHandler.client.get(`publicaciones/${idPublicacion}/image/${idImagen}`)
export const obtenerMisPublicaciones = () => clientHandler.client_auth.get("publicaciones/propias")
export const obtenerPublicacion = (id: string) => clientHandler.client.get(`publicaciones/${id}`)
export const eliminarPublicacion = (id: string) => clientHandler.client_auth.delete(`publicaciones/${id}`)
export const crearSolicitudNuevaPublicacion = (datosPublicacion: { [key: string]: any }) => clientHandler.client_auth.post("publicaciones", datosPublicacion);

export const obtenerReclamos = (categoria: string = '') => clientHandler.client_auth.get(`reclamos?all=true&categoria=${categoria}`);
export const obtenerCategorias = (esInspector: boolean = false) => clientHandler.client_auth.get(`reclamos/rubros?esInspector=${esInspector}`);
export const obtenerDesperfectos = (categoria: string = '') => clientHandler.client_auth.get(`reclamos/${categoria}/desperfectos`);
export const obtenerSitios = (longitud: string, latitud: string) => clientHandler.client_auth.get(`reclamos/sitios?lat=${latitud}&lon=${longitud}`)
export const obtenerReclamosPropios = (categoria: string = '') => clientHandler.client_auth.get(`reclamos?from=user&categoria=${categoria}`);
export const obtenerReclamo = (id: string) => clientHandler.client_auth.get(`reclamos/${id}`);
export const obtenerImagenReclamo = (idReclamo: string, idImagen: string) => clientHandler.client_auth.get(`reclamos/${idReclamo}/imagen/${idImagen}`);
export const obtenerSeguimientoReclamo = (idReclamo: string) => clientHandler.client_auth.get(`reclamos/${idReclamo}/seguimiento`);
export const crearReclamo = (datosReclamo: {[key: string]: any}) => clientHandler.client_auth.post(`reclamos`, datosReclamo);

export const obtenerDenuncias =  () => clientHandler.client_auth.get("denuncias")
export const obtenerDenunciasRecibidas =  () => clientHandler.client_auth.get("denuncias/recibidas")
export const crearDenuncia = (datosDenuncia: {[key: string]: any}) => clientHandler.client_auth.post("denuncias", datosDenuncia)
export const obtenerDenuncia = (id: string) => clientHandler.client_auth.get(`denuncias/${id}`)
export const obtenerImagenDenuncia = (idDenuncia: string, idImagen: string) => clientHandler.client_auth.get(`denuncias/${idDenuncia}/image/${idImagen}`)

export const obtenerCantidadNotificaciones = () => clientHandler.client_auth.get("notificaciones/cantidad")
export const obtenerNotificaciones = () => clientHandler.client_auth.get("notificaciones/")
