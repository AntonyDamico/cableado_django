from .estructuras.Habitacion import Habitacion
from .estructuras.Caja import Caja
import json


def parseHabitaciones(data, pos_caja_p, const_mts):
    data[0]['habAnterior'] = None
    habitaciones = [make_habitacion_principal(data[0], pos_caja_p)]
    data.pop(0)

    for hab in data:
        habitaciones.append(make_habitacion(hab, habitaciones, const_mts))

    return habitaciones


def make_habitacion_principal(data, caja_p):
    habitacion_p = Habitacion(
        data['computadoras'], data['x'],
        data['y'], data['ancho'],
        data['alto'])
    habitacion_p.agregar_caja_principal(*[cord for cord in caja_p])
    return habitacion_p


def make_habitacion(data, habitaciones, const_mts):
    return Habitacion(
        data['computadoras'],
        data['x'], data['y'],
        data['ancho'], data['alto'],
        habitaciones[data['habAnterior']],
        const_mts
    )


def parseCajas(data):
    cajas = []
    for caja in data:
        cajas.append(make_caja(caja))
    return cajas


def make_caja(data):
    return Caja(data['x'], data['y'], computadoras=data['computadoras'])


def get_cajas_json(habitaciones):
    cajasArr = [hab.cajas for hab in habitaciones]
    cajas_json = json.dumps(
        [[caja.get_dict() for caja in cajas] for cajas in cajasArr]
    )
    return cajas_json


def calcular_habitaciones(habitaciones, margen_error, precio, pisos):
    cableado_aereo = sum([hab.cableado_aereo for hab in habitaciones])
    cableado_bajada = sum([hab.cableado_bajada for hab in habitaciones])
    # error = (margen_error/100) * (cableado_aereo+cableado_bajada)
    # total_piso = cableado_aereo + cableado_bajada + error
    # precio_piso = total_piso * precio
    # total_edificio = total_piso * pisos
    # precio_edificio = precio_piso * pisos

    # return {
    #     'cableado_aereo': cableado_aereo,
    #     'cableado_bajada': cableado_bajada,
    #     'error': error,
    #     'total_piso': total_piso,
    #     'precio_piso': precio_piso,
    #     'total_edificio': total_edificio,
    #     'precio_edificio': precio_edificio
    # }
    respuestas = {
        'cableado_aereo': cableado_aereo,
        'cableado_bajada': cableado_bajada
    }
    respuestas.update(calculos_generales(cableado_aereo, cableado_bajada, margen_error, precio, pisos))
    return respuestas


def calcular_cajas(cajas, const_mts, margen_error, precio, pisos):
    cableado_aereo = sum([(caja.computadoras * (caja.x + caja.y)) for caja in cajas])
    cableado_bajada = sum([(caja.computadoras * const_mts) for caja in cajas])
    respuestas = {
        'cableado_aereo': cableado_aereo,
        'cableado_bajada': cableado_bajada
    }
    respuestas.update(calculos_generales(cableado_aereo, cableado_bajada, margen_error, precio, pisos))
    return respuestas


def calculos_generales(cableado_aereo, cableado_bajada, margen_error, precio, pisos):
    error = (margen_error/100) * (cableado_aereo+cableado_bajada)
    total_piso = cableado_aereo + cableado_bajada + error
    precio_piso = total_piso * precio
    total_edificio = total_piso * pisos
    precio_edificio = precio_piso * pisos
    return {
        'error': error,
        'total_piso': total_piso,
        'precio_piso': precio_piso,
        'total_edificio': total_edificio,
        'precio_edificio': precio_edificio
    }


def calcular_pos_caja_principal(habitaciones):
    hab_p = habitaciones[0]
    habs_arr = habitaciones[1:]
    pos_final = [0, 0]
    p_vecinos = [hab for hab in habs_arr if hab['habAnterior'] == 0]

    for vecino in p_vecinos:
        # if hab_p['x'] < vecino['x']:
        #     pos_final[0] = hab_p['ancho']

        if hab_p['x'] > vecino['x']:
            pos_final[0] = hab_p['ancho']

        if hab_p['y'] > vecino['y']:
            pos_final[1] = hab_p['alto']
    return pos_final
