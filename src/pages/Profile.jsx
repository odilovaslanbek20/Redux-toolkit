import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function Profile() {
	const [user, setUsers] = useState([])
	const [error, setError] = useState('')
	const { id } = useParams()
	const navigate = useNavigate() 

	useEffect(() => {
		axios
			.get(`https://api.ashyo.fullstackdev.uz/users/${id}`)
			.then(res => setUsers(res.data))
			.catch(error => setError(error.message))
	}, [id])

	if (error) {
		return <div className='text-red-500 text-center'>Error: {error}</div>
	}

	return (
		<div
			className='w-full min-h-[500px] h-[776px] mt-[-60px] bg-gray-100 pt-[80px] flex items-center justify-center p-8'
			style={{
				backgroundImage:
					"url('https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1950&q=80')",
				backgroundAttachment: 'fixed',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<div className='w-full py-8'>
				<div className='max-w-2xl mx-auto bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6'>
					<div className='flex items-center gap-6 max-[490px]:flex-col max-[490px]:justify-start max-[490px]:items-start'>
						<img
							src='/download.png'
							alt='Profile'
							className='w-32 h-32 max-[400px]:w-[110px] max-[400px]:h-[110px] rounded-full border-4 border-indigo-500'
						/>
						<div>
							<h1 className='text-3xl max-[400px]:text-2xl font-semibold text-gray-800 overflow-auto break-all'>
								{user?.fullname || 'No name...'}
							</h1>
							<p className='text-gray-500 break-words'>{user?.email || 'No email...'}</p>
						</div>
					</div>
					<div className='mt-6'>
						<h2 className='text-xl font-medium text-gray-800 mb-2 break-words'>Bio</h2>
						<p className='text-gray-600'>{user?.bio || 'No bio...'}</p>
					</div>

					<div className='mt-6 flex justify-between'>
						<button
							onClick={() => navigate(-1)} 
							className='bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition'
						>
							Back
						</button>

						<button className='bg-indigo-500 text-white py-2 px-6  rounded-lg hover:bg-indigo-600 transition'>
							Edit
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile
