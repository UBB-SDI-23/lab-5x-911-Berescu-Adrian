# Generated by Django 4.1.7 on 2023-03-20 06:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_actor_movies_movie_actors_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='actor',
            name='movies',
        ),
        migrations.RemoveField(
            model_name='movie',
            name='actors',
        ),
    ]
