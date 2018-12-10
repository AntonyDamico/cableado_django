from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response

from . import utils


@csrf_exempt
def main(request):
    return render(request, 'calculo/index.html', {})


@api_view(['POST'])
@csrf_exempt
def calcular(request):
    data = request.data
    habitaciones = utils.parseHabitaciones(
        data['habitaciones'],
        data['posCajaPrincipal'],
        data['constAereo']
    )

    respuestas = utils.calcular(
        habitaciones,
        int(data['margenError']),
        float(data['precio']),
        int(data['pisos'])
    )

    cajas_json = utils.get_cajas_json(habitaciones)
    respuestas['cajas'] = cajas_json

    return JsonResponse(respuestas)
