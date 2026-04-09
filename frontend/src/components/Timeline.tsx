import type { TrackingResponse, HistorialEntry } from '@/types/tracking';

interface TimelineProps {
  data: TrackingResponse;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const date = d.toLocaleDateString('es-GT', { day: '2-digit', month: 'short', year: 'numeric' });
  const time = d.toLocaleTimeString('es-GT', { hour: '2-digit', minute: '2-digit' });
  return { date, time };
}

function getStatusColor(status: string): string {
  if (status === 'Entregado') return '#22c55e';
  if (status === 'Retenido en Aduana') return '#ef4444';
  if (['En Tránsito', 'En Reparto'].includes(status)) return '#f59e0b';
  return '#94a3b8';
}

function StatusDot({ status, size = 8 }: { status: string; size?: number }) {
  return (
    <span
      className="inline-block rounded-full flex-shrink-0"
      style={{ width: size, height: size, backgroundColor: getStatusColor(status) }}
    />
  );
}

function EventRow({
  entry,
  index,
  isLast,
  isCurrent,
}: {
  entry: HistorialEntry;
  index: number;
  isLast: boolean;
  isCurrent: boolean;
}) {
  const { date, time } = formatDate(entry.fecha_hora);
  const color = getStatusColor(entry.estado);

  return (
    <div
      className="animate-fadeUp grid gap-x-6"
      style={{ animationDelay: `${index * 60}ms`, gridTemplateColumns: '10px 1fr' }}
    >
      <div className="flex flex-col items-center">
        <div
          className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1"
          style={{
            backgroundColor: isCurrent ? color : 'transparent',
            border: `2px solid ${isCurrent ? color : '#e2e8f0'}`,
            boxShadow: isCurrent ? `0 0 0 3px ${color}22` : 'none',
          }}
        />
        {!isLast && (
          <div className="w-px flex-1 mt-1" style={{ backgroundColor: '#e2e8f0', minHeight: '32px' }} />
        )}
      </div>

      <div className="pb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold" style={{ color }}>
            {entry.estado}
          </span>
          <span className="text-xs text-gray-300">·</span>
          <span className="text-xs text-gray-400">{date}, {time}</span>
        </div>
        <p className={`text-sm font-semibold ${isCurrent ? 'text-brand' : 'text-gray-600'}`}>
          {entry.ubicacion}
        </p>
        {entry.descripcion && (
          <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{entry.descripcion}</p>
        )}
      </div>
    </div>
  );
}

export default function Timeline({ data }: TimelineProps) {
  const color = getStatusColor(data.estado_actual);
  const cronologico = [...data.historial].reverse();

  return (
    <div className="w-full animate-fadeUp">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-16">

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="bg-white/60 backdrop-blur-md border border-gray-100 shadow-sm p-6">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Envío</p>
            <p className="text-3xl font-black text-brand tracking-tight mb-4">
              {data.numero_guia}
            </p>

            <div className="flex items-center gap-2 mb-5">
              <StatusDot status={data.estado_actual} size={8} />
              <span className="text-sm font-semibold" style={{ color }}>
                {data.estado_actual}
              </span>
            </div>

            <div className="space-y-4 border-t border-gray-100 pt-5">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Ubicación</p>
                <p className="text-sm font-medium text-gray-800">{data.ubicacion_actual}</p>
              </div>
              {data.destinatario && (
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Destinatario</p>
                  <p className="text-sm font-medium text-gray-800">{data.destinatario}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Eventos</p>
                <p className="text-sm font-medium text-gray-800">{data.historial.length} registros</p>
              </div>
            </div>
          </div>
        </aside>

        <div className="pt-1">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-6">Historial de ruta</p>
          {cronologico.map((entry, i) => (
            <EventRow
              key={i}
              entry={entry}
              index={i}
              isLast={i === cronologico.length - 1}
              isCurrent={i === cronologico.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
