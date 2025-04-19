import { useForm } from 'react-hook-form';
import { registerUser } from '../../api/auth';
import { RegisterFormData } from '../../types/auth';
import { Link } from 'react-router-dom';

export default function RegisterForm() {
    const { register, handleSubmit } = useForm<RegisterFormData>();

    const onSubmit = async (data: RegisterFormData) => {
        try {
            const result = await registerUser(data);
            localStorage.setItem('name', result.data.name);
            localStorage.setItem('accessToken', result.data.accessToken);
            window.location.href = '/';
        } catch (err) {
            console.error('Registration failed', err);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 max-w-md mx-auto p-4 bg-white rounded-xl shadow'>
            <input
                {...register('name')}
                placeholder='Name'
                className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
                {...register('email')}
                placeholder='Email'
                className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
                {...register('password')}
                type='password'
                placeholder='Password'
                className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input type='checkbox' {...register('venueManager', { value: true })} />
            I want to list venues (Venue Manager)
            <button
                type='submit'
                className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer'
            >
                Register
            </button>

            <div className='flex justify-center'>
                <div>
                    Back to <Link to='/login' className='underline cursor-pointer'>login</Link>
                </div>
            </div>
        </form>
    );
}