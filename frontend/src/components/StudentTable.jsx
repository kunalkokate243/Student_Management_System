import { useMemo, useState } from "react";
import api from "../api/api";

function StudentTable({
  students,
  fetchStudents,
  setEditingStudent,
}) {
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState(null);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const value = search.toLowerCase();

      return (
        student.first_name.toLowerCase().includes(value) ||
        student.last_name.toLowerCase().includes(value) ||
        student.email.toLowerCase().includes(value) ||
        student.phone.toLowerCase().includes(value) ||
        student.course.toLowerCase().includes(value)
      );
    });
  }, [students, search]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      setLoadingId(id);

      await api.delete(`students/${id}/`);

      alert("Student Deleted Successfully");

      fetchStudents();
    } catch (error) {
      console.error(error);
      alert("Unable to delete student");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="card shadow">

      <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">

        <h4 className="mb-0">
          Student List
        </h4>

        <input
          type="text"
          className="form-control w-25"
          placeholder="Search Student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="card-body">

        <div className="table-responsive">

          <table className="table table-bordered table-hover align-middle">

            <thead className="table-primary">

              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Course</th>
                <th width="170">Action</th>
              </tr>

            </thead>

            <tbody>

              {filteredStudents.length === 0 ? (

                <tr>
                  <td
                    colSpan="7"
                    className="text-center text-muted"
                  >
                    No Students Found
                  </td>
                </tr>

              ) : (

                filteredStudents.map((student) => (

                  <tr key={student.id}>

                    <td>{student.id}</td>

                    <td>{student.first_name}</td>

                    <td>{student.last_name}</td>

                    <td>{student.email}</td>

                    <td>{student.phone}</td>

                    <td>{student.course}</td>

                    <td>

                      <div className="d-flex gap-2">

                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() =>
                            setEditingStudent(student)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          disabled={loadingId === student.id}
                          onClick={() =>
                            handleDelete(student.id)
                          }
                        >
                          {loadingId === student.id
                            ? "Deleting..."
                            : "Delete"}
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default StudentTable;