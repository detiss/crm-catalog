import type { Crm } from '@/data/crms';
import { DEPLOYMENT_LABEL } from '@/data/crms';
import { PriceMark } from './CrmTable';

interface Props {
  selected: Crm[];
  onRemove: (id: string) => void;
  onClear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
}

export default function CompareTray({ selected, onRemove, onClear, open, setOpen }: Props) {
  if (selected.length === 0) return null;

  const rows: { label: string; render: (c: Crm) => React.ReactNode }[] = [
    { label: 'Для кого', render: (c) => c.bestFor },
    { label: 'Тип', render: (c) => DEPLOYMENT_LABEL[c.deployment] },
    { label: 'Ціновий рівень', render: (c) => <PriceMark level={c.priceLevel} /> },
    { label: 'Тарифи', render: (c) => c.pricingNote },
    { label: 'Ключова фішка', render: (c) => c.keyFeature },
    {
      label: 'Плюси',
      render: (c) => (
        <ul className="space-y-1.5">
          {c.pros.map((p, i) => (
            <li key={i} className="flex gap-2">
              <span className="font-mono font-semibold text-[#3d7a44] dark:text-[#6bbf76]">+</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      label: 'Мінуси',
      render: (c) => (
        <ul className="space-y-1.5">
          {c.cons.map((p, i) => (
            <li key={i} className="flex gap-2">
              <span className="font-mono font-semibold text-[#b03a2e] dark:text-[#e5796c]">−</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      label: 'Інтеграції',
      render: (c) =>
        c.integrations.map((g) => `${g.group}: ${g.items.join(', ')}`).join(' · '),
    },
    {
      label: 'Сайт',
      render: (c) => (
        <a
          href={c.website}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4 hover:no-underline"
        >
          {c.websiteLabel} ↗
        </a>
      ),
    },
  ];

  return (
    <>
      {/* bottom tray */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-foreground bg-foreground text-background">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-3 px-4 py-3 sm:px-8">
          <span className="font-mono text-[10px] uppercase tracking-[1.5px] opacity-70">
            Порівняння ({selected.length}/4)
          </span>
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {selected.map((c) => (
              <button
                key={c.id}
                onClick={() => onRemove(c.id)}
                title="Прибрати"
                className="border border-background/40 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.5px] transition-colors hover:bg-background hover:text-foreground"
              >
                {c.name} ×
              </button>
            ))}
          </div>
          <button
            onClick={onClear}
            className="font-mono text-[10px] uppercase tracking-[1px] opacity-70 underline underline-offset-4 hover:opacity-100"
          >
            Очистити
          </button>
          <button
            onClick={() => setOpen(true)}
            disabled={selected.length < 2}
            className="border border-background bg-background px-5 py-2 font-mono text-[10px] uppercase tracking-[1px] text-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          >
            Порівняти →
          </button>
        </div>
      </div>

      {/* overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background">
          <div className="flex items-center justify-between border-b-2 border-foreground px-4 py-4 sm:px-8">
            <span className="font-mono text-[11px] uppercase tracking-[1.5px]">
              Порівняння {selected.length} систем
            </span>
            <button onClick={() => setOpen(false)} className="btn-outline">
              Закрити ✕
            </button>
          </div>
          <div className="flex-1 overflow-auto px-4 py-6 sm:px-8">
            <table className="w-full border-collapse text-[13px] leading-[155%]">
              <thead>
                <tr>
                  <th className="w-[110px] min-w-[110px] border-b-2 border-foreground pb-3 text-left align-bottom">
                    <span className="label-caps">Критерій</span>
                  </th>
                  {selected.map((c) => (
                    <th
                      key={c.id}
                      className="min-w-[220px] border-b-2 border-foreground pb-3 pl-4 text-left align-bottom"
                    >
                      <span className="text-[16px] font-semibold">{c.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="align-top">
                    <td className="border-b border-border py-4 pr-3">
                      <span className="label-caps">{row.label}</span>
                    </td>
                    {selected.map((c) => (
                      <td key={c.id} className="border-b border-border py-4 pl-4 pr-6">
                        {row.render(c)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
