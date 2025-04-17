import { useForm } from "react-hook-form";
import { loginUser } from "../../api/auth.tsx";
import { LoginFormData } from "../../types/auth";

export default function LoginForm() {
    const { register, handleSubmit } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        try {
            const result = await loginUser(data);
            localStorage.setItem('name', result.data.name);
            localStorage.setItem('accessToken', result.data.accessToken);
            window.location.href = "/";
        } catch (err) {
            console.error('Login failed', err);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-md rounded-xl bg-white p-4 shadow space-y-4">
            <input
                {...register("email")}
                placeholder="Email"
                className="w-full rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="w-full rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="w-full cursor-pointer rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700"
            >
                Login
            </button>
        </form>
    );
}
