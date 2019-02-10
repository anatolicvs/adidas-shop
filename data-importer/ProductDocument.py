from mongoengine import *
import datetime


class Products(Document):
    name = StringField(max_length=80, required=True)
    title = StringField(max_length=250, required=False)
    imageUri = StringField(max_length=250, required=False)
    price = DecimalField(requiredv=False)
    priceCurrency = StringField(max_length=100, required=False)
    isBooked = BooleanField(default=False)
    cursor = IntField()
    dateModified = DateTimeField(default=datetime.datetime.utcnow)
