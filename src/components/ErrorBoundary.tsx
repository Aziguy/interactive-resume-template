import { Component, type ErrorInfo, type ReactNode } from 'react'

interface State {
  error: Error | null
}

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Resume rendering error:', error, info)
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div className="grid min-h-screen place-items-center p-8">
        <div className="max-w-md space-y-4 text-center">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="text-muted">
            Check <code className="rounded bg-ink/10 px-1.5 py-0.5 font-mono text-sm">src/config/resume.ts</code> for
            errors.
          </p>
          <pre className="overflow-auto rounded-lg bg-red-500/10 p-4 text-left text-xs text-red-600">
            {this.state.error.message}
          </pre>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-surface"
          >
            Reload
          </button>
        </div>
      </div>
    )
  }
}
