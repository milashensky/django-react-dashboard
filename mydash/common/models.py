from django.db import models


class Item(models.Model):
    name = models.CharField(max_length=128)
    item_name = models.CharField(max_length=128)
    price = models.FloatField()

    def __str__(self):
        return '{s.name} - {s.price}'.format(s=self)
