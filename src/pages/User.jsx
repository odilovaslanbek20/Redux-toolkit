import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRightToBracket } from "react-icons/fa6";

function User() {
	const [users, setUsers] = useState([])
	const [error, setError] = useState('')

	useEffect(() => {
		axios
			.get('https://api.ashyo.fullstackdev.uz/users')
			.then(res => setUsers(res.data))
			.catch(error => setError(error.message))
	}, [])

	if (error) {
		return <div className='text-red-500 text-center'>Error: {error}</div>
	}

	return (
		<section
			className='w-full mt-[-60px]  bg-gray-100 pt-[90px] flex items-center justify-center p-4'
			style={{
				backgroundImage:
					"url('https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1950&q=80')",
				backgroundAttachment: 'fixed',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<div className='w-[90%] max-[450px]:w-[98%] m-auto grid grid-cols-2 gap-8 max-[768px]:grid-cols-1'>
				{users.map(user => (
					<div
						key={user.id}
						className='bg-white/70 backdrop-blur-md p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105'
					>
						<img
							src={user.image_url || 'download.png'}
							alt={user.fullname || 'User photo'}
							className='w-24 h-24 rounded-full mx-auto mb-4 object-cover'
						/>
						<p className='text-sm text-gray-600'>ID: {user.id}</p>
						<h2 className='text-xl font-semibold text-center text-gray-900 mt-2 break-words'>
							{user.fullname}
						</h2>
						<a
							href={`mailto:${user.email}`}
							className='text-blue-500 mt-2 block text-center break-words'
						>
							{user.email}
						</a>
						<a
							href={`tel:${user.phone_number}`}
							className='text-blue-500 mt-2 block text-center break-words'
						>
							{user.phone_number}
						</a>
						<p className='text-sm text-gray-500 mt-2 text-center break-words'>
							Role: {user.role}
						</p>
						<Link
							to={`/user/${user.id}`}
							className='text-blue-500 mt-2 text-center flex items-center justify-center gap-1.5'
						>
							<p>Profile</p>
							<FaArrowRightToBracket />
						</Link>
					</div>
				))}
			</div>
		</section>
	)
}

export default User
