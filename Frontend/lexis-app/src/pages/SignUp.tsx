import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import React, { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import GoogleButton from "../components/GoogleButton";
import { handleSignUp, sendEmailOtp } from "../services/axios";
import { validateEmail, validatePassword, validateUsername } from "../utils/validation";
const SignUp: FC = () => {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPass, setConfirmPass] = useState<string>("");
    const [errors, setErrors] = useState<{
        username?: string;
        email?: string;
        password?: string;
        confirmPass?: string;
        general?: string;
    }>({});

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setErrors({});

        const usernameError = validateUsername(username);
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password, confirmPass);

        const hasErrors = usernameError || emailError || passwordError;

        if (usernameError) {
            setErrors((prev) => ({ ...prev, username: usernameError }));
        }

        if (emailError) {
            setErrors((prev) => ({ ...prev, email: emailError }));
        }

        if (passwordError) {
            setErrors((prev) => ({ ...prev, password: passwordError }));
        }
        if (hasErrors) return;
        try {
            const response = await handleSignUp(username, email, password, confirmPass, apiUrl);
            if (response.data.success) {
                sessionStorage.setItem("username", username);
                sessionStorage.setItem("email", email);
                sessionStorage.setItem("password", password);
                sendEmailOtp(email, apiUrl);
                navigate("/otp");
            }
        } catch (error: any) {
            if (error.response) {
                const { data, status } = error.response;
                if (status === 500) {
                    setErrors({ general: "Server is under maintenance. Please try again later." });
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        username: data.user || "",
                        email: data.email || "",
                        password: data.password || "",
                        general: data.invalid || "",
                    }));
                }
            }
        }
    };

    useEffect(() => {
        document.title = "Sign Up | Lexscribe";
    }, []);

    return (
        <section className="bg-light dark:bg-gray-900 min-h-screen flex justify-center items-center pt-8">
            <div className="w-full max-w-md h-auto mb-6 bg-white rounded-xl shadow-lg shadow-cyan-600/50 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-white">
                        Sign Up
                    </h1>
                    {errors.general && (
                        <p className="text-red-500 text-center">{errors.general}</p>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="username"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your username
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter your username"
                                required
                            />
                            {errors.username && (
                                <p className="text-red-500">{errors.username}</p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter your email"
                                required
                            />
                            {errors.email && (
                                <p className="text-red-500">{errors.email}</p>
                            )}
                        </div>
                        <div className="mb-4 relative">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your password
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    name="password"
                                    value={password}
                                    onChange={(e: any) => setPassword(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10 h-12"
                                    placeholder="Enter your password"
                                    required
                                />
                                <FontAwesomeIcon
                                    icon={passwordVisible ? faEyeSlash : faEye}
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                />
                            </div>
                            {errors.password && (
                                <p className="text-red-500">{errors.password}</p>
                            )}
                        </div>
                        <div className="mb-4 relative">
                            <label
                                htmlFor="confirmPass"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Confirm password
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    name="confirmPass"
                                    value={confirmPass}
                                    onChange={(e: any) => setConfirmPass(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Confirm your password"
                                    required
                                />
                                <FontAwesomeIcon
                                    icon={passwordVisible ? faEyeSlash : faEye}
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                            {errors.confirmPass && (
                                <p className="text-red-500">{errors.confirmPass}</p>
                            )}
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            animate={{ type: "spring", stiffness: 400 }}
                            type="submit"
                            className="w-full text-white bg-sky-500 hover:bg-sky-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Sign Up
                        </motion.button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                            Or Via
                        </p>
                        <div className="flex justify-center space-x-2">
                            <GoogleButton />
                        </div>
                        <p className="text-md font-light text-gray-500 dark:text-gray-400 text-center">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-medium text-sky-500 hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SignUp;