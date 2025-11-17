'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

/**
 * ErrorBoundary Component
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing.
 *
 * Especially useful for catching 3D rendering errors from Three.js components.
 *
 * @example
 * ```tsx
 * <ErrorBoundary fallback={<FallbackComponent />}>
 *   <Scene />
 * </ErrorBoundary>
 * ```
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error)
    console.error('Error details:', errorInfo)

    // Update state with error info
    this.setState({
      error,
      errorInfo,
    })

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // You can also log to an error reporting service here
    // Example: Sentry.captureException(error, { extra: errorInfo })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default fallback UI
      return <DefaultErrorFallback error={this.state.error} onReset={this.handleReset} />
    }

    return this.props.children
  }
}

/**
 * Default Error Fallback Component
 * Displayed when an error is caught and no custom fallback is provided
 */
interface FallbackProps {
  error?: Error
  onReset: () => void
}

function DefaultErrorFallback({ error, onReset }: FallbackProps) {
  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <div className="min-h-[400px] w-full flex items-center justify-center bg-dark-900/50 backdrop-blur-sm rounded-lg border border-red-500/20">
      <div className="max-w-md mx-auto p-8 text-center">
        {/* Error Icon */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h3 className="text-xl font-semibold text-white mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-dark-300 mb-6">
          We encountered an error while rendering this component.
          {isDevelopment && ' Check the console for more details.'}
        </p>

        {/* Error Details (Development Only) */}
        {isDevelopment && error && (
          <div className="mb-6 p-4 bg-dark-800 rounded-lg text-left">
            <p className="text-sm font-mono text-red-400 break-all">
              {error.toString()}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onReset}
            className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * Simple Error Fallback for 3D Scenes
 * A minimal fallback that works well for 3D background scenes
 */
export function Simple3DFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-dark-950 to-dark-900">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary-500/10 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-primary-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <p className="text-sm text-dark-400">3D scene unavailable</p>
        </div>
      </div>
    </div>
  )
}

/**
 * Hook version of Error Boundary
 * Note: This is a conceptual example. React doesn't support error boundaries as hooks yet.
 * Use the class component ErrorBoundary above instead.
 */
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    if (error) {
      throw error
    }
  }, [error])

  return setError
}
