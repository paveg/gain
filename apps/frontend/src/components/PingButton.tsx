import { useGetPing } from '@/api/generated/system/system'
import React from 'react'

export const PingButton: React.FC = () => {
  const { data, isLoading, error } = useGetPing()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error occurred</div>

  return (
    <div>
      <p>Message: {data?.message}</p>
      <p>Timestamp: {data?.timestamp}</p>
    </div>
  )
}
