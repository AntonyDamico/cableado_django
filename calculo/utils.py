from .estructuras.Habitacion import Habitacion


def parseHabitaciones(data, const_mts):
    data[0]['habAnterior'] = None

    habitaciones = [Habitacion(
        int(data[0]['computadoras']), int(data[0]['x']),
        int(data[0]['y']), int(data[0]['ancho']),
        int(data[0]['alto']))]
    habitaciones[0].agregar_caja_principal(0, 0)
    data.pop(0)

    for hab in data:
        habitaciones.append(Habitacion(
            int(hab['computadoras']),
            int(hab['x']),
            int(hab['y']),
            int(hab['ancho']),
            int(hab['alto']),
            habitaciones[int(hab['habAnterior'])],
            float(const_mts)
        ))

    return habitaciones


def calcular(habitaciones, margen_error, precio, pisos):
    cableado_aereo = sum([hab.cableado_aereo for hab in habitaciones])
    cableado_bajada = sum([hab.cableado_bajada for hab in habitaciones])
    error = (margen_error/100) * (cableado_aereo+cableado_bajada)
    total_piso = cableado_aereo + cableado_bajada + error
    precio_piso = total_piso * precio
    total_edificio = total_piso * pisos
    precio_edificio = precio_piso * pisos

    return {
        'cableado_aereo': cableado_aereo,
        'cableado_bajada': cableado_bajada,
        'error': error,
        'total_piso': total_piso,
        'precio_piso': precio_piso,
        'total_edificio': total_edificio,
        'precio_edificio': precio_edificio
    }
