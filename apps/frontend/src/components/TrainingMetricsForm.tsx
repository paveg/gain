import { FormEvent, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

interface TrainingMetrics {
  height: number
  weight: number
  gender: 'male' | 'female' | 'other'
  frequency: number
  benchPress: number
  squat: number
  deadlift: number
}

interface TrainingExercise {
  name: string
  sets: number
  reps: number
  weight?: number
  rpe?: number
  notes?: string
}

interface TrainingDay {
  exercises: TrainingExercise[]
  day: number
}

export function TrainingMetricsForm() {
  const [metrics, setMetrics] = useState<TrainingMetrics>({
    height: 0,
    weight: 0,
    gender: 'male',
    frequency: 3,
    benchPress: 0,
    squat: 0,
    deadlift: 0,
  })
  const [program, setProgram] = useState<TrainingDay[]>()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8787/training/program', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metrics),
      })
      const data = await response.json()
      setProgram(data.program)
    } catch (error) {
      console.error('Error generating program:', error)
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">身長 (cm)</label>
            <Input
              type="number"
              value={metrics.height}
              onChange={(e) => setMetrics({ ...metrics, height: Number(e.target.value) })}
              min="0"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">体重 (kg)</label>
            <Input
              type="number"
              value={metrics.weight}
              onChange={(e) => setMetrics({ ...metrics, weight: Number(e.target.value) })}
              min="0"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">性別</label>
            <Select
              value={metrics.gender}
              onValueChange={(value) => setMetrics({ ...metrics, gender: value as 'male' | 'female' | 'other' })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">男性</SelectItem>
                <SelectItem value="female">女性</SelectItem>
                <SelectItem value="other">その他</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">週当たりのトレーニング頻度</label>
            <Select
              value={metrics.frequency.toString()}
              onValueChange={(value) => setMetrics({ ...metrics, frequency: Number(value) })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    週{num}回
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">ベンチプレス最大重量 (kg)</label>
            <Input
              type="number"
              value={metrics.benchPress}
              onChange={(e) => setMetrics({ ...metrics, benchPress: Number(e.target.value) })}
              min="0"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">スクワット最大重量 (kg)</label>
            <Input
              type="number"
              value={metrics.squat}
              onChange={(e) => setMetrics({ ...metrics, squat: Number(e.target.value) })}
              min="0"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">デッドリフト最大重量 (kg)</label>
            <Input
              type="number"
              value={metrics.deadlift}
              onChange={(e) => setMetrics({ ...metrics, deadlift: Number(e.target.value) })}
              min="0"
              required
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          トレーニングプログラムを作成
        </Button>
      </form>

      {program && (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">トレーニングプログラム</h2>
          {program.map((day) => (
            <div key={day.day} className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Day {day.day}</h3>
              <div className="space-y-4">
                {day.exercises.map((exercise, index) => (
                  <div key={index} className="border-b pb-3">
                    <div className="font-medium">{exercise.name}</div>
                    <div className="text-sm text-gray-600">
                      {exercise.sets} セット × {exercise.reps} 回
                      {exercise.weight && ` @ ${exercise.weight}kg`}
                      {exercise.rpe && ` RPE${exercise.rpe}`}
                    </div>
                    {exercise.notes && (
                      <div className="text-sm text-gray-500 mt-1">{exercise.notes}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 
