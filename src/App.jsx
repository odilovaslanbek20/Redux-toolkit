import {
	Route,
	Routes,
	Navigate,
	Outlet,
	Link,
	useNavigate,
} from 'react-router-dom'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import User from './pages/User'
import { useEffect, useState } from 'react'
import { FaArrowRightFromBracket } from 'react-icons/fa6'

function ProtectedRoute({ token }) {
	return token ? <Outlet /> : <Navigate to='/' />
}

function App() {
	const [token, setToken] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
		const interval = setInterval(() => {
			setToken(localStorage.getItem('token'))
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	const handleLogout = () => {
		localStorage.clear()
		setToken(null)
		navigate('/')
	}

	return (
		<>
			<header className='w-full bg-blue-500 text-white p-4 shadow-md fixed z-50'>
				<div className='max-w-7xl mx-auto flex justify-between items-center'>
					<Link to='/' className='text-2xl font-semibold'>
						MyApp
					</Link>
					<nav>
						<ul className='flex space-x-6'>
							{token ? (
								<>
									<li>
										<Link to='user' className='hover:text-blue-200'>
											Users
										</Link>
									</li>
									<li>
										<span
											onClick={handleLogout}
											className='hover:text-blue-200 flex items-center gap-1.5 cursor-pointer'
										>
											<p>Log out</p>
											<FaArrowRightFromBracket />
										</span>
									</li>
								</>
							) : (
								<>
									<li>
										<Link to='/' className='hover:text-blue-200'>
											Sign Up
										</Link>
									</li>
								</>
							)}
						</ul>
					</nav>
				</div>
			</header>

			<div className='pt-24'>
				<Routes>
					{!token ? navigate("/"): navigate("/user")}

					<Route path='/' element={<SignUp />} />

					<Route element={<ProtectedRoute token={token} />}>
						<Route path='/user' element={<User />} />
						<Route path='/user/:id' element={<Profile />} />
					</Route>

					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			</div>
		</>
	)
}

export default App
