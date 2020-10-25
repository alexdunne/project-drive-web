import React from 'react';
import {
  ErrorBoundary as BaseErrorBoundary,
  ErrorBoundaryPropsWithComponent,
  FallbackProps,
} from 'react-error-boundary';

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error?.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

interface ErrorBoundaryProps extends Partial<ErrorBoundaryPropsWithComponent> {
  FallbackComponent?: React.ComponentType<FallbackProps>;
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ FallbackComponent, ...rest }) => {
  const Component = FallbackComponent ?? ErrorFallback;

  return <BaseErrorBoundary FallbackComponent={Component} {...rest} />;
};
