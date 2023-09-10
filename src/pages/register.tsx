import Input from '@/lib/Input';
import { isValidEmail, isValidPassword } from '@/lib/validations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, ChangeEvent, FormEvent } from 'react';

const Register = () =>
{
  const [userExist,setUserExist] = useState<string>('')
  const router = useRouter()
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({
          ...data,
          [name]: value,
        });
      };
    
      const handleSubmit = async(e: FormEvent) => {
        e.preventDefault();
        setUserExist('')
        const validationErrors = {} as any;
      
        if (!data.name.trim()) {
          validationErrors.name = 'Name is required';
        }
      
        if (!data.email.trim()) {
          validationErrors.email = 'Email is required';
        } else if (!isValidEmail(data.email.trim())) {
          validationErrors.email = 'Invalid email format';
        }
      
        if (!data.password.trim()) {
          validationErrors.password = 'Password is required';
        } else if (!isValidPassword(data.password.trim())) {
          validationErrors.password = 'Password must be at least 8 characters, one uppercase letter, one lowercase letter, and one digit';
        }
      
        if (data.password.trim() !== data.confirmPassword.trim()) {
          validationErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(validationErrors);
      
        // If there are validation errors, return without submitting
        if (Object.keys(validationErrors).length > 0) {
          return;
        }
      
        try {
            let response :any = await fetch('/api/auth/signup',{
                method:'POST',
                headers:{"Content-Type":"Application/json"},
                body:JSON.stringify(data)
            })
            let result =  await response.json()
            if(result.message === 'User already exists'){
              setUserExist("User already exist.")
              return
            }
            if(result.message === 'User created'){
              router.push('/')
            }
        } catch (error) {
         console.log({error})   
        }
        setData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      };
      
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Register your account
            </h2>
          </div>
    
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                id="name"
                type="text"
                name="name"
                label="Name"
                value={data.name}
                onChange={handleChange}
                autoComplete="name"
                required
                placeholder="Enter your name"
                errorMessage={errors.name}
                hasError={!!errors.name}
              />
    
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
    
              <Input
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                value={data.confirmPassword}
                onChange={handleChange}
                autoComplete="name"
                type="password"
                required
                placeholder="Confirm your password"
                errorMessage={errors.confirmPassword}
                hasError={!!errors.confirmPassword}
              />
            {userExist && <p className='text-red-500'>{userExist}</p>}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
              </div>
            </form>
            <hr className="mt-3 mb-5" />
            <div className="flex flex-col space-y-3">
              <Link
                href="/login"
                className="flex w-full mx-auto justify-center items-center bg-white border border-primary-blue rounded-lg px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Already have an account?
              </Link>
            </div>
          </div>
        </div>
      );
    };

export default Register