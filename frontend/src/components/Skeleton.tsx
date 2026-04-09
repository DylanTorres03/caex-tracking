function Bar({ w, h = 'h-3' }: { w: string; h?: string }) {
  return <div className={`${h} ${w} bg-gray-100 rounded-sm animate-pulse`} />;
}

function SkeletonEvent({ delay }: { delay: number }) {
  return (
    <div
      className="grid gap-x-6"
      style={{ gridTemplateColumns: '10px 1fr', animationDelay: `${delay}ms` }}
    >
      <div className="flex flex-col items-center">
        <div className="w-2.5 h-2.5 rounded-full bg-gray-100 animate-pulse mt-1" />
        <div className="w-px flex-1 mt-1 bg-gray-100" style={{ minHeight: '48px' }} />
      </div>
      <div className="pb-8 space-y-2">
        <Bar w="w-32" />
        <Bar w="w-48" h="h-4" />
        <Bar w="w-64" />
      </div>
    </div>
  );
}

export default function Skeleton() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-16">
        <div className="border border-gray-100 p-6 space-y-5">
          <Bar w="w-16" />
          <Bar w="w-36" h="h-8" />
          <Bar w="w-24" />
          <div className="border-t border-gray-100 pt-5 space-y-4">
            <div className="space-y-1.5"><Bar w="w-16" /><Bar w="w-40" /></div>
            <div className="space-y-1.5"><Bar w="w-20" /><Bar w="w-44" /></div>
            <div className="space-y-1.5"><Bar w="w-16" /><Bar w="w-12" /></div>
          </div>
        </div>
        <div className="pt-1">
          <Bar w="w-28" />
          <div className="mt-6">
            <SkeletonEvent delay={0} />
            <SkeletonEvent delay={80} />
            <SkeletonEvent delay={160} />
          </div>
        </div>
      </div>
    </div>
  );
}
