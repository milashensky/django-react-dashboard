from django.urls import path, re_path

from common.views import IndexView
from common.api import ItemsView, ItemView


urlpatterns = [
    re_path(r'^api/items', ItemsView.as_view(), name="items_api"),
    re_path(r'^api/item/(?P<id>\d+)/$', ItemView.as_view(), name="item_api"),

    re_path(r'^', IndexView.as_view(), name="index"),
]
