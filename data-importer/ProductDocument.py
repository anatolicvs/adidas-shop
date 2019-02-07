from mongoengine import *
import datetime


class ProductDocument(Document):
    name = StringField(max_length=80, required=True)
    title = StringField(max_length=50, required=False)
    imageUri = StringField(max_length=250, required=False)
    price = DecimalField(requiredv=False)
    priceCurrency = StringField(max_length=100, required=False)
    isBooked = BooleanField(default=False)
    date_modified = DateTimeField(default=datetime.datetime.utcnow)
