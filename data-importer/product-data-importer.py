from bs4 import BeautifulSoup
from urllib.request import Request, urlopen
from mongoengine import *
from ProductDocument import Products
import datetime
import time

connect(
    db='adidas-products',
    username='adidas',
    password='adidas06',
    host='mongodb://adidas:adidas06@ds125525.mlab.com:25525/adidas-products'
)
headers = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) '
                         'AppleWebKit/537.11 (KHTML, like Gecko) '
                         'Chrome/23.0.1271.64 Safari/537.11',
           'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
           'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
           'Accept-Encoding': 'none',
           'Accept-Language': 'en-US,en;q=0.8',
           'Connection': 'keep-alive'}

user_agent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46'

url = "https://www.adidas.com.tr/tr/erkek-futbol"
req = Request(url, headers={'User-Agent': user_agent})


class ProductDocument:
    def __init__(self, name, img, title, price, price_currency, cursor):
        self._name = name
        self._price = price
        self._img = img
        self._title = title
        self._price_currency = price_currency
        self._cursor = cursor

    def name(self):
        return self._name

    def price(self):
        return self._price

    def img(self):
        return self._img

    def title(self):
        return self._title

    def price_currency(self):
        return self._price_currency

    def cursor(self):
        return self._cursor


def match_class(target):
    target = target.split()

    def do_match(tag):
        try:
            classes = dict(tag.attrs)["class"]
        except KeyError:
            classes = ""
        classes = classes.split()
        return all(c in classes for c in target)

    return do_match


html = urlopen(req).read()
soup = BeautifulSoup(html, 'html.parser')
matches = soup.findAll('div', attrs={'class': 'product-tile'})

product_list = []

for m in matches:
    product_name_matches = m.findAll('a', attrs={'class': 'product-link'})
    product_title_matches = m.findAll('span', attrs={'class': 'title'})
    product_price_matches = m.findAll('div', attrs={'class': 'price'})
    product_price_currency_matches = m.findAll(
        'span', attrs={'class': 'currency-sign'})
    product_image_matches = m.findAll(
        'a', attrs={'class': 'product-images-js'})

    for i in range(len(product_image_matches)):
        name = product_name_matches[i]['data-productname']
        title = product_title_matches[i].text
        price = product_price_matches[i].span.text
        price_currency = product_price_currency_matches[i].text
        img = product_image_matches[i].img['data-original']
        cursor = int(time.time())
        p = ProductDocument(name, img, title, price, price_currency, cursor)
        product_list.append(p)

    for product in product_list:
        pd = Products(
            name=product.name(),
            title=product.title(),
            imageUri=product.img(),
            price=product.price(),
            cursor=product.cursor(),
            priceCurrency=product.price_currency()
        )
        pd.save()

        output = "| Product Name: {0}" \
                 " Product Price: {1}" \
                 " Product Price Currency {2}" \
            " |".format(product.name(), product.price(),
                        product.price_currency())
        banner = '+' + '-' * (len(output) - 2) + '+'
        border = '|' + ' ' * (len(output) - 2) + '|'
        lines = [banner, border, output, border, banner]
        card = '\n'.join(lines)
        print(card)
