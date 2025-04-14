import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'

function SignUp() {
	const dispatch = useDispatch()
	const value = useSelector(state => state.auth)
	const navigate = useNavigate()

	const [fullname, setFullname] = useState('')
	const [email, setEmail] = useState('')

	function handleSubmit(e) {
		e.preventDefault()

		const user = { fullname, email }
		const token = 'aslanbek-odilov-12-20-2008'

		dispatch(login({ user, token }))
	}

	useEffect(() => {
		if (value.token) {
			localStorage.setItem('token', value?.token)
			console.log('Token saqlandi:', value?.token)
			navigate('user')
		}
	}, [value?.token])

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
			<form
				onSubmit={handleSubmit}
				className='w-full max-w-[400px] mx-auto bg-white/70  backdrop-blur-md p-8 rounded-lg shadow-lg'
			>
				<h2 className='text-2xl font-semibold text-center mb-6'>Kirish</h2>

				<div className='mb-4'>
					<label
						htmlFor='fullname'
						className='block text-gray-700 text-sm font-medium'
					>
						Ism
					</label>
					<input
						id='fullname'
						className='w-full mt-2 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						type='text'
						value={fullname}
						onChange={e => setFullname(e.target.value)}
						placeholder='Ismingizni kiriting'
					/>
				</div>

				<div className='mb-6'>
					<label
						htmlFor='email'
						className='block text-gray-700 text-sm font-medium'
					>
						Elektron pochta
					</label>
					<input
						id='email'
						className='w-full mt-2 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						type='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						placeholder='Email manzilingizni kiriting'
					/>
				</div>

				<button
					type='submit'
					className='w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300'
				>
					Kirish
				</button>
			</form>
		</div>
	)
}

export default SignUp
