'use client'

export default function Page() {
	return (
		<>
			<div className='flex flex-col min-h-screen bg-gray-100 p-4'>
				<h1 className='w-fit text-4xl font-bold mb-8 dark:text-gray-600 border rounded-md p-2'>
					Create Journal Entry
				</h1>
				<div className='w-sm md:w-2xl self-center outline rounded-md p-4'>
					<form
						action='/submit-entry'
						method='post'
						className='space-y-6'>
						<div>
							<label
								htmlFor='mood'
								className='block text-sm font-medium text-gray-700 mb-1'>
								Mood:
							</label>
							<select
								defaultValue=''
								name='mood'
								id='mood'
								required
								className='dark:text-amber-700 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
								<option value='' disabled>
									-- Please select a mood --
								</option>
								<option value='very-happy'>Very Happy</option>
								<option value='happy'>Happy</option>
								<option value='neutral'>Neutral</option>
								<option value='sad'>Sad</option>
								<option value='very-sad'>Very Sad</option>
							</select>
						</div>

						<div>
							<label
								htmlFor='intensity'
								className='block text-sm font-medium text-gray-700 mb-1'>
								Intensity (1=Low, 10=High):
							</label>
							<select
								defaultValue=''
								name='intensity'
								id='intensity'
								required
								className='dark:text-amber-700 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
								<option value='' disabled>
									-- Select intensity --
								</option>
								<option value='1'>1</option>
								<option value='2'>2</option>
								<option value='3'>3</option>
								<option value='4'>4</option>
								<option value='5'>5</option>
								<option value='6'>6</option>
								<option value='7'>7</option>
								<option value='8'>8</option>
								<option value='9'>9</option>
								<option value='10'>10</option>
							</select>
						</div>

						<div>
							<label
								htmlFor='notes'
								className='block text-sm font-medium text-gray-700 mb-1'>
								Notes (Optional):
							</label>
							<textarea
								id='notes'
								name='notes'
								rows={5}
								className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'></textarea>
						</div>

						<div>
							<button
								type='submit'
								className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
								Save Entry
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
