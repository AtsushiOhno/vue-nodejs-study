import requests
import random
import time
import json

"""
温度、湿度、気圧センサーを模擬して、
APIへ向けて観測データ(ランダム生成)をPOSTし続ける
"""

api_url = "http://nodejs-backend:8080/api/v1/roomdata"
send_interval = 1

def post_data2api():
    add_point = round(random.random(), 1)
    room_temp = random.randrange(26, 30) + add_point
    room_humid = random.randrange(40, 60) + add_point
    room_pressure = random.randrange(990, 1020) + add_point

    post_data = {
        "time": int(time.time()),
        "room_temp": room_temp,
        "room_humid": room_humid,
        "room_pressure": room_pressure
    }

    print(post_data)

    try:
        response = requests.post(
            api_url,
            data=json.dumps(post_data),
            headers={'Content-Type': 'application/json'}
        )
    except requests.exceptions.ConnectionError:
        print("ConnectionError. Retry.")


while(1):
    post_data2api()    
    time.sleep(send_interval)
