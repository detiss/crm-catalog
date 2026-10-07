import { useState } from 'react';
import { SEGMENTS, FEATURE_TAGS, DEPLOYMENT_LABEL, type Crm, type Deployment } from '@/data/crms';

const REPO = 'https://github.com/detiss/crm-catalog';
const lines = (s: string) => s.split('\n').map((x) => x.trim()).filter(Boolean);
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9а-яіїєґ]+/gi, '-').replace(/^-|-$/g, '') || 'crm';
const toggle = (arr: string[], v: string) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

const field = 'w-full border border-border bg-background px-3 py-2 text-[13px] outline-none focus:border-foreground';

interface Props {
  onClose: () => void;
  onSave: (c: Crm) => void;
  onClear: () => void;
  hasCustom: boolean;
}

export default function AddCrmDialog({ onClose, onSave, onClear, hasCustom }: Props) {
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

  function build(): Crm | null {
    if (!name.trim() || segments.length === 0) {
      setError('Вкажіть назву та оберіть хоча б один сегмент «Для кого».');
      return null;
    }
    setError('');
    const url = website.trim() && !/^https?:\/\//.test(website.trim()) ? `https://${website.trim()}` : website.trim();
    const items = integr.split(',').map((x) => x.trim()).filter(Boolean);
    return {
      id: slug(name),
      name: name.trim(),
      tagline: tagline.trim(),
      bestFor: bestFor.trim(),
      segments,
      deployment,
      keyFeature: keyFeature.trim(),
      priceLevel,
      pricingNote: pricingNote.trim(),
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
    const body =
      `Пропозиція нової CRM: **${c.name}**\n\n` +
      `Сайт: ${c.website || '—'}\n\n` +
      `Готовий об'єкт для вставки в масив \`CRMS\` у \`src/data/crms.ts\`:\n\n` +
      '```ts\n' + JSON.stringify(c, null, 2) + ',\n```\n';
    window.open(
      `${REPO}/issues/new?title=${encodeURIComponent('Нова CRM: ' + c.name)}&body=${encodeURIComponent(body)}`,
      '_blank',
    );
  }

  const Chips = ({ list, sel, set }: { list: readonly string[]; sel: string[]; set: (v: string[]) => void }) => (
    <div className="flex flex-wrap gap-2">
      {list.map((t) => (
        <button
          type="button"
          key={t}
          onClick={() => set(toggle(sel, t))}
          className={`border px-2 py-1 text-[12px] ${sel.includes(t) ? 'border-foreground bg-foreground text-background' : 'border-border'}`}
        >
          {t}
        </button>
      ))}
    </div>
  );
  const L = ({ children }: { children: string }) => <div className="label-caps mb-1 mt-4">{children}</div>;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4" onClick={onClose}>
      <div className="my-8 w-full max-w-[640px] border-2 border-foreground bg-background p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-bold">Додати CRM-систему власноруч</h2>
          <button onClick={onClose} aria-label="Закрити" className="text-[20px] leading-none">×</button>
        </div>

        <L>Назва *</L>
        <input className={field} value={name} onChange={(e) => setName(e.target.value)} />
        <L>Короткий опис</L>
        <input className={field} value={tagline} onChange={(e) => setTagline(e.target.value)} />
        <L>Для кого підходить (текстом)</L>
        <input className={field} value={bestFor} onChange={(e) => setBestFor(e.target.value)} />
        <L>Для кого: сегменти *</L>
        <Chips list={SEGMENTS} sel={segments} set={setSegments} />
        <L>Тип рішення</L>
        <select className={field} value={deployment} onChange={(e) => setDeployment(e.target.value as Deployment)}>
          {(Object.keys(DEPLOYMENT_LABEL) as Deployment[]).map((d) => (
            <option key={d} value={d}>{DEPLOYMENT_LABEL[d]}</option>
          ))}
        </select>
        <L>Ціновий рівень</L>
        <select className={field} value={priceLevel} onChange={(e) => setPriceLevel(Number(e.target.value) as 1 | 2 | 3)}>
          <option value={1}>₴ — доступно</option>
          <option value={2}>₴₴ — середній</option>
          <option value={3}>₴₴₴ — корпоративний</option>
        </select>
        <L>Ціни / тарифи (коментар)</L>
        <input className={field} value={pricingNote} onChange={(e) => setPricingNote(e.target.value)} />
        <L>Ключова особливість</L>
        <input className={field} value={keyFeature} onChange={(e) => setKeyFeature(e.target.value)} />
        <L>Можливості (теги)</L>
        <Chips list={FEATURE_TAGS} sel={tags} set={setTags} />
        <L>Плюси (кожен з нового рядка)</L>
        <textarea className={field} rows={3} value={pros} onChange={(e) => setPros(e.target.value)} />
        <L>Мінуси (кожен з нового рядка)</L>
        <textarea className={field} rows={3} value={cons} onChange={(e) => setCons(e.target.value)} />
        <L>Інтеграції (через кому)</L>
        <input className={field} value={integr} onChange={(e) => setIntegr(e.target.value)} placeholder="Нова Пошта, Rozetka, LiqPay" />
        <L>Сайт</L>
        <input className={field} value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="example.com.ua" />

        {error && <p className="mt-4 text-[13px] text-destructive">{error}</p>}

        <div className="mt-6 flex flex-wrap gap-3">
          <button className="btn-outline" onClick={save}>Зберегти у себе</button>
          <button className="btn-outline" onClick={suggest}>Надіслати пропозицію на GitHub ↗</button>
        </div>
        <p className="mt-3 text-[12px] text-muted-foreground">
          «Зберегти у себе» — система з'явиться в таблиці лише у вашому браузері. «Надіслати» відкриє
          GitHub з уже заповненою пропозицією (потрібен акаунт GitHub), автор додасть її в каталог для всіх.
        </p>
        {hasCustom && (
          <button className="mt-3 text-[12px] underline" onClick={() => { onClear(); onClose(); }}>
            Видалити всі мої додані CRM
          </button>
        )}
      </div>
    </div>
  );
}
