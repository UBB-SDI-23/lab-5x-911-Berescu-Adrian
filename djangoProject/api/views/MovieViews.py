from django.db.models import Avg, OuterRef, Count
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from api.models import Movie, Director, Actor, MovieActor
from api.serializers import MovieSerializer, DirectorSerializer, ActorSerializer, \
    MovieWithDirSerializer, DirectorWithoutMovieSerializer, MovieActorSerializer


class MovieList(generics.ListCreateAPIView):
    serializer_class = MovieSerializer
    queryset = Movie.objects.all()


class MovieDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MovieWithDirSerializer
    queryset = Movie.objects.all()


class MoviesByAvgActorNominations(generics.ListAPIView):
    serializer_class = MovieSerializer

    def get_queryset(self):
        query=Movie.objects\
            .annotate(avg_noms=Avg('movieactor__actor__nominations'))\
            .order_by('avg_noms')
        return query