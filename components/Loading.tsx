import { loading } from '@/util/illustrations'
import React from 'react'

type Props = {}

const Loading = (props: Props) => {
  return (
    <div className="flex justify-center items-center h-full">
        <div className="text-center">
            {loading()}
            <h1 className="text-primary text-lg">Loading...</h1>
        </div>
    </div>
  )
}

export default Loading