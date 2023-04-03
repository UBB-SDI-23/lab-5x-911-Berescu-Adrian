from rest_framework import serializers
from .models import Movie, Director, Actor, MovieActor


class MovieSerializer(serializers.ModelSerializer):
    avg_noms = serializers.FloatField(read_only=True)

    # num_other_movies=serializers.IntegerField(read_only=True)
    class Meta:
        model = Movie
        # depth = 1 use that when we want the whole object
        fields = ('id','title','year','genre','synopsis','director','avg_noms')





class DirectorSerializer(serializers.ModelSerializer):
    movie = MovieSerializer(many=True, read_only=True)
    avg_movie_years = serializers.FloatField(read_only=True)
    class Meta:
        model = Director
        fields = ('id','name','dob','country','films_directed','nominations','movie','avg_movie_years')

class DirectorWithoutMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Director
        fields = ('id','name','dob','country','films_directed','nominations')


class MovieWithDirSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        depth = 1
        fields=('__all__')



class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = ('__all__')


class MovieActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieActor
        fields = ('__all__')

    def validate_movie_id(self, value):
        mov=Movie.objects.filter(id=value)
        if not mov.exists():
            raise serializers.ValidationError("movie doesn't exist")
        return value

    def validate_actor_id(self, value):
        act=Actor.objects.filter(id=value)
        if not act.exists():
            raise serializers.ValidationError("actor doesn't exist")
        return value

    def validate_role(self, value):
        if value != "Main" or value != "Supporting":
            raise serializers.ValidationError("the role can only be 'Main' or 'Supporting'")
        return value

#
# class AddActorToMovieSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Movie
#         fields = ('__all__')