import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export interface ImagenSeleccionada {
    id: number;
    base64: string;
}

const seleccionarImagenDeGaleria = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
        orderedSelection: true,
    });

    if (!result.canceled) {
        return result.assets;
    }
};

const tomarFoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
    });

    if (!result.canceled) {
        return result.assets;
    }
};

const seleccionarImagen = async () => {
    let seleccion: string | undefined;
    await new Promise(resolve => {
        Alert.alert(
            'Seleccionar Fuente de Imagen',
            'Elija una opción para seleccionar una imagen',
            [
                {
                    text: 'Galería',
                    onPress: () => {
                        seleccion = 'galeria';
                        resolve(undefined);
                    },
                },
                {
                    text: 'Tomar Foto',
                    onPress: () => {
                        seleccion = 'camara';
                        resolve(undefined);
                    },
                },
                {
                    text: 'Cancelar',
                    style: 'cancel',
                    onPress: () => resolve(undefined),
                },
            ],
            { cancelable: false }
        );
    });

    if (seleccion === 'galeria') {
        return await seleccionarImagenDeGaleria();
    } else if (seleccion === 'camara') {
        return await tomarFoto();
    }
};

export const cargarImagenes = async (
    idImagen: number,
    imagenes: ImagenSeleccionada[],
    MAXIMAS_IMAGENES_ADICIONALES_PERMITIDAS: number,
    esInspector: boolean
) => {
    const cargarFotosAdicionales = async () => {
        const cantidadImagenesCargadas = imagenes.length;
        const cantidadImagenesRestantesPermitidas = MAXIMAS_IMAGENES_ADICIONALES_PERMITIDAS - cantidadImagenesCargadas;
        if (cantidadImagenesRestantesPermitidas > 0 || esInspector) {
            try {
                let resultado = await seleccionarImagen();

                if (resultado) {
                    const imagenesNuevas: ImagenSeleccionada[] = resultado.map((asset: any) => ({
                        id: idImagen + 1,
                        base64: asset.base64 as string,
                    })).filter((imagen) => imagen.base64 !== undefined) as ImagenSeleccionada[];

                    idImagen++;

                    if (cantidadImagenesCargadas + imagenesNuevas.length > MAXIMAS_IMAGENES_ADICIONALES_PERMITIDAS) {
                        Alert.alert(`No se permite agregar más de ${MAXIMAS_IMAGENES_ADICIONALES_PERMITIDAS} imágenes.`);
                    } else {
                        imagenes = [...imagenes, ...imagenesNuevas];
                    }
                }
            } catch (error) {
                console.log(error);
                Alert.alert('Error al seleccionar la imagen', 'Ocurrió un error al seleccionar la imagen.');
            }
        } else {
            Alert.alert(`No se permite agregar más de ${MAXIMAS_IMAGENES_ADICIONALES_PERMITIDAS} imágenes adicionales.`);
        }
    };

    await cargarFotosAdicionales();

    return imagenes;
};

export const cargarThumbnail = async () => {
    let resultado = await seleccionarImagen();

    if (resultado && resultado[0] && resultado[0].base64) {
        return resultado[0].base64;
    }

    return null;
};

export function eliminarImagen(idImagen: number, imagenes: ImagenSeleccionada[]) {
    const imagenesActualizadas = imagenes.filter((image) => image.id !== idImagen);
    const imagenesConNuevosIds = imagenesActualizadas.map((image, index) => ({
        ...image,
        id: index + 1,
    }));

    return imagenesConNuevosIds;
};