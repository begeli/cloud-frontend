from locust import HttpLocust, TaskSet, task, between
import json

class UserBehaviour(TaskSet):
    def on_start(self):
        """ on_start is called when a Locust start before any task is scheduled """
        self.login()

    def login(self):
        self.client.post("/login", json.dumps({"email":"test@test.com", "password":"test"}))

    @task
    def profile(self):
        self.client.post("/Urls/shorten",
                         json.dumps({"_id": None, "URL":"www.google.com", "hash":"", "userMail":"test@test.com", "date":"2020-04-23"}),
                         {"content-type": "application/json", "content-type":"text/plain"}
                         )


class WebsiteUser(HttpLocust):
    task_set = UserBehaviour
    wait_time = between(5, 9)