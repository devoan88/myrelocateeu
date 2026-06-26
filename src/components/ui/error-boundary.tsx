"use client";

import Link from "next/link";
import React from "react";

type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="page-enter flex min-h-[40vh] flex-col items-center justify-center px-6 text-center">
          <h2 className="font-sans text-xl font-semibold text-foreground">
            Something went wrong
          </h2>
          <p className="mt-2 max-w-md font-sans text-sm text-muted-foreground">
            An unexpected error occurred. Please refresh the page or return home.
          </p>
          <Link
            href="/"
            className="mt-6 rounded-lg bg-primary px-4 py-2 font-sans text-sm font-medium text-primary-foreground no-underline transition-colors hover:opacity-90"
          >
            Back to homepage
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}
