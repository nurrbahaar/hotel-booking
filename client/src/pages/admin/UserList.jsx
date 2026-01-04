import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../conext/AppContext'
import { toast } from 'react-hot-toast'

const UserList = () => {
    const { axios, getToken } = useAppContext()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchUsers = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get('/api/users/all', {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (data.success) {
                setUsers(data.users)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <h1 className='text-2xl font-bold mb-4'>User Management</h1>
            <div className='overflow-x-auto'>
                <table className='min-w-full bg-white border border-gray-200'>
                    <thead>
                        <tr className='bg-gray-100 border-b'>
                            <th className='py-2 px-4 text-left'>Image</th>
                            <th className='py-2 px-4 text-left'>Name</th>
                            <th className='py-2 px-4 text-left'>Email</th>
                            <th className='py-2 px-4 text-left'>Roles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className='border-b hover:bg-gray-50'>
                                <td className='py-2 px-4'>
                                    <img 
                                        src={user.image || 'https://via.placeholder.com/150'} 
                                        alt="" 
                                        className='w-8 h-8 rounded-full object-cover'
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/150' }}
                                    />
                                </td>
                                <td className='py-2 px-4'>{user.username}</td>
                                <td className='py-2 px-4'>{user.email}</td>
                                <td className='py-2 px-4'>
                                    {user.roles && user.roles.map((role, index) => (
                                        <span key={role._id || index} className='bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded'>
                                            {role.name}
                                        </span>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserList
