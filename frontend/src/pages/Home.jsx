import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";

function Home() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all students
  const fetchStudents = async () => {
    try {
      setLoading(true);

      const response = await api.get("students/");

      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
      alert("Failed to fetch students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container py-4">

        <div className="row">

          <div className="col-lg-5 mb-4">
            <StudentForm
              fetchStudents={fetchStudents}
              editingStudent={editingStudent}
              setEditingStudent={setEditingStudent}
            />
          </div>

          <div className="col-lg-7">

            {loading ? (
              <div className="card shadow">
                <div className="card-body text-center py-5">
                  <div
                    className="spinner-border text-primary"
                    role="status"
                  >
                    <span className="visually-hidden">
                      Loading...
                    </span>
                  </div>

                  <h5 className="mt-3">
                    Loading Students...
                  </h5>
                </div>
              </div>
            ) : (
              <StudentTable
                students={students}
                fetchStudents={fetchStudents}
                setEditingStudent={setEditingStudent}
              />
            )}

          </div>

        </div>

      </div>
    </>
  );
}

export default Home;