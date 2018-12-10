from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response

@csrf_exempt
def main(request):
    return render(request, 'calculo/index.html', {})

api_view(['POST'])
@csrf_exempt
def calcular(request):
    print('hello')
    return JsonResponse({'hllo': 'bbbyyy'})