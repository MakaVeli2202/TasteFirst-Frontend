import React from "react";
import {logger} from "../utils/logger"
class ErrorBoundary extends React.Component {
    constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    logger.error('Component error caught', {
      error: error.toString(),
      componentStack: errorInfo.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold text-red-900 mb-2">
                Something went wrong
              </h1>
              <p className="text-red-700 mb-6">
                We're sorry for the inconvenience. The error has been reported.
              </p>
              {import.meta.env.DEV && (

                <details className="mb-6 text-left bg-red-100 p-4 rounded">
                  <summary className="cursor-pointer font-semibold">
                    Error Details
                  </summary>
                  <pre className="mt-2 text-xs overflow-auto max-h-40">
                    {this.state.error?.toString()}
                  </pre>
                </details>
              )}

              <button
                onClick={() => (window.location.href = '/')}
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;