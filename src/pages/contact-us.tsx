import Input from '@/lib/Input';
import { isValidEmail } from '@/lib/validations';
import React, { ChangeEvent, FormEvent, useState } from 'react'

const ContactUs = () => {
    const [userExist,setUserExist] = useState<string>('')
    const [loading,setLoading] = useState<boolean>(false)
      const [data, setData] = useState({
          title: '',
          email: '',
          subject: '',
          message: '',
        });
        const [errors, setErrors] = useState({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          const { name, value } = e.target;
          setData({
            ...data,
            [name]: value,
          });
        };
      
        const handleSubmit = async(e: FormEvent) => {
          e.preventDefault();
          setLoading(true)
          setUserExist('')
          const validationErrors = {} as any;
        
          if (!data.title.trim()) {
            validationErrors.title = 'Title is required';
          }
        
          if (!data.email.trim()) {
            setLoading(false)
            validationErrors.email = 'Email is required';
          } else if (!isValidEmail(data.email.trim())) {
            validationErrors.email = 'Invalid email format';
          }
        
          if (!data.subject.trim()) {
            setLoading(false)
            validationErrors.subject = 'subject is required';
          }
          if (!data.message.trim()) {
            setLoading(false)
            validationErrors.message = 'message is required';
          }
          setErrors(validationErrors);
        
          // If there are validation errors, return without submitting
          if (Object.keys(validationErrors).length > 0) {
            setLoading(false)
            return;
          }
        
          try {
              let response :any = await fetch('/api/v1/contact',{
                  method:'POST',
                  headers:{"Content-Type":"Application/json"},
                  body:JSON.stringify(data)
              })
              let result =  await response.json()
              console.log({result})
            
          } catch (error) {
              console.log({error})
          }
          setData({
            title: '',
            email: '',
            subject: '',
            message: '',
          });
        };
  return (
    <div>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Contact Us
          </h2>
        </div>
  
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="title"
              type="text"
              name="title"
              label="Title"
              value={data.title}
              onChange={handleChange}
              autoComplete="title"
              required
              placeholder="Please enter the title"
              errorMessage={errors.name}
              hasError={!!errors.name}
            />
  
            <Input
              id="email"
              type="email"
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
              id="subject"
              name="subject"
              label="Subject"
              value={data.subject}
              onChange={handleChange}
              autoComplete="subject"
              type="text"
              required
              placeholder="Enter your Subject"
              errorMessage={errors.subject}
              hasError={!!errors.subject}
            />
    
            <div className="mt-2">
             <label className="block text-sm font-medium leading-6 text-gray-900">
             Message
            </label>
            <textarea name='message' onChange={handleChange} className='w-full mt-0 border border-gray-300 rounded-lg'/>
            {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
            </div>
             {userExist && <p className='text-red-500'>{userExist}</p>}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactUs