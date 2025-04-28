import RegisterForm from '../features/auth/RegisterForm';

export function RegisterPage() {
    return (
        <div className='max-w-md mx-auto'>
            <h1 className='text-2xl mb-4'>Register</h1>
            <RegisterForm />
        </div>
    );
}
