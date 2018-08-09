from django.urls import path, re_path
from django.contrib import admin
from django.conf import settings
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from common.views import IndexView
from common.auth import LoginView, LogoutView


urlpatterns = [
    re_path(r'^admin/', admin.site.urls),
    path('login', LoginView.as_view(), name="login"),
    path('logout', LogoutView.as_view(), name='logout'),
    re_path(r'^', IndexView.as_view(), name="index"),  # match all them here
]

urlpatterns += staticfiles_urlpatterns()

if getattr(settings, "DEBUG_TOOLBAR", None):
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
