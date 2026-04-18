import React from 'react'
import { useAppNavigate } from '../hooks/useAppNavigate';

function PromptReview() {
    const {goUpload, goPromptReview, goResult} = useAppNavigate();

  return (
    <div>

        <h2>PromptReview</h2>
        <button onClick={goResult}>next</button>
    </div>
  )
}

export default PromptReview