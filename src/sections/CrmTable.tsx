import type { Crm } from '@/data/crms';
import { DEPLOYMENT_LABEL } from '@/data/crms';

export function PriceMark({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span className="font-mono text-[12px] tracking-[2px]" title={`Ціновий рівень ${level}/3`}>
      {[1, 2, 3].map((i) => (
        <span key={i} className={i <= level ? 'text-foreground' : 'text-foreground/20'}>
          ₴
        </span>
      ))}
    </span>
  );
}

export function CompareBox({
  checked,
  disabled,
  onToggle,
}: {
  checked: boolean;
  disabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      disabled={disabled && !checked}
      title={disabled && !checked ? 'Максимум 4 системи' : 'Додати до порівняння'}
      className={`flex h-[16px] w-[16px] shrink-0 items-center justify-center border transition-colors ${
        checked
          ? 'border-foreground bg-foreground'
          : disabled
            ? 'cursor-not-allowed border-foreground/20'
            : 'border-foreground/40 hover:border-foreground'
      }`}
    >
      {checked && (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M1.5 5.5L4 8L8.5 2" stroke="#fdfaf6" strokeWidth="1.8" />
        </svg>
      )}
    </button>
  );
}

function ExpandedDetails({ crm }: { crm: Crm }) {
  return (
    <div className="border-t border-dashed border-foreground/20 bg-[#faf6ec] px-5 py-6 sm:px-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="label-caps mb-3">Плюси</div>
          <ul className="space-y-2">
            {crm.pros.map((pro, i) => (
              <li key={i} className="flex gap-2.5 text-[13px] leading-[150%]">
                <span className="font-mono text-[12px] font-semibold text-[#3d7a44]">+</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="label-caps mb-3">Мінуси</div>
          <ul className="space-y-2">
            {crm.cons.map((con, i) => (
              <li key={i} className="flex gap-2.5 text-[13px] leading-[150%]">
                <span className="font-mono text-[12px] font-semibold text-[#b03a2e]">−</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <div className="label-caps mb-3">Інтеграції</div>
        <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {crm.integrations.map((g) => (
            <div key={g.group} className="text-[12px] leading-[160%]">
              <span className="font-mono text-[10px] uppercase tracking-[1px] text-muted-foreground">
                {g.group}:{' '}
              </span>
              {g.items.join(', ')}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
        <p className="max-w-xl text-[12px] leading-[160%] text-muted-foreground">
          <span className="label-caps mr-2">Тарифи</span>
          {crm.pricingNote}
        </p>
        <a href={crm.website} target="_blank" rel="noreferrer" className="btn-outline">
          {crm.websiteLabel} ↗
        </a>
      </div>
    </div>
  );
}

interface TableProps {
  crms: Crm[];
  expandedId: string | null;
  onExpand: (id: string | null) => void;
  compare: string[];
  onCompare: (id: string) => void;
}

export default function CrmTable({ crms, expandedId, onExpand, compare, onCompare }: TableProps) {
  return (
    <div>
      <div className="hidden grid-cols-[24px_minmax(0,1fr)_130px_90px_70px] items-end gap-4 border-b-2 border-foreground pb-2 md:grid">
        <span />
        <span className="label-caps">CRM-система</span>
        <span className="label-caps">Тип</span>
        <span className="label-caps">Ціна</span>
        <span className="label-caps text-right">Порівняти</span>
      </div>

      {crms.map((crm, idx) => {
        const expanded = expandedId === crm.id;
        const checked = compare.includes(crm.id);
        return (
          <div key={crm.id} className="border-b border-border">
            <div
              onClick={() => onExpand(expanded ? null : crm.id)}
              className={`row-hover grid cursor-pointer grid-cols-[24px_minmax(0,1fr)_auto] items-start gap-3 py-5 pr-1 md:grid-cols-[24px_minmax(0,1fr)_130px_90px_70px] md:items-center md:gap-4 ${
                expanded ? 'bg-[rgba(242,226,151,0.35)]' : ''
              }`}
            >
              <span className="pt-1 text-right font-mono text-[11px] text-muted-foreground md:pt-0">
                {String(idx + 1).padStart(2, '0')}
              </span>

              <div className="min-w-0 pl-2">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="text-[17px] font-semibold leading-[120%]">{crm.name}</h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.5px] text-muted-foreground md:hidden">
                    {DEPLOYMENT_LABEL[crm.deployment]}
                  </span>
                </div>
                <p className="mt-1 max-w-2xl text-[12.5px] leading-[150%] text-muted-foreground">
                  {crm.tagline}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  <span className="tag-chip border-foreground/50 text-foreground">{crm.bestFor.split(',')[0]}</span>
                  {crm.tags.slice(0, 4).map((t) => (
                    <span key={t} className="tag-chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="hidden text-[12.5px] md:block">{DEPLOYMENT_LABEL[crm.deployment]}</div>

              <div className="hidden md:block">
                <PriceMark level={crm.priceLevel} />
              </div>

              <div className="flex items-start justify-end gap-3 pt-1 md:items-center md:pt-0">
                <span
                  className={`font-mono text-[13px] transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                >
                  ↓
                </span>
                <CompareBox
                  checked={checked}
                  disabled={compare.length >= 4}
                  onToggle={() => onCompare(crm.id)}
                />
              </div>
            </div>

            {expanded && <ExpandedDetails crm={crm} />}
          </div>
        );
      })}

      {crms.length === 0 && (
        <div className="py-16 text-center">
          <p className="font-mono text-[12px] uppercase tracking-[1px] text-muted-foreground">
            Нічого не знайдено — послабте фільтри
          </p>
        </div>
      )}
    </div>
  );
}
