'use client';

import { ErrorBoundary } from 'react-error-boundary';

import { type PropsWithChildren } from '@/core/types/common';

interface ClientErrorBoundaryProps {
  fallback: React.ReactNode;
}

export const ClientErrorBoundary = ({
  children,
  fallback,
}: PropsWithChildren<ClientErrorBoundaryProps>) => {
  return <ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>;
};
