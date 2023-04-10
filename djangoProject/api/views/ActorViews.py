from django.db.models import Avg, OuterRef, Count
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from api.models import Movie, Director, Actor, MovieActor
from api.serializers import MovieSerializer, DirectorSerializer, ActorSerializer, \
    MovieWithDirSerializer, DirectorWithoutMovieSerializer, MovieActorSerializer


class ActorList(generics.ListCreateAPIView):
    serializer_class = ActorSerializer
    queryset = Actor.objects.all()


class ActorDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ActorSerializer
    queryset = Actor.objects.all()