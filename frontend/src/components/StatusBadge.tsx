interface StatusBadgeProps {
  status: string;
}

function getStatusStyle(status: string) {
  if (status === 'Entregado') return { dot: '#22c55e', label: 'text-green-600' };
  if (status === 'Retenido en Aduana') return { dot: '#ef4444', label: 'text-red-500' };
  if (['En Tránsito', 'En Reparto'].includes(status)) return { dot: '#f59e0b', label: 'text-amber-500' };
  return { dot: '#94a3b8', label: 'text-slate-500' };
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { dot, label } = getStatusStyle(status);
  return (
    <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${label}`}>
      <span
        className="inline-block w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: dot }}
      />
      {status}
    </span>
  );
}
