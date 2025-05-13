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
        <div className='flex h-screen items-center justify-center p-4'>
            <div className='flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-6 py-12 shadow-md space-y-4'>
                <h2 className='text-2xl font-semibold'>Welcome back</h2>
                <p className='text-gray-400'>Please enter your details to sign in</p>
                <form onSubmit={handleSubmit(onSubmit)}
                      className='mx-auto flex w-full max-w-md px-4 flex-col'>
                    <label className='mb-1'>Email</label>
                    <div className='relative'>
                        <Mail
                            size={20}
                            className='absolute top-1/2 left-3 text-gray-400 -translate-y-2/2'
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
                            className='mt-1 mb-6 w-full rounded-lg border border-gray-300 px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    {errors.email && (
                        <p className='mb-2 text-sm text-red-500'>{errors.email.message}</p>
                    )}

                    <label className='mb-1'>Password</label>
                    <div className='relative'>
                        <Lock
                            size={20}
                            className='absolute top-1/2 left-3 text-gray-400 -translate-y-2/2'
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
                            className='mt-1 mb-6 w-full rounded-lg border border-gray-300 px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    {errors.password && (
                        <p className='mb-4 text-sm text-red-500'>{errors.password.message}</p>
                    )}

                    <button
                        type='submit'
                        className='mb-6 w-full cursor-pointer rounded py-3 text-white transition bg-brand-primary hover:opacity-90'
                    >
                        Sign in
                    </button>

                    <p className='mb-6 flex justify-center'>or</p>

                    <div className='flex justify-center'>
                        <div>
                            Go to
                            <Link to='/register' className='cursor-pointer text-brand-primary pl-1.5 hover:underline'>
                                register
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
