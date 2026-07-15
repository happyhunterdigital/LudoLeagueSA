import { Component, ReactNode } from 'react';
import { firebaseError, isFirebaseReady } from '../config/firebase';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

/**
 * FirebaseErrorBoundary catches Firebase-related render errors and displays
 * a graceful fallback UI instead of crashing to a blank screen.
 *
 * Common causes for auth/invalid-api-key:
 * 1. HTTP referrer restrictions block the domain
 * 2. API key has been deleted or rotated
 * 3. Firebase project is disabled
 * 4. Network / DNS issues reaching Firebase
 */
export class FirebaseErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    const msg = error?.message || String(error);
    // Capture Firebase-specific errors
    if (
      msg.includes('firebase') ||
      msg.includes('auth/') ||
      msg.includes('api-key') ||
      msg.includes('Firebase') ||
      msg.includes('permission-denied')
    ) {
      return { hasError: true, errorMessage: msg };
    }
    // Re-throw non-Firebase errors to let them bubble elsewhere
    throw error;
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[FirebaseErrorBoundary] Caught Firebase error:', error);
    if (info?.componentStack) {
      console.error('[FirebaseErrorBoundary] Component stack:', info.componentStack);
    }
  }

  render() {
    // If Firebase failed at init (module level), show the error UI immediately
    const initError = !isFirebaseReady && firebaseError;

    if (initError || this.state.hasError) {
      const displayError = this.state.errorMessage || firebaseError?.message || 'Unknown Firebase error';
      const errorCode = displayError.match(/auth\/[^\s)]+/)?.[0] || '';

      return (
        <div className="min-h-screen bg-black flex items-center justify-center px-6">
          <div className="max-w-lg w-full text-center space-y-6">
            {/* Brand mark */}
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-[#FACC15]/10 border border-[#FACC15]/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#FACC15]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
            </div>

            <div>
              <h1 className="text-xl font-display font-black text-white tracking-wide uppercase">
                Connection Issue
              </h1>
              <p className="text-sm text-white/40 mt-2 leading-relaxed">
                We're having trouble connecting to our backend services.
                This is usually temporary.
              </p>
            </div>

            {/* Error detail box */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-4 text-left">
              <p className="text-[10px] uppercase tracking-[0.15em] text-white/30 font-bold mb-2">Error Details</p>
              <code className="block text-xs text-[#FACC15]/80 font-mono break-all leading-relaxed">
                {errorCode || displayError}
              </code>
              {errorCode === 'auth/invalid-api-key' && (
                <div className="mt-3 text-xs text-white/40 space-y-1">
                  <p className="text-white/60 font-medium">This error typically means:</p>
                  <ul className="list-disc list-inside space-y-0.5 ml-1">
                    <li>Your domain isn't in the allowed HTTP referrers list</li>
                    <li>The API key has been deleted or restricted</li>
                    <li>The Firebase project is paused or deleted</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2.5 bg-[#FACC15] text-black text-xs font-bold uppercase tracking-[0.1em] rounded hover:bg-[#FACC15]/90 transition-colors"
              >
                Hard Refresh
              </button>
              <button
                onClick={() => {
                  // Clear site data and reload
                  if ('caches' in window) {
                    caches.keys().then(names => Promise.all(names.map(n => caches.delete(n))));
                  }
                  window.location.reload();
                }}
                className="px-6 py-2.5 border border-white/10 text-white/60 text-xs font-bold uppercase tracking-[0.1em] rounded hover:border-white/20 hover:text-white transition-colors"
              >
                Clear Cache & Retry
              </button>
            </div>

            <p className="text-[10px] text-white/20">
              If this persists, check the Firebase Console API key restrictions for <code className="text-white/30">ludoleague.co.za</code>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
