import json
import pika
import django
from sys import path
print(path)
from os import environ

path.append('/home/ayyoub/Desktop/ms/ms-soumission')
print(path)
environ.setdefault('DJANGO_SETTINGS_MODULE', 'ms_soumission.settings') 
django.setup()
from soumissionnaire.models import Offre, Lot

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost', heartbeat=600, blocked_connection_timeout=300))
channel = connection.channel()
channel.queue_declare(queue='hafsamanel')

def callback(ch, method, properties, body):
    print("Recieved offre/lot")
    print(body)
    data = json.loads(body)
    print(data)

    if data['propertie'] == 'postoffre':
        x = data['message']['dDay'].rsplit("T")
        x = x[0]
        offre = Offre.objects.create(mongoid=data['message']['_id'], d_Day = x, name = data['message']['name'])
        offre.save()
        print("offre created")
    
    elif data['propertie'] == 'deleteoffre':
        offre = Offre.objects.get(mongoid = data['message'])
        print(offre)
        offre.delete()
        print("offre deleted")

    elif data['propertie'] == 'patchoffre':
        offre = Offre.objects.get(mongoid=data['message']['_id'])
        offre.name = data['message']['name'],
        offre.d_Day = data['message']['dDay'].rsplit("T")[0]
        offre.save()
        print("offre updated")

    elif data['propertie'] == 'postlot':
        off = Offre.objects.get(mongoid = data['message']['offer'])
        lot = Lot.objects.create(mongoid=data['message']['_id'], offre = off)
        lot.save()
        print("lot created")

    elif data['propertie'] == 'deletelot':
        lot = Lot.objects.get(mongoid = data['message']['_id'])
        print(lot)
        lot.delete()
        print("lot deleted")

channel.basic_consume(queue='hafsamanel', on_message_callback=callback, auto_ack=True)
print("Started Consuming...")
channel.start_consuming()
