import { SEGMENTS, FEATURE_TAGS, type Deployment } from '@/data/crms';

interface Props {
  segSel: Set<string>;
  tagSel: Set<string>;
  depSel: Set<Deployment>;
  toggleSeg: (s: string) => void;
  toggleTag: (t: string) => void;
  toggleDep: (d: Deployment) => void;
  reset: () => void;
  activeCount: number;
}

function CheckRow({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="group flex w-full items-center gap-2.5 py-[5px] text-left text-[13px]"
    >
      <span
        className={`flex h-[14px] w-[14px] shrink-0 items-center justify-center border transition-colors ${
          checked
            ? 'border-foreground bg-foreground'
            : 'border-foreground/40 group-hover:border-foreground'
        }`}
      >
        {checked && (
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
            <path d="M1.5 5.5L4 8L8.5 2" className="stroke-background" strokeWidth="1.8" />
          </svg>
        )}
      </span>
      <span className={checked ? 'font-medium' : 'text-foreground/75 group-hover:text-foreground'}>
        {label}
      </span>
    </button>
  );
}

export default function FilterPanel(p: Props) {
  return (
    <div className="space-y-8">
      <div className="flex items-baseline justify-between">
        <span className="label-caps">Фільтри {p.activeCount > 0 && `(${p.activeCount})`}</span>
        {p.activeCount > 0 && (
          <button
            onClick={p.reset}
            className="font-mono text-[10px] uppercase tracking-[1px] underline underline-offset-4 hover:no-underline"
          >
            Скинути
          </button>
        )}
      </div>

      <div>
        <div className="label-caps mb-2.5 border-b border-border pb-2">Для кого</div>
        {SEGMENTS.map((s) => (
          <CheckRow key={s} label={s} checked={p.segSel.has(s)} onToggle={() => p.toggleSeg(s)} />
        ))}
      </div>

      <div>
        <div className="label-caps mb-2.5 border-b border-border pb-2">Тип рішення</div>
        <CheckRow label="Хмара" checked={p.depSel.has('cloud')} onToggle={() => p.toggleDep('cloud')} />
        <CheckRow label="Коробка (on-premise)" checked={p.depSel.has('box')} onToggle={() => p.toggleDep('box')} />
      </div>

      <div>
        <div className="label-caps mb-2.5 border-b border-border pb-2">Можливості</div>
        {FEATURE_TAGS.map((t) => (
          <CheckRow key={t} label={t} checked={p.tagSel.has(t)} onToggle={() => p.toggleTag(t)} />
        ))}
      </div>
    </div>
  );
}
