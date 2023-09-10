import Input from '@/lib/Input'
import { isValidEmail } from '@/lib/validations';
import { signIn } from 'next-auth/react'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import {useRouter} from 'next/navigation'
const Login = () =>
{
    const [loading,setLoading] = useState(false)
    const router = useRouter()
    const [data, setData] = useState({
        email: '',
        password: ''
      });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setErrorMessage('')
        const { name, value } = e.target;
        setData({
          ...data,
          [name]: value,
        });
      };
      const [errors, setErrors] = useState({
        email: '',
        password: '',
      });
      const [errorMessage,setErrorMessage] = useState<string>('')

      const handleSubmit = async(e: FormEvent) => {
        e.preventDefault();
        setLoading(true)
        const validationErrors = {} as any;
      
        if (!data.email.trim()) {
            setLoading(false)
          validationErrors.email = 'Email is required';
        } else if (!isValidEmail(data.email.trim())) {
            setLoading(false)
          validationErrors.email = 'Invalid email format';
        }
      
        if (!data.password.trim()) {
            setLoading(false)
          validationErrors.password = 'Password is required';
        }
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            return;
          }
        console.log({ data });
        const status = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password,
        });
        if(status?.status === 401){
            setLoading(false)
            setErrorMessage('Credentials failed')
        }
        if(status?.status === 200){
            setLoading(false)
            router.push('/')
        }
      };
      
    return (
        
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Login to your account
            </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
            <Input
                id="email"
                type="text"
                name="email"
                label="Email"
                value={data.email}
                onChange={handleChange}
                autoComplete="email"
                required
                placeholder="Enter your email"
                errorMessage={errors.email}
                hasError={!!errors.email}
              />
    
              <Input
                id="password"
                name="password"
                label="Password"
                value={data.password}
                onChange={handleChange}
                autoComplete="current-password"
                type="password"
                required
                placeholder="Enter your password"
                errorMessage={errors.password}
                hasError={!!errors.password}
              />
                {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
                <div>
                    <button
                        disabled={loading}
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                       {`${loading ? 'loading...' : 'Login'}`}
                    </button>
                    
                </div>
            </form>
            <hr className='mt-3 mb-5' />
            <div className="flex flex-col space-y-3">

                <a
                    href={"/register"}
                    className="flex w-full mx-auto justify-center items-center bg-white border border-primary-blue rounded-lg px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    Create Account
                </a>
            </div>
        </div>
    </div>
    )
}

export default Login