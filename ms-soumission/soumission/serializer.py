from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class SoumissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Soumission
        fields = '__all__'
