import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { loginUser } from '../../api/auth.tsx';
import { LoginFormData } from '../../types/auth';
import { Lock, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        try {
            const result = await loginUser(data);
            toast.success('Login successful! Redirecting..');
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
            localStorage.setItem('name', result.data.name);
            localStorage.setItem('accessToken', result.data.accessToken);
        } catch (err) {
            console.error('LoginPage failed', err);
            toast.error('Login failed. Please try again.');
        }
    };

    return (
        <div className='h-screen flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center bg-white p-6 py-12 border border-gray-200 rounded-lg shadow-md space-y-4'>
                <h2 className='text-2xl font-semibold'>Welcome back</h2>
                <p className='text-gray-400'>Please enter your details to sign in</p>
                <form onSubmit={handleSubmit(onSubmit)}
                      className='mx-auto w-96 flex flex-col'>
                    <label>Email</label>
                    <div className='relative'>
                        <Mail
                            size={20}
                            className='absolute left-3 top-1/2 -translate-y-2/2 text-gray-400'
                        />
                        <input
                            {...register('email', {
                                required: 'You need to enter your email',
                                pattern: {
                                    value: /^[^\s@]+@stud\.noroff\.no$/,
                                    message: 'Email need to end with @stud.noroff.no'
                                }
                            })}
                            placeholder='Enter your email'
                            className='w-full rounded-lg border border-gray-300 px-4 pl-12 py-3 mb-6 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    {errors.email && (
                        <p className='text-red-500 text-sm mb-2'>{errors.email.message}</p>
                    )}

                    <label>Password</label>
                    <div className='relative'>
                        <Lock
                            size={20}
                            className='absolute left-3 top-1/2 -translate-y-2/2 text-gray-400'
                        />
                        <input
                            {...register('password', {
                                required: 'You need to enter a password',
                                minLength: {
                                    value: 8,
                                    message: 'Password need to be at leat 8 characters'
                                }
                            })}
                            type='password'
                            placeholder='Enter your password'
                            className='w-full rounded-lg border border-gray-300 px-4 pl-12 py-3 mb-6 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    {errors.password && (
                        <p className='text-red-500 text-sm mb-4'>{errors.password.message}</p>
                    )}

                    <button
                        type='submit'
                        className='w-full cursor-pointer rounded mb-6 bg-brand-primary py-3 text-white transition hover:opacity-90'
                    >
                        Sign in
                    </button>

                    <p className='flex justify-center mb-6'>or</p>

                    <div className='flex justify-center'>
                        <div>
                            Go to
                            <Link to='/register' className='text-brand-primary cursor-pointer pl-1.5 hover:underline'>
                                register
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
