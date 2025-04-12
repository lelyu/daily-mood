import PieChart from '../components/PieChart'
import moodData from '../../../lib/mockData.json'

export default function Page() {
	return (
		<>
			<div className='flex flex-col min-h-screen bg-gray-100 p-4'>
				<h1 className='w-fit text-4xl font-bold mb-4 dark:text-gray-600 border rounded-md p-2'>
					Visualizations
				</h1>
				<PieChart data={moodData} />
			</div>
		</>
	)
}
