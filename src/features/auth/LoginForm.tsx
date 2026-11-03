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
            localStorage.setItem('venueManager', String(result.data.venueManager === true));
        } catch (err) {
            console.error('LoginPage failed', err);
            toast.error('Login failed. Please try again.');
        }
    };

    return (
        <div className='flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-10'>
            <div className='card w-full max-w-md p-6 sm:p-10'>
                <h1 className='page-heading'>Welcome back</h1>
                <p className='mt-1 mb-8 text-base text-graphite'>Please enter your details to sign in</p>
                <form
                    id='login-form'
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex w-full flex-col'>
                    <label className='label' htmlFor='email'>Email</label>
                    <div className='relative mb-5'>
                        <Mail
                            size={20}
                            className='pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-placeholder'
                        />
                        <input
                            id='email'
                            {...register('email', {
                                required: 'You need to enter your email',
                                pattern: {
                                    value: /^[^\s@]+@stud\.noroff\.no$/,
                                    message: 'Email need to end with @stud.noroff.no'
                                }
                            })}
                            placeholder='Enter your email'
                            className='input pl-11'
                        />
                    </div>

                    {errors.email && (
                        <p className='-mt-3 mb-4 text-sm text-red-600'>{errors.email.message}</p>
                    )}

                    <label className='label' htmlFor='password'>Password</label>
                    <div className='relative mb-5'>
                        <Lock
                            size={20}
                            className='pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-placeholder'
                        />
                        <input
                            id='password'
                            {...register('password', {
                                required: 'You need to enter a password',
                                minLength: {
                                    value: 8,
                                    message: 'Password need to be at leat 8 characters'
                                }
                            })}
                            type='password'
                            placeholder='Enter your password'
                            className='input pl-11'
                        />
                    </div>

                    {errors.password && (
                        <p className='-mt-3 mb-4 text-sm text-red-600'>{errors.password.message}</p>
                    )}

                    <button
                        type='submit'
                        className='btn-primary mt-2 w-full py-3'
                    >
                        Sign in
                    </button>

                    <p className='mt-6 text-center text-graphite'>
                        New to Holidaze?{' '}
                        <Link to='/register' className='link font-semibold'>Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
