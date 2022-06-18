from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from django.conf.urls.static import static
from django.conf import settings
from . import views
router = DefaultRouter()

router.register('soumission', views.SoumissionAdminViewset, basename='soumission')
urlpatterns = [
    path('', include(router.urls)),
    re_path(r'^offre/(?P<offre>[^/]+)/$', views.SoumissionGetByOffreView.as_view()),
    re_path(r'^user/(?P<soumissionnaire>[^/]+)/$', views.SoumissionGetBySoumissionnaireView.as_view()),
    re_path(r'^lot/(?P<lot>[^/]+)/$', views.SoumissionGetByLotView.as_view()),
    re_path(r'^useroffre/(?P<lot>[^/]+)/(?P<soumissionnaire>[^/]+)/$', views.SoumissionGetByLotAndUser.as_view()),
    re_path(r'^getPrix/(?P<soumission>[^/]+)/(?P<prix>[^/]+)/$', views.GetPrixView.as_view())
    

]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)