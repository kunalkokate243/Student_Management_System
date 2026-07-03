import { useEffect, useState } from "react";
import api from "../api/api";

function StudentForm({
  fetchStudents,
  editingStudent,
  setEditingStudent,
}) {
  const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    course: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        first_name: editingStudent.first_name || "",
        last_name: editingStudent.last_name || "",
        email: editingStudent.email || "",
        phone: editingStudent.phone || "",
        course: editingStudent.course || "",
      });
    } else {
      setFormData(initialState);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    if (!formData.first_name.trim()) {
      alert("First Name is required");
      return false;
    }

    if (!formData.last_name.trim()) {
      alert("Last Name is required");
      return false;
    }

    if (!formData.email.trim()) {
      alert("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      alert("Enter a valid email");
      return false;
    }

    if (!formData.phone.trim()) {
      alert("Phone is required");
      return false;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      alert("Phone must be exactly 10 digits");
      return false;
    }

    if (!formData.course.trim()) {
      alert("Course is required");
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setFormData(initialState);
    setEditingStudent(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      if (editingStudent) {
        await api.put(
          `students/${editingStudent.id}/`,
          formData
        );

        alert("Student Updated Successfully");
      } else {
        await api.post(
          "students/",
          formData
        );

        alert("Student Added Successfully");
      }

      fetchStudents();
      resetForm();
    } catch (error) {
      console.error(error);

      if (error.response?.data) {
        console.log(error.response.data);
      }

      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow mb-4">

      <div className="card-header bg-primary text-white">
        <h4 className="mb-0">
          {editingStudent
            ? "Update Student"
            : "Register Student"}
        </h4>
      </div>

      <div className="card-body">

        <form onSubmit={handleSubmit}>

          <div className="row">

            <div className="col-md-6 mb-3">
              <label className="form-label">
                First Name
              </label>

              <input
                type="text"
                className="form-control"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Enter First Name"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Last Name
              </label>

              <input
                type="text"
                className="form-control"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Enter Last Name"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Email
              </label>

              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Phone
              </label>

              <input
                type="text"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter Phone Number"
              />
            </div>

            <div className="col-md-12 mb-3">
              <label className="form-label">
                Course
              </label>

              <input
                type="text"
                className="form-control"
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="Enter Course"
              />
            </div>

          </div>

          <div className="d-flex gap-2">

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading
                ? "Please Wait..."
                : editingStudent
                ? "Update Student"
                : "Register Student"}
            </button>

            {editingStudent && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}

          </div>

        </form>

      </div>

    </div>
  );
}

export default StudentForm;