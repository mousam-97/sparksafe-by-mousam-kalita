import React from "react";

type ErrorBoundaryState = { hasError: true; error: Error } | { hasError: false; error: null };

export default class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false, error: null } as ErrorBoundaryState;
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // In a real app, report to monitoring service
        // console.error("ErrorBoundary caught", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: 16 }}>
                    <h2>Something went wrong.</h2>
                    <p>Please try refreshing the page or navigating elsewhere.</p>
                </div>
            );
        }
        return this.props.children;
    }
}


