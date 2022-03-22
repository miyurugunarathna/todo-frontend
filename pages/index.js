import { useState } from 'react';
import Head from 'next/head';
import { UserEndpoints } from './api/user';

export default function Home() {

	const [error, setError] = useState(''); // login error message

	// user login
	const handleSubmit = (e) => {
		e.preventDefault();
		setError('');
		const user = {
			email: e.target.email.value,
			password: e.target.password.value
		};
		UserEndpoints.login(user).then(response => {
			// if login success save token to local storage
			localStorage.setItem('token', response.token);
			// redirect to todo page
			if (response.token) {
				window.location.href = '/todo';
			}
		}).catch(error => {
			// if login failed set error message
			setError(error);
		});
	};

	return (
		<div>
			<Head>
				<title>Todo App</title>
				<meta name="description" content="Sample todo application" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
				<div className="flex flex-col bg-white border border-black/5 px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded w-50 max-w-md">
					<div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
						Welcome Back
					</div>
					<div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
						Enter your credentials to access your account
					</div>
					<div className="mt-10">
						<form onSubmit={handleSubmit}>
							<div className="flex flex-col mb-5">
								<label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
									Email Address:
								</label>
								<input
									id="email"
									type="email"
									name="email"
									required
									className=" text-sm placeholder-gray-500 px-3 rounded border border-black/10 w-full py-2 focus:outline-none focus:border-blue-400"
									placeholder="Enter your email"
								/>
							</div>
							<div className="flex flex-col mb-6">
								<label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
									Password:
								</label>
								<input
									id="password"
									type="password"
									name="password"
									required
									className="text-sm placeholder-gray-500 px-3 rounded  border border-black/10  w-full  py-2 focus:outline-none focus:border-blue-400"
									placeholder="Enter your password"
								/>
							</div>
							<div className="flex w-full">
								<button id='signIn' type="submit" className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded py-2 w-full transition duration-150 ease-in">
									<span className="mr-2 uppercase">Sign In</span>
								</button>
							</div>
						</form>
					</div>
				</div>
				{error !== '' && (
					<div className='mt-3'>
						<p className='text-red-500'>{error}</p>
					</div>
				)}
			</div>
		</div>
	)
}
