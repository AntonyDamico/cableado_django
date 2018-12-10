from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
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
    margen_error = int(data['margenError'])
    precio = float(data['precio'])
    pisos = int(data['pisos'])

    respuestas = utils.calcular(habitaciones, margen_error, precio, pisos)

    cajas_json = utils.get_cajas_json(habitaciones)
    respuestas['cajas'] = cajas_json

    return JsonResponse(respuestas)
