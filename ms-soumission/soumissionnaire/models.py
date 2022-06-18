from django.db import models

class Soumissionnaire(models.Model):
    email = models.EmailField() 
    mongoid = models.TextField()
    is_valid = models.BooleanField()


class Offre(models.Model):
    name = models.TextField()
    mongoid = models.TextField()
    d_Day = models.DateField()


class Lot(models.Model):
    offre = models.ForeignKey(to=Offre, on_delete=models.CASCADE)
    mongoid = models.TextField()