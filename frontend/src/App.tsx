import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import Timeline from '@/components/Timeline';
import Skeleton from '@/components/Skeleton';
import Toast from '@/components/Toast';
import FAQPanel from '@/components/FAQ';
import { fetchTracking, ApiError } from '@/lib/api';
import type { TrackingResponse } from '@/types/tracking';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<TrackingResponse | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'error' | 'info' } | null>(null);
  const [faqOpen, setFaqOpen] = useState(false);

  async function handleSearch(guia: string) {
    setSearched(true);
    setLoading(true);
    setToast(null);
    setResult(null);
    try {
      const data = await fetchTracking(guia);
      setResult(data);
    } catch (err) {
      setToast({
        message:
          err instanceof ApiError || err instanceof Error
            ? err.message
            : 'Error inesperado. Intenta nuevamente.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setSearched(false);
    setResult(null);
    setToast(null);
    setLoading(false);
  }

  const hasResult = !!result && !loading;
  const compact = searched;

  return (
    <div className="min-h-screen bg-white">
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      <FAQPanel open={faqOpen} onClose={() => setFaqOpen(false)} />

      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 h-14 flex items-center justify-between">
          <button onClick={handleReset} className="focus:outline-none">
            <img src="/logo.webp" alt="Cargo Expreso" className="h-6 w-auto" />
          </button>
          <button
            onClick={() => setFaqOpen(true)}
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-brand transition font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
            Ayuda
          </button>
        </div>
      </header>

      <section className={`transition-all duration-300 ${compact ? 'py-7 border-b border-gray-100' : 'py-20 sm:py-28'}`}>
        <div className={`mx-auto px-6 sm:px-10 transition-all duration-300 ${compact ? 'max-w-6xl' : 'max-w-2xl'}`}>
          {!compact && (
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">
              Seguimiento de envíos
            </p>
          )}
          <SearchBar onSearch={handleSearch} loading={loading} compact={compact} />
          {!searched && (
            <p className="mt-3 text-xs text-gray-300">
              Guías de ejemplo: CAEX-001 · CAEX-002 · CAEX-003 · CAEX-004 · CAEX-005
            </p>
          )}
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 sm:px-10">
        {loading && (
          <div className="py-10">
            <Skeleton />
          </div>
        )}

        {hasResult && (
          <div className="py-10 animate-fadeUp">
            <Timeline data={result} />
          </div>
        )}

        {!hasResult && !loading && (
          <div className="max-w-2xl mx-auto py-16 text-center">
            <p className="text-xs text-gray-300 uppercase tracking-widest">
              {searched
                ? 'Ingresa otro número de guía para continuar'
                : 'Ingresa un número de guía para ver el estado de tu envío'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
