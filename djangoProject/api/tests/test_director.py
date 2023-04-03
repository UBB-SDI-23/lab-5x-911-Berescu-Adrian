from django.test import TestCase
from api.models import Director


class DirectorModelTestcase(TestCase):
    @classmethod
    def setUpTestData(cls):
        Director.objects.create(name="nolan", dob="1967-3-25", country="United States", films_directed=20, nominations=3)

    def test_string_method(self):
        director = Director.objects.get(films_directed=20)
        expected = "nolan"
        self.assertEqual(str(director), expected)
