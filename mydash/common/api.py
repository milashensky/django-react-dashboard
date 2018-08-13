from django.views.generic import View
from django.shortcuts import get_object_or_404

from common.mixins import ApiMixin, LoginRequiredMixin
from common.models import Item
from common.forms import ItemForm


class ItemsView(ApiMixin, LoginRequiredMixin, View):

    def get(self, request, *args, **kwargs):
        return Item.objects.all()

    def post(self, request, *args, **kwargs):
        form = ItemForm(self.data)
        if form.is_valid():
            item = form.save()
            return {
                "status": True,
                "item": {
                    "id": item.pk,
                    "itemName": item.item_name,
                    "price": item.price,
                    "name": item.name
                }
            }
        return {"state": False, "errors": form.errors}


class ItemView(ApiMixin, LoginRequiredMixin, View):

    def get(self, request, id, *args, **kwargs):
        item = get_object_or_404(Item, pk=id)
        return {
            "id": item.pk,
            "name": item.name,
            "itemName": item.item_name,
            "price": item.price
        }

    def delete(self, request, id, *args, **kwargs):
        item = get_object_or_404(Item, pk=id)
        item.delete()
        return {"status": True}

    def put(self, request, id, *args, **kwargs):
        item = get_object_or_404(Item, pk=id)
        form = ItemForm(self.data, instance=item)
        if form.is_valid():
            item = form.save()
            return {"status": True, "item": {
                    "id": item.pk,
                    "itemName": item.item_name,
                    "price": item.price,
                    "name": item.name
                }
            }
        return {"state": False, "errors": form.errors}
