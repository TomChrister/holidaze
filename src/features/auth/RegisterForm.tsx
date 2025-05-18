import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../api/auth';
import { RegisterFormData } from '../../types/auth';
import { Link } from 'react-router-dom';
import { Switch } from '@headlessui/react';
import toast from 'react-hot-toast';
import { HelpCircle, Lock, Mail, User } from 'lucide-react';

export default function RegisterForm() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<RegisterFormData>();
    const [venueToggle, setVenueToggle] = useState(false);

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
        <div className="flex h-screen items-center justify-center p-4">
            <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-6 py-12 shadow-md space-y-4">
                <h2 className='text-2xl font-semibold'>Create an account</h2>
                <p className='text-gray-400'>Please enter your details to register</p>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='mx-auto flex w-full max-w-md px-4 flex-col'>
                    <label className='mb-1'>Name</label>
                    <div className='relative'>
                        <User size={20} className='absolute top-1/2 left-3 -translate-y-2/2 text-gray-400' />
                        <input
                            {...register('name', {
                                required: 'Name is required',
                                pattern: {
                                    value: /^\S+$/,
                                    message: 'No spaces allowed'
                                }
                            })}
                            placeholder='Enter your name'
                            className='mt-1 mb-6 w-full rounded-lg border border-gray-300 px-4 py-3 pl-12 focus:ring-brand-primary focus:outline-none focus:ring-2'
                        />
                    </div>
                    {errors.name && (
                        <p className='mb-2 text-sm text-red-500'>{errors.name.message}</p>
                    )}

                    <label className='mb-1'>Email</label>
                    <div className='relative'>
                        <Mail size={20} className='absolute top-1/2 left-3 -translate-y-2/2 text-gray-400' />
                        <input
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@stud\.noroff\.no$/,
                                    message: 'Must end with @stud.noroff.no'
                                }
                            })}
                            placeholder='yourmail@stud.noroff.no'
                            className='mt-1 mb-6 w-full rounded-lg border border-gray-300 px-4 py-3 pl-12 focus:ring-brand-primary focus:outline-none focus:ring-2'
                        />
                    </div>
                    {errors.email && (
                        <p className='mb-4 text-sm text-red-500'>{errors.email.message}</p>
                    )}

                    <label className='mb-1'>Password</label>
                    <div className='relative'>
                        <Lock size={20} className='absolute top-1/2 left-3 -translate-y-2/2 text-gray-400' />
                        <input
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'At least 8 characters'
                                }
                            })}
                            type='password'
                            placeholder='Enter your password'
                            className='mt-1 mb-6 w-full rounded-lg border border-gray-300 px-4 py-3 pl-12 focus:ring-brand-primary focus:outline-none focus:ring-2'
                        />
                    </div>
                    {errors.password && (
                        <p className='mb-6 text-sm text-red-500'>{errors.password.message}</p>
                    )}

                    <div className='flex items-center gap-2 pb-6'>
                        <Switch
                            checked={venueToggle}
                            onChange={(checked) => {
                                setVenueToggle(checked)
                                setValue('venueManager', checked)
                            }}
                            className={`${venueToggle ? 'bg-brand-primary' : 'bg-gray-300'}
                            relative inline-flex h-6 w-11 items-center cursor-pointer rounded-full transition`}
                        >

                        <span className={`${venueToggle ? 'translate-x-6' : 'translate-x-1'}
                              inline-block h-4 w-4 transform rounded-full bg-white transition`}
                        />
                        </Switch>

                        <span className='flex items-center gap-1 text-gray-800'>
                            I want to register as a venue manager
                            <span className='relative group'>
                                <HelpCircle
                                    size={16}
                                    className='cursor-pointer text-gray-400 hover:text-gray-600'
                                />
                                <div className='absolute bottom-full left-1/2 -mb-2 hidden w-40 -translate-x-1/2 whitespace-normal rounded bg-gray-700 p-2 text-xs text-white group-hover:block'>
                                    A venue manager can create and manage venues and bookings.
                                </div>
                            </span>
                        </span>
                    </div>

                    <button
                        type='submit'
                        className='mb-6 w-full cursor-pointer rounded py-3 text-white transition bg-brand-primary hover:opacity-90'
                    >
                        Register
                    </button>

                    <div className='text-center'>
                        Back to{' '}
                        <Link to='/login' className='cursor-pointer pl-1 text-brand-primary hover:underline'>
                            login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}