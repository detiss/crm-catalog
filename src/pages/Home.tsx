import { useMemo, useState } from 'react';
import { CRMS, type Crm, type Deployment } from '@/data/crms';
import FilterPanel from '@/sections/FilterPanel';
import CrmTable from '@/sections/CrmTable';
import CompareTray from '@/sections/CompareTray';
import Glossary from '@/sections/Glossary';
import ThemeToggle from '@/sections/ThemeToggle';
import AddCrmDialog from '@/sections/AddCrmDialog';
import { COMMUNITY_CRMS } from '@/data/community';

type SortMode = 'name' | 'price';

const STORE = 'custom-crms';
function loadCustom(): Crm[] {
  try {
    const v = JSON.parse(localStorage.getItem(STORE) || '[]');
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export default function Home() {
  const [custom, setCustom] = useState<Crm[]>(loadCustom);
  const [adding, setAdding] = useState(false);
  const all = useMemo(() => [...CRMS, ...COMMUNITY_CRMS, ...custom], [custom]);
  const saveCustom = (list: Crm[]) => {
    setCustom(list);
    try { localStorage.setItem(STORE, JSON.stringify(list)); } catch { /* ignore */ }
  };
  const [search, setSearch] = useState('');
  const [segSel, setSegSel] = useState<Set<string>>(new Set());
  const [tagSel, setTagSel] = useState<Set<string>>(new Set());
  const [depSel, setDepSel] = useState<Set<Deployment>>(new Set());
  const [sort, setSort] = useState<SortMode>('name');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [compare, setCompare] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleIn = <T,>(set: Set<T>, v: T, setter: (s: Set<T>) => void) => {
    const next = new Set(set);
    if (next.has(v)) next.delete(v);
    else next.add(v);
    setter(next);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = all.filter((c) => {
      if (q && !(c.name + ' ' + c.tagline + ' ' + c.bestFor).toLowerCase().includes(q)) return false;
      if (segSel.size > 0 && !c.segments.some((s) => segSel.has(s))) return false;
      if (tagSel.size > 0 && !c.tags.some((t) => tagSel.has(t))) return false;
      if (depSel.size > 0) {
        const ok =
          (depSel.has('cloud') && (c.deployment === 'cloud' || c.deployment === 'both')) ||
          (depSel.has('box') && (c.deployment === 'box' || c.deployment === 'both'));
        if (!ok) return false;
      }
      return true;
    });
    list = [...list].sort((a, b) =>
      sort === 'name'
        ? a.name.localeCompare(b.name, 'uk')
        : a.priceLevel - b.priceLevel || a.name.localeCompare(b.name, 'uk'),
    );
    return list;
  }, [all, search, segSel, tagSel, depSel, sort]);

  const activeCount =
    segSel.size + tagSel.size + depSel.size + (search.trim() ? 1 : 0);

  const reset = () => {
    setSegSel(new Set());
    setTagSel(new Set());
    setDepSel(new Set());
    setSearch('');
  };

  const onCompare = (id: string) => {
    setCompare((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length >= 4 ? prev : [...prev, id],
    );
  };

  const selectedCrms = all.filter((c) => compare.includes(c.id));

  const filterPanel = (
    <FilterPanel
      segSel={segSel}
      tagSel={tagSel}
      depSel={depSel}
      toggleSeg={(s) => toggleIn(segSel, s, setSegSel)}
      toggleTag={(t) => toggleIn(tagSel, t, setTagSel)}
      toggleDep={(d) => toggleIn(depSel, d, setDepSel)}
      reset={reset}
      activeCount={activeCount}
    />
  );

  return (
    <div className="min-h-screen pb-24">
      {/* header */}
      <header className="sticky top-0 z-30 border-b-2 border-foreground bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-8 gap-y-3 px-4 py-4 sm:px-8">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[2px] text-muted-foreground">
              Агрегатор · {all.length} систем · UA
            </div>
            <h1 className="text-[22px] font-bold leading-[110%] tracking-[-0.5px]">
              CRM-Каталог
            </h1>
          </div>
          <div className="flex flex-1 items-center justify-end gap-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Пошук CRM…"
              className="w-full max-w-[260px] border-b border-foreground/40 bg-transparent py-1.5 text-[13px] outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
            />
            <button className="btn-outline !px-3 !py-2" onClick={() => setAdding(true)}>
              + Додати CRM
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-4 sm:px-8">
        {/* intro */}
        <section className="max-w-3xl pb-10 pt-10 sm:pt-14">
          <p className="text-[15px] leading-[165%] text-foreground/80">
            <span className="font-mono text-[10px] uppercase tracking-[1.5px] text-muted-foreground">
              (Про каталог){' '}
            </span>
            Українські CRM-системи в одній таблиці: для кого створена кожна, хмара чи коробка,
            ключова фішка, плюси й мінуси. Відфільтруйте за своїми критеріями, розгорніть рядок
            для деталей або порівняйте до чотирьох систем напряму.
          </p>
        </section>

        {/* mobile filters toggle */}
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="btn-outline mb-6 lg:hidden"
        >
          {filtersOpen ? 'Сховати фільтри ↑' : `Фільтри ${activeCount > 0 ? `(${activeCount})` : ''} ↓`}
        </button>
        {filtersOpen && <div className="mb-8 lg:hidden">{filterPanel}</div>}

        <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
          {/* sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-[92px]">{filterPanel}</div>
          </aside>

          {/* content */}
          <section>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[11px] text-muted-foreground">
                Знайдено: {filtered.length}
              </span>
              <div className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[1px]">
                <span className="mr-2 text-muted-foreground">Сортувати</span>
                <button
                  onClick={() => setSort('name')}
                  className={`px-3 py-1.5 transition-colors ${
                    sort === 'name' ? 'bg-foreground text-background' : 'hover:bg-secondary'
                  }`}
                >
                  За назвою
                </button>
                <button
                  onClick={() => setSort('price')}
                  className={`px-3 py-1.5 transition-colors ${
                    sort === 'price' ? 'bg-foreground text-background' : 'hover:bg-secondary'
                  }`}
                >
                  За ціною
                </button>
              </div>
            </div>

            <CrmTable
              crms={filtered}
              expandedId={expandedId}
              onExpand={setExpandedId}
              compare={compare}
              onCompare={onCompare}
              customIds={new Set(custom.map((c) => c.id))}
              onDelete={(id) => saveCustom(custom.filter((c) => c.id !== id))}
            />
          </section>
        </div>

        <Glossary />
        {adding && (
          <AddCrmDialog
            onClose={() => setAdding(false)}
            hasCustom={custom.length > 0}
            onClear={() => saveCustom([])}
            onSave={(c) => saveCustom([...custom.filter((x) => x.id !== c.id), c])}
          />
        )}

        {/* footer note */}
        <footer className="mt-16 border-t border-border pt-6">
          <p className="max-w-2xl text-[11.5px] leading-[160%] text-muted-foreground">
            Дані узагальнено з відкритих оглядів та сайтів вендорів; тарифи та функціонал змінюються —
            перевіряйте актуальні умови на офіційних сайтах систем.
          </p>
          <div className="mt-4 font-mono text-[10px] uppercase tracking-[2px] text-muted-foreground">
            CRM-Каталог · Україна
          </div>
        </footer>
      </main>

      <CompareTray
        selected={selectedCrms}
        onRemove={(id) => setCompare((p) => p.filter((x) => x !== id))}
        onClear={() => setCompare([])}
        open={compareOpen}
        setOpen={setCompareOpen}
      />
    </div>
  );
}
