/**
 * Global Error Page
 * Handles unhandled errors in the application
 */

'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to monitoring service (e.g., Sentry)
    console.error('Global error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <AlertTriangle className="h-24 w-24 text-red-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">
            Oops! Something went wrong
          </h1>
            <p className="text-gray-300 text-lg mb-2">
              We&apos;re sorry, but something unexpected happened.
            </p>
            <p className="text-gray-400 text-sm">
              Our team has been notified and is working to fix this issue.
            </p>
        </div>

        {error.digest && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
            <p className="text-sm text-red-300 font-mono">
              Error ID: {error.digest}
            </p>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={reset} className="flex-1">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            
            <Button variant="outline" asChild className="flex-1">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Link>
            </Button>
          </div>
          
          <p className="text-xs text-gray-500">
            If this problem persists, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
