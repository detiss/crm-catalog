import { useMemo, useState } from 'react';
import { CRMS, type Crm, type Deployment } from '@/data/crms';
import FilterPanel from '@/sections/FilterPanel';
import CrmTable from '@/sections/CrmTable';
import CompareTray from '@/sections/CompareTray';
import Glossary from '@/sections/Glossary';
import ThemeToggle from '@/sections/ThemeToggle';
import LangSwitch from '@/sections/LangSwitch';
import { useLang } from '@/i18n';
import AddCrmDialog from '@/sections/AddCrmDialog';
import { COMMUNITY_CRMS } from '@/data/community';

type SortMode = 'name' | 'price';

const STORE = 'custom-crms';
const BASE_IDS = new Set([...CRMS, ...COMMUNITY_CRMS].map((c) => c.id));
function dedupe(list: Crm[]): Crm[] {
  const seen = new Set<string>();
  return list.filter((c) => (seen.has(c.id) ? false : (seen.add(c.id), true)));
}

function loadCustom(): Crm[] {
  try {
    const v = JSON.parse(localStorage.getItem(STORE) || '[]');
    if (!Array.isArray(v)) return [];
    // відкидаємо пошкоджені записи, щоб вони не «ламали» сторінку
    return v.filter(
      (c) =>
        c && typeof c.id === 'string' && typeof c.name === 'string' &&
        [c.segments, c.tags, c.pros, c.cons, c.integrations].every(Array.isArray) &&
        [1, 2, 3].includes(c.priceLevel),
    );
  } catch {
    return [];
  }
}

export default function Home() {
  const { lang, t, crm: loc } = useLang();
  const locale = lang === 'en' ? 'en' : 'uk';
  const [custom, setCustom] = useState<Crm[]>(loadCustom);
  const [adding, setAdding] = useState(false);
  const all = useMemo(() => dedupe([...CRMS, ...COMMUNITY_CRMS, ...custom]), [custom]);
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
      if (q) {
        // шукаємо і в оригінальному, і в перекладеному тексті
        const v = loc(c);
        const hay = `${c.name} ${c.tagline} ${c.bestFor} ${v.tagline} ${v.bestFor}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
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
        ? a.name.localeCompare(b.name, locale)
        : a.priceLevel - b.priceLevel || a.name.localeCompare(b.name, locale),
    );
    return list;
  }, [all, search, segSel, tagSel, depSel, sort, loc, locale]);

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
              {t.aggregator(all.length)}
            </div>
            <h1 className="text-[22px] font-bold leading-[110%] tracking-[-0.5px]">
              {t.heading}
            </h1>
          </div>
          <div className="flex w-full flex-wrap items-center justify-start gap-x-3 gap-y-2 sm:w-auto sm:flex-1 sm:justify-end">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full max-w-[260px] border-b border-foreground/40 bg-transparent py-1.5 text-[13px] outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
            />
            <button className="btn-outline whitespace-nowrap !px-3 !py-2" onClick={() => setAdding(true)}>
              {t.addCrm}
            </button>
            <ThemeToggle />
            <LangSwitch />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-4 sm:px-8">
        {/* intro */}
        <section className="max-w-3xl pb-10 pt-10 sm:pt-14">
          <p className="text-[15px] leading-[165%] text-foreground/80">
            <span className="font-mono text-[10px] uppercase tracking-[1.5px] text-muted-foreground">
              {t.aboutLabel}{' '}
            </span>
            {t.intro}
          </p>
        </section>

        {/* mobile filters toggle */}
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="btn-outline mb-6 lg:hidden"
        >
          {filtersOpen ? t.filtersHide : t.filtersShow(activeCount)}
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
                {t.found} {filtered.length}
              </span>
              <div className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[1px]">
                <span className="mr-2 text-muted-foreground">{t.sort}</span>
                <button
                  onClick={() => setSort('name')}
                  className={`px-3 py-1.5 transition-colors ${
                    sort === 'name' ? 'bg-foreground text-background' : 'hover:bg-secondary'
                  }`}
                >
                  {t.sortName}
                </button>
                <button
                  onClick={() => setSort('price')}
                  className={`px-3 py-1.5 transition-colors ${
                    sort === 'price' ? 'bg-foreground text-background' : 'hover:bg-secondary'
                  }`}
                >
                  {t.sortPrice}
                </button>
              </div>
            </div>

            <CrmTable
              crms={filtered}
              expandedId={expandedId}
              onExpand={setExpandedId}
              compare={compare}
              onCompare={onCompare}
              customIds={new Set(custom.filter((c) => !BASE_IDS.has(c.id)).map((c) => c.id))}
              onDelete={(id) => {
                saveCustom(custom.filter((c) => c.id !== id));
                setCompare((p) => p.filter((x) => x !== id));
                setExpandedId(null);
              }}
            />
          </section>
        </div>

        <Glossary />
        {adding && (
          <AddCrmDialog
            onClose={() => setAdding(false)}
            existing={all}
            hasCustom={custom.length > 0}
            onClear={() => saveCustom([])}
            onSave={(c) => saveCustom([...custom.filter((x) => x.id !== c.id), c])}
          />
        )}

        {/* footer note */}
        <footer className="mt-16 border-t border-border pt-6">
          <p className="max-w-2xl text-[11.5px] leading-[160%] text-muted-foreground">
            {t.footerNote}
          </p>
          <div className="mt-4 font-mono text-[10px] uppercase tracking-[2px] text-muted-foreground">
            {t.footerTitle}
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
