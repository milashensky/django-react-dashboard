import json
import datetime

from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import PermissionDenied
from django.core.serializers import serialize
from django.http import HttpResponse
from django.db.models.query import QuerySet


class DjangoJSONEncoder(json.JSONEncoder):

    def default(self, obj):
        if isinstance(obj, HttpResponse):
            return obj.content.decode()
        elif isinstance(obj, datetime.time):
            return obj.strftime('%H:%M')
        elif isinstance(obj, (datetime.datetime, datetime.date)):
            return str(obj.strftime('%s'))
        elif isinstance(obj, QuerySet):
            # + support of ValuesQuerySet
            return json.loads(serialize('json', obj)) if obj._fields is None else list(obj)
        return json.JSONEncoder.default(self, obj)


class JsonResponseMixin:

    def render_to_response(self, context):
        content = DjangoJSONEncoder().encode(context)
        return HttpResponse(content, content_type='application/json')


class CsrfExemptMixin(object):

    @csrf_exempt
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)


class ApiMixin(CsrfExemptMixin, JsonResponseMixin):

    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        try:
            self.data = json.loads(request.body.decode('utf-8') or '{}')
        except json.decoder.JSONDecodeError:
            self.data = {}
        response = super().dispatch(
            request, *args, **kwargs)
        return self.render_to_response(response)


class LoginRequiredMixin:

    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return super().dispatch(request, *args, **kwargs)
        raise PermissionDenied
