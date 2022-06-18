from django.db import models
from soumissionnaire.models import Soumissionnaire, Lot, Offre



class Soumission(models.Model):
    soumissionnaire = models.ForeignKey(to=Soumissionnaire, on_delete=models.CASCADE)
    lot = models.ForeignKey(to= Lot, on_delete=models.CASCADE)
    offre = models.ForeignKey(to=Offre, on_delete=models.CASCADE)
    cahierCharge = models.FileField(blank = True)
    classification = models.CharField(max_length=50)
    nbMaterial = models.BigIntegerField()
    soumissionnaireName = models.CharField(max_length=30)
    nbSalarie = models.BigIntegerField()
    delai = models.BigIntegerField()
    extraitRole = models.FileField(blank = True)
    nCnas = models.BigIntegerField()
    prix = models.CharField(max_length = 100)
