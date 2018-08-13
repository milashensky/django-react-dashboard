from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import REDIRECT_FIELD_NAME


class IndexView(LoginRequiredMixin, TemplateView):
    login_url = '/login'
    redirect_field_name = REDIRECT_FIELD_NAME
    template_name = 'common/index.html'
