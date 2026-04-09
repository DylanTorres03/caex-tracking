import { useState, type FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (guia: string) => void;
  loading: boolean;
  compact?: boolean;
}

const GUIA_REGEX = /^[A-Z0-9-]{3,20}$/i;

export default function SearchBar({ onSearch, loading, compact = false }: SearchBarProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) { setError('Ingresa un número de guía.'); return; }
    if (!GUIA_REGEX.test(trimmed)) { setError('Solo letras, números y guiones (3–20 caracteres).'); return; }
    setError('');
    onSearch(trimmed.toUpperCase());
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {!compact && (
        <p className="text-2xl sm:text-3xl font-semibold text-brand mb-6 tracking-tight leading-snug">
          Rastrea tu envío
        </p>
      )}
      <div className="flex gap-0">
        <div className="relative flex-1">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(''); }}
            placeholder={compact ? 'Número de guía' : 'Ingresa el número de guía — ej. CAEX-001'}
            disabled={loading}
            className={`w-full pl-11 pr-4 border-y border-l border-gray-200 text-sm text-brand placeholder-gray-300 focus:outline-none focus:border-brand transition bg-white ${
              compact ? 'py-2.5' : 'py-4'
            } ${error ? 'border-red-300' : ''}`}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`bg-brand text-white font-semibold text-sm hover:bg-brand/90 disabled:opacity-50 transition whitespace-nowrap border border-brand ${
            compact ? 'px-5 py-2.5' : 'px-8 py-4'
          }`}
        >
          {loading ? 'Buscando…' : 'Consultar'}
        </button>
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </form>
  );
}
