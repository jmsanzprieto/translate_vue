from django.db import models

class Movie(models.Model):
    title_movie = models.CharField(max_length=50)
    gender_movie = models.CharField(max_length=50)
    year_movie = models.CharField(max_length=50)
    director_movie = models.CharField(max_length=50)

    def __str__(self):
        return self.title_movie
