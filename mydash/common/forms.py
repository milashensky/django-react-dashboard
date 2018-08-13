from django import forms
from common.models import Item


class ItemForm(forms.ModelForm):

    class Meta:
        model = Item
        fields = ('name', 'item_name', 'price')
