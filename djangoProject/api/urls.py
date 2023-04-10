from django.urls import path

from api.views.ActorViews import ActorList, ActorDetail
from api.views.DirectorViews import DirectorList, DirectorDetail, RenownedDirectors, DirectorsByAvgMovieYears
from api.views.MovieActorViews import MovieActorList, MovieActorDetail, ActorMovieBulkCreateView
from api.views.MovieViews import MovieList, MovieDetail, MoviesByAvgActorNominations

urlpatterns = [
    path('movie/', MovieList.as_view()),
    path('movie/<int:pk>/', MovieDetail.as_view()),
    path('director/', DirectorList.as_view()),
    path('director/<int:pk>/', DirectorDetail.as_view()),
    path('actor/', ActorList.as_view()),
    path('actor/<int:pk>/', ActorDetail.as_view()),
    path('director/renowned/', RenownedDirectors.as_view()),
    path('roles/', MovieActorList.as_view()),
    path('roles/<int:pk>/', MovieActorDetail.as_view()),
    # path('movie/<int:pk>/actor/', AddActorToMovie.as_view()),
    path('movie/avg/',MoviesByAvgActorNominations.as_view()),
    path('director/avg/',DirectorsByAvgMovieYears.as_view()),
    path('actor/<int:pk>/movies/', ActorMovieBulkCreateView.as_view()),
]