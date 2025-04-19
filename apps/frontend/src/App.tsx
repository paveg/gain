import { TrainingMetricsForm } from './components/TrainingMetricsForm'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">
          パーソナライズドトレーニングプログラム
        </h1>
        <TrainingMetricsForm />
      </div>
    </div>
  )
}

export default App
