from contextlib import nullcontext
from django.shortcuts import render
from django.http import Http404
from soumission.models import Soumission
from soumission.serializer import SoumissionSerializer
from soumissionnaire.models import Soumissionnaire, Offre, Lot
from rest_framework import viewsets, status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.hashers import check_password, make_password
from .models import *
from .serializer import *
import datetime
from .producer import publish
from rest_framework.parsers import MultiPartParser

class SoumissionAdminViewset(viewsets.ViewSet):
    def list(self, request):
        soumission = Soumission.objects.all()
        serializer = SoumissionSerializer(soumission, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        parser_classes = [MultiPartParser]
        serializer = SoumissionSerializer(data=request.data)
        lott = Lot.objects.get(mongoid = serializer.initial_data['lot'])
        man = Soumissionnaire.objects.get(mongoid = serializer.initial_data['soumissionnaire'])
        offrre  = Offre.objects.get(mongoid = serializer.initial_data['offre'])
        request.data.update({"offre":offrre.id , "lot": lott.id, "soumissionnaire": man.id})
        serializer.is_valid(raise_exception=True)
        prx = make_password(str(serializer.validated_data['prix']), 'thisissalty')
        obj = {'message': serializer.validated_data, 'propertie':'postsoumission'}
        serializer.save(prix = prx)
        soum = Soumission.objects.get(id = serializer.data['id'])
        obj['message']['id'] = serializer.data['id']
        obj['message']['offre'] = offrre.id
        obj['message']['lot'] = lott.id
        obj['message']['cahierCharge'] = None
        obj['message']['extraitRole'] = None
        obj['message']['soumissionnaire'] = man.id
        publish('postsoumission', obj)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None): 
        soum = Soumission.objects.get(pk=pk)
        serializer = SoumissionSerializer(soum)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        return Response('You can not update a soumission!')
        #soum = Soumission.objects.get(pk=pk)
        #serializer = SoumissionSerializer(instance=soum, data=request.data)
        #serializer.is_valid(raise_exception=True)
        #serializer.save()
        #return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, pk=None):
        soum = Soumission.objects.get(pk=pk)
        print(soum)
        obj = { 'message': str(soum.id), 'propertie': 'deletesoumission'}
        print(obj)
        soum.delete()
        publish('deletesoumission', obj)
        return Response('soumission deleted')

    

class SoumissionGetByOffreView(generics.ListAPIView):
    serializer_class = SoumissionSerializer
    def get_queryset(self):
        off = self.kwargs['offre']
        return Soumission.objects.filter(offre=off)

class SoumissionGetByLotView(generics.ListAPIView):
    serializer_class = SoumissionSerializer
    def get_queryset(self):
        print(self.kwargs['lot'])
        lotid = self.kwargs['lot']
        lot = Lot.objects.get(mongoid = lotid) 
        print(lot)
        return Soumission.objects.filter(lot=lot.id)

class SoumissionGetBySoumissionnaireView(generics.ListAPIView):
    serializer_class = SoumissionSerializer
    def get_queryset(self):
        userId = self.kwargs['soumissionnaire']
        man = Soumissionnaire.objects.get(mongoid = userId)
        return Soumission.objects.filter(soumissionnaire=man.id)

class GetPrixView(APIView):
    serializer_class = SoumissionSerializer
    def get(self, *args, **kwargs):
        soum = self.kwargs['soumission']
        prx = self.kwargs['prix']
        user = Soumission.objects.get(pk = soum)
        offre = user.offre
        if (offre.d_Day != datetime.datetime.now().date()):
            print(datetime.datetime.now().date())
            print(offre.d_Day)
            return Response('Its not the revelation day!')
        else:
            if (make_password(prx, 'thisissalty') == user.prix):
                return Response(prx)
            else:
                return Response('Uncorrect price value')
        
class SoumissionGetByLotAndUser(generics.ListAPIView):
    serializer_class = SoumissionSerializer
    def get_queryset(self):
        userId = self.kwargs['soumissionnaire']
        man = Soumissionnaire.objects.get(mongoid = userId)
        lotId = self.kwargs['lot']
        lot = Lot.objects.get(mongoid = lotId)
        soumi = Soumission.objects.filter(soumissionnaire=man.id, lot=lot.id)
        return soumi