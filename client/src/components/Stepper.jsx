import React from 'react'

function Stepper() {
  return (
    <nav class="stepper stepper-clean" aria-label="Progress steps">
        <button class="step done" type="button" data-step="upload">
            <span class="step-node">
            <svg viewBox="0 0 24 24" aria-hidden="true" class="step-svg">
                <path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </span>
            <span class="step-text">Reference</span>
        </button>

        <button class="step done" type="button" data-step="details">
            <span class="step-node">
            <svg viewBox="0 0 24 24" aria-hidden="true" class="step-svg">
                <path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </span>
            <span class="step-text">Preferences</span>
        </button>

        <button class="step active" type="button" data-step="prompt">
            <span class="step-node">
            <svg viewBox="0 0 24 24" aria-hidden="true" class="step-svg">
                <path d="M12 21s6-4.35 6-10a6 6 0 1 0-12 0c0 5.65 6 10 6 10Z" fill="none" stroke="currentColor" stroke-width="2.2"/>
                <circle cx="12" cy="11" r="2.4" fill="currentColor"/>
            </svg>
            </span>
            <span class="step-text">Review</span>
        </button>

        <button class="step" type="button" data-step="results" disabled>
            <span class="step-node">
            <svg viewBox="0 0 24 24" aria-hidden="true" class="step-svg grid-icon">
                <rect x="5" y="5" width="5" height="5" rx="1.2"></rect>
                <rect x="14" y="5" width="5" height="5" rx="1.2"></rect>
                <rect x="5" y="14" width="5" height="5" rx="1.2"></rect>
                <rect x="14" y="14" width="5" height="5" rx="1.2"></rect>
            </svg>
            </span>
            <span class="step-text">Download</span>
        </button>
    </nav>
  )
}

export default Stepper