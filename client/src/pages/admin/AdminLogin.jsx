import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../conext/AppContext'

const AdminLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { setIsAdmin, setUserDataLoaded } = useAppContext()

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/auth/login', { email, password })
            if (data.success) {
                localStorage.setItem('adminToken', data.token)
                toast.success('Admin Login Successful')
                setIsAdmin(true)
                setUserDataLoaded(true)
                navigate('/admin')
                // Reload to fetch user data with new token
                window.location.reload()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-100 to-purple-100'>
            <div className='bg-white p-10 rounded-xl shadow-lg w-full sm:w-96 border border-gray-200'>
                <h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>Admin Panel</h2>
                <p className='text-center text-gray-500 mb-8'>Sign in to manage the platform</p>
                
                <form onSubmit={onSubmitHandler} className='space-y-5'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Email Address</label>
                        <input 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email} 
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all' 
                            type="email" 
                            placeholder='admin@example.com' 
                            required 
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
                        <input 
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password} 
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all' 
                            type="password" 
                            placeholder='••••••••' 
                            required 
                        />
                    </div>
                    <button className='w-full py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg'>
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin
