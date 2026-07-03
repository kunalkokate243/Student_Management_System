from django.contrib import admin
from .models import Student


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "first_name",
        "last_name",
        "email",
        "phone",
        "course",
        "created_at",
    )

    search_fields = (
        "first_name",
        "last_name",
        "email",
        "course",
    )

    list_filter = (
        "course",
        "created_at",
    )

    ordering = ("-id",)