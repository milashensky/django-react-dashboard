from django.views.generic import FormView, RedirectView
from django.contrib.auth import REDIRECT_FIELD_NAME, login, logout
from django.contrib.auth.forms import AuthenticationForm


class LoginView(FormView):
    template_name = 'common/login.html'
    form_class = AuthenticationForm

    def form_valid(self, form):
        login(self.request, form.get_user())
        return super().form_valid(form)

    def get_success_url(self):
        return self.request.GET.get(REDIRECT_FIELD_NAME, '/')


class LogoutView(RedirectView):

    def get_redirect_url(self, **kwargs):
        logout(self.request)
        return '/'
