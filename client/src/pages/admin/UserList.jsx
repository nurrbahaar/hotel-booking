
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../conext/AppContext'
import { toast } from 'react-hot-toast'
import { assets } from '../../assets/assets'

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

        const [search, setSearch] = useState("");

        const handleDelete = async (userId) => {
                if (!window.confirm('Bu kullanýcýyý silmek istediðinize emin misiniz?')) return;
                try {
                        const token = await getToken();
                        const { data } = await axios.delete(`/api/users/${userId}`, {
                                headers: { Authorization: `Bearer ${token}` }
                        });
                        if (data.success) {
                                setUsers(users.filter(u => u._id !== userId));
                                toast.success('Kullanýcý silindi');
                        } else {
                                toast.error(data.message);
                        }
                } catch (err) {
                        toast.error('Silme iþlemi baþarýsýz');
                }
        };

        const filteredUsers = users.filter(user =>
                user.username.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase())
        );

        if (loading) return <div>Loading...</div>

        return (
                <div>
                        <h1 className='text-2xl font-bold mb-4'>User Management</h1>
                        <input
                                type="text"
                                placeholder="Kullanýcý adý veya email ara..."
                                className="mb-4 px-3 py-2 border rounded w-full max-w-md"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                        />
                        <div className='overflow-x-auto'>
                                <table className='min-w-full bg-white border border-gray-200'>
                                        <thead>
                                                <tr className='bg-gray-100 border-b'>
                                                        <th className='py-2 px-4 text-left'>Resim</th>
                                                        <th className='py-2 px-4 text-left'>Ad</th>
                                                        <th className='py-2 px-4 text-left'>Email</th>
                                                        <th className='py-2 px-4 text-left'>Roller</th>
                                                        <th className='py-2 px-4 text-left'>Ýþlem</th>
                                                </tr>
                                        </thead>
                                        <tbody>
                                                {filteredUsers.map((user) => (
                                                        <tr key={user._id} className='border-b hover:bg-gray-50'>
                                                                <td className='py-2 px-4'>
                                                                        <img 
                                                                                src={user.image || assets.userIcon} 
                                                                                alt="" 
                                                                                className='w-8 h-8 rounded-full object-cover'
                                                                                onError={(e) => { e.target.src = assets.userIcon }}
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
                                                                <td className='py-2 px-4'>
                                                                        <button
                                                                                onClick={() => handleDelete(user._id)}
                                                                                className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs'>Sil</button>
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
