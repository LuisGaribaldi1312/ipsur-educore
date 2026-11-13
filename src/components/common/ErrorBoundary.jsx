import React from 'react';
import { AlertTriangle, RefreshCw, ArrowLeft, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[IPSUR ErrorBoundary] Capturado error de renderizado:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (typeof this.props.onReset === 'function') {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[420px] flex items-center justify-center p-6">
          <div className="w-full max-w-lg bg-white rounded-3xl border border-red-200 shadow-xl p-6 sm:p-8 text-center space-y-5">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center shadow-xs">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
                Aviso de Seguridad en Vista
              </span>
              <h3 className="text-lg font-black text-slate-900">
                No pudimos desplegar esta sección correctamente
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
                Ocurrió un detalle técnico al cargar la información de esta vista. Tus datos, entregas y avances académicos están completamente a salvo.
              </p>
            </div>

            {this.state.error?.message && (
              <div className="text-left bg-slate-50 border border-slate-200 rounded-xl p-3 text-[11px] font-mono text-slate-600 overflow-x-auto max-h-24">
                {this.state.error.message}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ipsur-navy-700 hover:bg-ipsur-navy-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reintentar Vista</span>
              </button>

              {this.props.onBack && (
                <button
                  onClick={this.props.onBack}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Volver a Salas</span>
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
