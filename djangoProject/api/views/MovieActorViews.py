from django.db.models import Avg, OuterRef, Count
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from api.models import Movie, Director, Actor, MovieActor
from api.serializers import MovieSerializer, DirectorSerializer, ActorSerializer, \
    MovieWithDirSerializer, DirectorWithoutMovieSerializer, MovieActorSerializer


class MovieActorList(generics.ListCreateAPIView):
    serializer_class = MovieActorSerializer
    queryset = MovieActor.objects.all()


class MovieActorDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MovieActorSerializer
    queryset = MovieActor.objects.all()



class ActorMovieBulkCreateView(generics.CreateAPIView):
    queryset = Actor.objects.all()
    serializer_class = MovieSerializer

    def post(self, request, *args, **kwargs):
        actor_id = self.kwargs.get('pk')
        actor = Actor.objects.get(id=actor_id)



        if not actor:
            return Response({'error': 'Actor not found'}, status=status.HTTP_404_NOT_FOUND)

        movies_data = request.data.get('movies', [])

        print()

        if not movies_data:
            return Response({'error': 'No movies provided'}, status=status.HTTP_400_BAD_REQUEST)

        movies = []

        for movie_data in movies_data:
            movie_serializer = MovieSerializer(data=movie_data)

            if not movie_serializer.is_valid():
                return Response(movie_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            movie = Movie(**movie_serializer.validated_data)
            movie_actor = MovieActor(actor=actor, movie=movie)
            movies.append(movie_actor)

        MovieActor.objects.bulk_create(movies)

        return Response({'message': 'Movies added to actor successfully'}, status=status.HTTP_201_CREATED)