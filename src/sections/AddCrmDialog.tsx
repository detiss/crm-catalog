import { useEffect, useState } from 'react';
import { SEGMENTS, FEATURE_TAGS, type Crm, type Deployment } from '@/data/crms';
import { useLang } from '@/i18n';

const REPO = 'https://github.com/detiss/crm-catalog';
const t = (s: string) => s.replace(/`/g, "'").trim(); // зворотні лапки ламають розмітку Issue
const lines = (s: string) => s.split('\n').map(t).filter(Boolean);
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9а-яіїєґ]/g, '');
const host = (u: string) => u.toLowerCase().replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9а-яіїєґ]+/gi, '-').replace(/^-|-$/g, '') || 'crm';
const toggle = (arr: string[], v: string) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

const field = 'w-full border border-border bg-background px-3 py-2 text-[13px] outline-none focus:border-foreground';

interface Props {
  onClose: () => void;
  onSave: (c: Crm) => void;
  onClear: () => void;
  hasCustom: boolean;
  existing: Crm[];
}

export default function AddCrmDialog({ onClose, onSave, onClear, hasCustom, existing }: Props) {
  const { t: tx, seg, tag, dep } = useLang();
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [bestFor, setBestFor] = useState('');
  const [keyFeature, setKeyFeature] = useState('');
  const [pricingNote, setPricingNote] = useState('');
  const [website, setWebsite] = useState('');
  const [deployment, setDeployment] = useState<Deployment>('cloud');
  const [priceLevel, setPriceLevel] = useState<1 | 2 | 3>(1);
  const [segments, setSegments] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [pros, setPros] = useState('');
  const [cons, setCons] = useState('');
  const [integr, setIntegr] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  function build(): Crm | null {
    if (!name.trim() || segments.length === 0) {
      setError(tx.errRequired);
      return null;
    }
    const site = website.trim();
    const url = site && !/^https?:\/\//.test(site) ? `https://${site}` : site;
    if (url) {
      try {
        if (!new URL(url).hostname.includes('.')) throw new Error();
      } catch {
        setError(tx.errUrl);
        return null;
      }
    }
    const dup = existing.find(
      (c) => norm(c.name) === norm(name) || (url && c.website && host(c.website) === host(url)),
    );
    if (dup) {
      setError(tx.errDup(dup.name));
      return null;
    }
    setError('');
    const items = integr.split(',').map(t).filter(Boolean);
    return {
      id: slug(name),
      name: t(name),
      tagline: t(tagline),
      bestFor: t(bestFor),
      segments,
      deployment,
      keyFeature: t(keyFeature),
      priceLevel,
      pricingNote: t(pricingNote),
      tags,
      pros: lines(pros),
      cons: lines(cons),
      integrations: items.length ? [{ group: 'Основні', items }] : [],
      website: url,
      websiteLabel: url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
    };
  }

  function save() {
    const c = build();
    if (c) {
      onSave(c);
      onClose();
    }
  }

  function suggest() {
    const c = build();
    if (!c) return;
    const json = JSON.stringify(c, null, 2) + ',';
    const title = encodeURIComponent(tx.issueTitle(c.name));
    const full = tx.issueBody(c.name, c.website, json);
    let url = `${REPO}/issues/new?title=${title}&body=${encodeURIComponent(full)}`;
    if (url.length > 7000) {
      // GitHub не приймає надто довгі посилання: копіюємо дані в буфер обміну
      navigator.clipboard?.writeText(json).catch(() => {});
      const short = tx.issueShort(c.name);
      url = `${REPO}/issues/new?title=${title}&body=${encodeURIComponent(short)}`;
      setNotice(tx.clipboardNotice);
    }
    window.open(url, '_blank');
  }

  const Chips = ({ list, sel, set, label }: { list: readonly string[]; sel: string[]; set: (v: string[]) => void; label: (s: string) => string }) => (
    <div className="flex flex-wrap gap-2">
      {list.map((v) => (
        <button
          type="button"
          key={v}
          onClick={() => set(toggle(sel, v))}
          className={`border px-2 py-1 text-[12px] ${sel.includes(v) ? 'border-foreground bg-foreground text-background' : 'border-border'}`}
        >
          {label(v)}
        </button>
      ))}
    </div>
  );
  const L = ({ children }: { children: string }) => <div className="label-caps mb-1 mt-4">{children}</div>;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4" onClick={onClose}>
      <div className="my-8 w-full max-w-[640px] border-2 border-foreground bg-background p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-bold">{tx.dlgTitle}</h2>
          <button onClick={onClose} aria-label={tx.closeAria} className="text-[20px] leading-none">×</button>
        </div>

        <L>{tx.fName}</L>
        <input maxLength={60} className={field} value={name} onChange={(e) => setName(e.target.value)} />
        <L>{tx.fTagline}</L>
        <input maxLength={200} className={field} value={tagline} onChange={(e) => setTagline(e.target.value)} />
        <L>{tx.fBestFor}</L>
        <input maxLength={200} className={field} value={bestFor} onChange={(e) => setBestFor(e.target.value)} />
        <L>{tx.fSegments}</L>
        <Chips list={SEGMENTS} sel={segments} set={setSegments} label={seg} />
        <L>{tx.fDeployment}</L>
        <select className={field} value={deployment} onChange={(e) => setDeployment(e.target.value as Deployment)}>
          {(['cloud', 'box', 'both'] as Deployment[]).map((d) => (
            <option key={d} value={d}>{dep(d)}</option>
          ))}
        </select>
        <L>{tx.fPrice}</L>
        <select className={field} value={priceLevel} onChange={(e) => setPriceLevel(Number(e.target.value) as 1 | 2 | 3)}>
          <option value={1}>{tx.price1}</option>
          <option value={2}>{tx.price2}</option>
          <option value={3}>{tx.price3}</option>
        </select>
        <L>{tx.fPricingNote}</L>
        <input maxLength={200} className={field} value={pricingNote} onChange={(e) => setPricingNote(e.target.value)} />
        <L>{tx.fKeyFeature}</L>
        <input maxLength={200} className={field} value={keyFeature} onChange={(e) => setKeyFeature(e.target.value)} />
        <L>{tx.fTags}</L>
        <Chips list={FEATURE_TAGS} sel={tags} set={setTags} label={tag} />
        <L>{tx.fPros}</L>
        <textarea maxLength={800} className={field} rows={3} value={pros} onChange={(e) => setPros(e.target.value)} />
        <L>{tx.fCons}</L>
        <textarea maxLength={800} className={field} rows={3} value={cons} onChange={(e) => setCons(e.target.value)} />
        <L>{tx.fIntegr}</L>
        <input maxLength={200} className={field} value={integr} onChange={(e) => setIntegr(e.target.value)} placeholder={tx.integrPlaceholder} />
        <L>{tx.fSite}</L>
        <input maxLength={200} className={field} value={website} onChange={(e) => setWebsite(e.target.value)} placeholder={tx.sitePlaceholder} />

        {error && <p className="mt-4 text-[13px] text-destructive">{error}</p>}
        {notice && <p className="mt-4 text-[13px]">{notice}</p>}

        <div className="mt-6 flex flex-wrap gap-3">
          <button className="btn-outline" onClick={save}>{tx.saveLocal}</button>
          <button className="btn-outline" onClick={suggest}>{tx.sendGithub}</button>
        </div>
        <p className="mt-3 text-[12px] text-muted-foreground">
          {tx.dlgHelp}
        </p>
        {hasCustom && (
          <button className="mt-3 text-[12px] underline" onClick={() => { onClear(); onClose(); }}>
            {tx.clearMine}
          </button>
        )}
      </div>
    </div>
  );
}
