import { useState } from 'react';
import { useLang } from '@/i18n';

export default function Glossary() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  return (
    <section className="mt-16 border-t border-border pt-6">
      <button onClick={() => setOpen(!open)} className="btn-outline">
        {open ? t.glossaryHide : t.glossaryShow}
      </button>
      {open && (
        <dl className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2">
          {t.glossary.map((g) => (
            <div key={g.term}>
              <dt className="label-caps mb-1">{g.term}</dt>
              <dd className="text-[13px] leading-[160%] text-foreground/80">{g.text}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
