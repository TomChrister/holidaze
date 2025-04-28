import LoginForm from '../features/auth/LoginForm.tsx';

export function LoginPage() {
    return (
        <div className='max-w-md mx-auto'>
            <h1 className='text-2xl mb-4'>Login</h1>
            <LoginForm/>
        </div>
    )
}
