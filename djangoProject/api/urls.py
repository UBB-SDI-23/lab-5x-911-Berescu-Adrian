from django.urls import path
from .views import MovieList, MovieDetail, DirectorList, DirectorDetail, ActorList, ActorDetail, RenownedDirectors, \
    MovieActorList, MovieActorDetail, MoviesByAvgActorNominations, DirectorsByAvgMovieYears, ActorMovieBulkCreateView

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