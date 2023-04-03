from unittest import TestCase
from api.models import Director
from rest_framework.test import APIRequestFactory, APITestCase
from api.views import DirectorList


class DirectorListViewTest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        no_directors=20
        for dir_id in range(no_directors):
            Director.objects.create(name=f"director {dir_id}", dob=f"1968-8-{dir_id+1}",country="united states",
                                    films_directed=dir_id,nominations=dir_id)

    def test_filter_url_exists(self):
        response=self.client.get("http://127.0.0.1:8000/api/director/renowned/?nominations__gt=10")
        self.assertEqual(response.status_code, 200)

    def test_filter_count_correctly_returned(self):
        response=self.client.get("http://127.0.0.1:8000/api/director/renowned/?nominations__gt=10")
        self.assertEqual(len(response.data), 9)

    def test_avg_url_exists(self):
        response = self.client.get("http://127.0.0.1:8000/api/director/avg/")
        self.assertEqual(response.status_code, 200)

    def test_avg_count_correctly_returned(self):
        response = self.client.get("http://127.0.0.1:8000/api/director/avg/")
        self.assertEqual(len(response.data), 20)
