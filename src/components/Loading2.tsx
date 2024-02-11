import { loading2 } from '../util/illustrations'
import React from 'react'

type Props = {}

const Loading2 = (props: Props) => {
    return (
      <div className="inline-flex items-center space-x-2">
          <h1 className="text-primary text-lg">Fetching News</h1>
          {loading2()}
      </div>
    )
  }

export default Loading2