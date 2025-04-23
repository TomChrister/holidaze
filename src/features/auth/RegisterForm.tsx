import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../api/auth';
import { RegisterFormData } from '../../types/auth';
import { Link } from 'react-router-dom';
import { Switch } from '@headlessui/react';
import toast from 'react-hot-toast';

export default function RegisterForm() {
    const { register, handleSubmit, setValue } = useForm<RegisterFormData>();
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
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 max-w-md mx-auto p-4 bg-white rounded-xl shadow'>
            <input {...register('name')} placeholder='Name' className='input'/>
            <input {...register('email')} placeholder='Email' className='input'/>
            <input {...register('password')} type='password' placeholder='Password' className='input'/>

            <div className='flex items-center gap-3'>
                <Switch
                    checked={venueToggle}
                    onChange={(checked) => {
                        setVenueToggle(checked);
                        setValue('venueManager', checked);
                    }}
                    className={`${
                        venueToggle ? 'bg-blue-600' : 'bg-gray-300'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                >
                    <span
                        className={`${
                            venueToggle ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                </Switch>
                <span>I want to list venues (Venue Manager)</span>
            </div>

            <button type='submit' className='btn'>Register</button>

            <div className='text-center'>
                Back to <Link to='/login' className='underline'>login</Link>
            </div>
        </form>
    );
}