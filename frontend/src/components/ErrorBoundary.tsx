// frontend/src/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Atualiza o estado para que a próxima renderização mostre a UI de fallback.
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log do erro para o console do desenvolvedor
    console.error("Uncaught error:", error, errorInfo);
    
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Você pode renderizar qualquer UI de fallback que quiser
      return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-4" role="alert">
          <h1 className="font-bold text-lg mb-2">Algo deu errado.</h1>
          <p>A aplicação encontrou um erro inesperado e não pôde continuar.</p>
          
          {/* Exibe detalhes do erro em ambiente de desenvolvimento */}
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-4 bg-white p-3 rounded shadow">
              <summary className="font-medium cursor-pointer">Detalhes do Erro</summary>
              <pre className="mt-2 text-sm whitespace-pre-wrap break-words">
                {this.state.error.toString()}
                <br />
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
