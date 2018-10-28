import * as React from 'react';

interface IState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<{}, IState> {
  public static getDerivedStateFromError(_error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  public componentDidCatch(error: Error, info: any) {
    console.error(error);
    console.error(info);
    // TODO: log the error to an error reporting service
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
