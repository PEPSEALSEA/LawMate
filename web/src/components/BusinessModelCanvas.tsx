import { SectionHeading } from '@/components/SectionHeading'
import { businessModel } from '@/data/content'
import { cn } from '@/lib/cn'

function CanvasCard({
  title,
  items,
  className,
  emphasis = false,
}: {
  title: string
  items: string[]
  className?: string
  emphasis?: boolean
}) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-2xl border p-5',
        emphasis
          ? 'border-brand-700/20 bg-brand-900 text-white'
          : 'border-black/5 bg-white text-ink',
        className,
      )}
    >
      <h3
        className={cn(
          'text-xs font-bold tracking-wide uppercase',
          emphasis ? 'text-brand-100' : 'text-brand-700',
        )}
      >
        {title}
      </h3>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed">
        {items.map((item) => (
          <li key={item} className={cn('flex gap-2', emphasis ? 'text-brand-50' : 'text-muted')}>
            <span
              className={cn(
                'mt-1.5 size-1 shrink-0 rounded-full',
                emphasis ? 'bg-brand-200' : 'bg-brand-700/50',
              )}
              aria-hidden
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function BusinessModelCanvas() {
  const b = businessModel
  return (
    <section id="business-model" className="bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Business Model Canvas"
          title="โมเดลธุรกิจของ LawMate"
          body="สรุปภาพรวมว่าเราสร้างคุณค่า ส่งมอบ และสร้างรายได้อย่างไร"
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-5">
          <div className="grid grid-cols-1 gap-4 md:col-span-1">
            <CanvasCard title={b.keyPartners.title} items={b.keyPartners.items} className="h-full" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:col-span-1">
            <CanvasCard title={b.keyActivities.title} items={b.keyActivities.items} />
            <CanvasCard title={b.keyResources.title} items={b.keyResources.items} />
          </div>

          <div className="md:col-span-1">
            <CanvasCard
              title={b.valueProposition.title}
              items={b.valueProposition.items}
              emphasis
              className="h-full"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:col-span-1">
            <CanvasCard title={b.customerRelationships.title} items={b.customerRelationships.items} />
            <CanvasCard title={b.channels.title} items={b.channels.items} />
          </div>

          <div className="grid grid-cols-1 gap-4 md:col-span-1">
            <CanvasCard title={b.customerSegments.title} items={b.customerSegments.items} className="h-full" />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <CanvasCard title={b.costStructure.title} items={b.costStructure.items} />
          <div className="flex flex-col rounded-2xl border border-black/5 bg-white p-5">
            <h3 className="text-xs font-bold tracking-wide text-brand-700 uppercase">
              {b.revenueStreams.title}
            </h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold text-ink">B2C</p>
                <ul className="mt-2 space-y-2 text-sm leading-relaxed text-muted">
                  {b.revenueStreams.b2c.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-brand-700/50" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-ink">B2B</p>
                <ul className="mt-2 space-y-2 text-sm leading-relaxed text-muted">
                  {b.revenueStreams.b2b.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-brand-700/50" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
