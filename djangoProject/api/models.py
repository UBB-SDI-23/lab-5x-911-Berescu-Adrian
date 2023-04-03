from django.db import models


class Director(models.Model):
    name = models.CharField(max_length=100)
    dob = models.DateField()
    country = models.CharField(max_length=50)
    films_directed = models.IntegerField(default=0)
    nominations = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class Movie(models.Model):
    title = models.CharField(max_length=100)
    year = models.IntegerField(default=0)
    director = models.ForeignKey(Director, on_delete=models.CASCADE, related_name='movie')
    genre = models.CharField(max_length=100)
    synopsis = models.TextField(blank=True, null=True)
    actors = models.ManyToManyField('Actor', through='MovieActor')

    def __str__(self):
        return self.title


class Actor(models.Model):
    name = models.CharField(max_length=100)
    dob = models.DateField()
    nationality = models.CharField(max_length=50)
    movies_acted = models.IntegerField(default=0)
    nominations = models.IntegerField(default=0)
    movies = models.ManyToManyField(Movie, through='MovieActor')

    def __str__(self):
        return self.name


class MovieActor(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    actor = models.ForeignKey(Actor, on_delete=models.CASCADE)
    character_name = models.CharField(max_length=50)
    role = models.CharField(max_length=50)

    class Meta:
        unique_together=[['movie', 'actor']]

    def __str__(self):
        return f"{self.movie.title} - {self.actor.name}"
