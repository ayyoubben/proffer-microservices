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
from soumissionnaire.models import Soumissionnaire

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost', heartbeat=600, blocked_connection_timeout=300))
channel = connection.channel()
channel.queue_declare(queue='manelayyoub')

def callback(ch, method, properties, body):
    print("Recieved user")
    print(body)
    data = json.loads(body)
    print(data)

    if data['propertie'] == 'post':
        soumissionnaire = Soumissionnaire.objects.create(mongoid=str(data['message']['_id']), is_valid = True, email = data['message']['email'])
        soumissionnaire.save()
        print("soumissionnaire created")
    
    elif data['propertie'] == 'delete':
        
        print(data)
        soumissionnaire = Soumissionnaire.objects.get(mongoid = data['message'])
        soumissionnaire.delete()
        print("soumissionnaire deleted")
channel.basic_consume(queue='manelayyoub', on_message_callback=callback, auto_ack=True)
print("Started Consuming...")
channel.start_consuming()
