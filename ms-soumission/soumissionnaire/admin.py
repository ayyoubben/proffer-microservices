from django.contrib import admin
from .models import Soumissionnaire, Lot, Offre

admin.site.register(Soumissionnaire)
admin.site.register(Offre)
admin.site.register(Lot)
