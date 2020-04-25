from locust import HttpLocust, TaskSet, task, between
import json
from random import randint

LOGIN_PATH = "/login"
REDIRECTION_URL = "http://18.197.151.94:8080/Urls/680c6"
URL_SHORTENER_PATH = "/Urls/shorten"
REGISTRATION_PATH = "http://18.197.151.94:8080/registration"

class UserBehaviour(TaskSet):
    def on_start(self):
        """ on_start is called when a Locust start before any task is scheduled """
        self.signup()
        self.signin()

    def signin(self):
        payload = {"email": self.email, "password": self.password}
        self.client.post(LOGIN_PATH, json=payload)

    def signup(self):
        self.email = "test" + str(randint(30, 100000)) + "@test.com"
        self.password = "test"
        payload = {"email": self.email, "password": self.password}
        self.client.post(REGISTRATION_PATH, json=payload)

    @task(1)
    def shorten(self):
        payload = {"_id": "null", "URL":"www.google.com", "hash":"", "userMail":"test@test.com", "date":"2020-04-23"}
        self.client.post(URL_SHORTENER_PATH, json=payload)

    @task(100)
    def redirect(self):
        self.client.get(REDIRECTION_URL)

    email = ''
    password = ''


class WebsiteUser(HttpLocust):
    task_set = UserBehaviour
    wait_time = between(5, 9)