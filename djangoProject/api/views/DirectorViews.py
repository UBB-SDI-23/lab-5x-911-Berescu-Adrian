from django.db.models import Avg, OuterRef, Count
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from api.models import Movie, Director, Actor, MovieActor
from api.serializers import MovieSerializer, DirectorSerializer, ActorSerializer, \
    MovieWithDirSerializer, DirectorWithoutMovieSerializer, MovieActorSerializer


class DirectorList(generics.ListCreateAPIView):
    serializer_class = DirectorWithoutMovieSerializer
    queryset = Director.objects.all()


class DirectorDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DirectorSerializer
    queryset = Director.objects.all()

class RenownedDirectors(generics.ListCreateAPIView):
    serializer_class = DirectorWithoutMovieSerializer
    queryset = Director.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {'nominations': ["gt"]}


class DirectorsByAvgMovieYears(generics.ListAPIView):
    serializer_class = DirectorSerializer

    def get_queryset(self):
        query = Director.objects \
            .annotate(avg_movie_years=Avg('movie__year')) \
            .order_by('-avg_movie_years')
        return query
