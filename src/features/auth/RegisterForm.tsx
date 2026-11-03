import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../api/auth';
import { RegisterFormData } from '../../types/auth';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { HelpCircle, Lock, Mail, User } from 'lucide-react';

export default function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
    const [visible, setVisible] = useState(false);

    const onSubmit = async (data: RegisterFormData) => {
        try {
            await registerUser(data);

            toast.success('Registration successful! Redirecting to login...');
            setTimeout(() => {
                window.location.href = '/login';
            }, 1500);
        } catch (err) {
            console.error('Registration failed', err);
            toast.error('Registration failed. Please try again.');
        }
    };

    return (
        <div className='flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-10'>
            <div className='card w-full max-w-md p-6 sm:p-10'>
                <h1 className='page-heading'>Create an account</h1>
                <p className='mt-1 mb-8 text-base text-graphite'>Please enter your details to register</p>
                <form
                    id='register-form'
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex w-full flex-col'>
                    <label className='label' htmlFor='register-name'>Name</label>
                    <div className='relative mb-5'>
                        <User size={20} className='pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-placeholder'/>
                        <input
                            id='register-name'
                            {...register('name', {
                                required: 'Name is required',
                                pattern: {
                                    value: /^\S+$/,
                                    message: 'No spaces allowed'
                                }
                            })}
                            placeholder='Enter your name'
                            className='input pl-11'
                        />
                    </div>

                    {errors.name && (
                        <p className='-mt-3 mb-4 text-sm text-red-600'>{errors.name.message}</p>
                    )}

                    <label className='label' htmlFor='register-email'>Email</label>
                    <div className='relative mb-5'>
                        <Mail size={20} className='pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-placeholder'/>
                        <input
                            id='register-email'
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@stud\.noroff\.no$/,
                                    message: 'Must end with @stud.noroff.no'
                                }
                            })}
                            placeholder='yourmail@stud.noroff.no'
                            className='input pl-11'
                        />
                    </div>

                    {errors.email && (
                        <p className='-mt-3 mb-4 text-sm text-red-600'>{errors.email.message}</p>
                    )}

                    <label className='label' htmlFor='register-password'>Password</label>
                    <div className='relative mb-5'>
                        <Lock size={20} className='pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-placeholder'/>
                        <input
                            id='register-password'
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'At least 8 characters'
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

                    <div className='flex items-center gap-2 pb-6'>
                        <label htmlFor='register-venue-manager'
                               className='relative inline-block h-6 w-12 shrink-0 cursor-pointer'>
                            <input
                                id='register-venue-manager'
                                type='checkbox'
                                className='h-0 w-0 opacity-0 peer'
                                {...register('venueManager')}
                            />
                            <span
                                className='absolute inset-0 rounded-full bg-divider transition-colors peer-checked:bg-accent'/>
                            <span
                                className='absolute top-0 left-0 h-6 w-6 peer-checked:translate-x-full rounded-full bg-white shadow-sm ring-1 ring-divider transition-transform'/>
                        </label>

                        <span className='flex items-center gap-1 text-ink text-sm'>
                            <label htmlFor='register-venue-manager' className='cursor-pointer'>
                                I want to register as a venue manager
                            </label>
                            <span className='relative group' onClick={() => setVisible(!visible)}>
                                <HelpCircle
                                    size={16}
                                    className='cursor-pointer text-placeholder hover:text-graphite'
                                />
                                <div
                                    className={`absolute bottom-full left-1/2 -mb-2 w-32 -translate-x-2/2 whitespace-normal rounded-control bg-ink p-2 text-xs text-white
                                    ${visible ? 'block' : 'hidden'} group-hover:block`}
                                >
                                    Venue manager's can create and manage venues and bookings.
                                </div>
                            </span>
                        </span>
                    </div>

                    <button
                        type='submit'
                        className='btn-primary mt-2 w-full py-3'
                    >
                        Register
                    </button>

                    <p className='mt-6 text-center text-graphite'>
                        Already have an account?{' '}
                        <Link to='/login' className='link font-semibold'>Log in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}