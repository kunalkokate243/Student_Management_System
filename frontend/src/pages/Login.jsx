import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        // Clear error when user types
        if (error) setError("");
    };

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const validate = () => {
        if (!formData.username.trim()) {
            setError("Username is required");
            return false;
        }
        if (!formData.password.trim()) {
            setError("Password is required");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            setLoading(true);
            setError("");

            const response = await api.post("auth/login/", formData);

            // Save tokens
            localStorage.setItem("accessToken", response.data.access);
            localStorage.setItem("refreshToken", response.data.refresh);

            // Save user info (if returned from API)
            if (response.data.user) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
            } else {
                // Optionally, you can store username or other data
                localStorage.setItem("user", JSON.stringify({ username: formData.username }));
            }

            // Navigate to home
            navigate("/home");
        } catch (err) {
            console.log("Full Error:", err);
            console.log("Response:", err.response);
            console.log("Data:", err.response?.data);

            setError(JSON.stringify(err.response?.data || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="col-md-5 col-lg-4">
                <div className="card shadow-lg border-0 rounded-4">
                    <div className="card-header bg-primary text-white text-center py-3 rounded-top-4">
                        <h4 className="mb-0">🔐 Login</h4>
                    </div>
                    <div className="card-body p-4">
                        <form onSubmit={handleSubmit}>
                            {/* Username */}
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label fw-semibold">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Enter username"
                                    autoFocus
                                />
                            </div>

                            {/* Password with Show/Hide */}
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label fw-semibold">
                                    Password
                                </label>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter password"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={toggleShowPassword}
                                        tabIndex="-1"
                                    >
                                        {showPassword ? "🙈" : "👁️"}
                                    </button>
                                </div>
                            </div>

                            {/* Error message */}
                            {error && (
                                <div className="alert alert-danger py-2" role="alert">
                                    {error}
                                </div>
                            )}

                            {/* Submit Button with loading state */}
                            <button
                                type="submit"
                                className="btn btn-primary w-100 fw-bold"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                            aria-hidden="true"
                                        ></span>
                                        Logging in...
                                    </>
                                ) : (
                                    "Login"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;