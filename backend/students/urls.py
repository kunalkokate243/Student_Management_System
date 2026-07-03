from django.urls import path
from .views import (
    StudentListCreateAPIView,
    StudentRetrieveUpdateDeleteAPIView,
)

urlpatterns = [

    path(
        "students/",
        StudentListCreateAPIView.as_view(),
        name="students",
    ),

    path(
        "students/<int:pk>/",
        StudentRetrieveUpdateDeleteAPIView.as_view(),
        name="student",
    ),
]