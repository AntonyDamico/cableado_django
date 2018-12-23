from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response

from . import utils


@csrf_exempt
def main(request):
    return render(request, 'calculo/index.html', {})


@csrf_exempt
def main2(request):
    return render(request, 'calculo/index2.html', {})


@api_view(['POST'])
@csrf_exempt
def calcular(request):
    data = request.data
    pos_caja_p = utils.calcular_pos_caja_principal(data['habitaciones'])
    habitaciones = utils.parseHabitaciones(
        data['habitaciones'],
        pos_caja_p,
        data['constAereo']
    )

    respuestas = utils.calcular_habitaciones(
        habitaciones,
        data['margenError'],
        data['precio'],
        data['pisos']
    )

    cajas_json = utils.get_cajas_json(habitaciones)
    respuestas['cajas'] = cajas_json

    return JsonResponse(respuestas)
