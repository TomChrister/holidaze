import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { loginUser } from '../../api/auth.tsx';
import { LoginFormData } from '../../types/auth';

export default function LoginForm() {
    const { register, handleSubmit } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        try {
            const result = await loginUser(data);
            localStorage.setItem('name', result.data.name);
            localStorage.setItem('accessToken', result.data.accessToken);
            window.location.href = '/';
        } catch (err) {
            console.error('LoginPage failed', err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit(onSubmit)}
                  className='mx-auto max-w-md rounded-xl bg-white p-4 shadow space-y-4'>
                <label>Email</label>
                <input
                    {...register('email')}
                    placeholder='Enter your email'
                    className='w-full rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <label>Password</label>
                <input
                    {...register('password')}
                    type='password'
                    placeholder='Enter your password'
                    className='w-full rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <button
                    type='submit'
                    className='w-full cursor-pointer rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700'
                >
                    Login
                </button>

                <p className='flex justify-center'>Or</p>

                <div className='flex justify-center'>
                    <div>
                        Go to <Link to='/register' className='underline cursor-pointer'>register</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
