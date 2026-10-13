import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Crm, Deployment } from '@/data/crms';
import { localizeCrm, SEGMENT_EN, TAG_EN } from '@/data/crms.en';
import { en, uk, type Dict } from './dict';

export type Lang = 'uk' | 'en';
const KEY = 'lang';

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'uk' || saved === 'en') return saved;
  } catch { /* localStorage недоступний */ }
  return 'uk';
}

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
  /** переклад сегмента («Для кого») */
  seg: (s: string) => string;
  /** переклад тега можливості */
  tag: (s: string) => string;
  /** підпис типу рішення */
  dep: (d: Deployment) => string;
  /** CRM з перекладеним текстом для показу */
  crm: (c: Crm) => Crm;
}

const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(KEY, l); } catch { /* ignore */ }
  }, []);

  const t = lang === 'en' ? en : uk;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.pageTitle;
  }, [lang, t]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t,
      seg: (s) => (lang === 'en' ? SEGMENT_EN[s] ?? s : s),
      tag: (s) => (lang === 'en' ? TAG_EN[s] ?? s : s),
      dep: (d) => (d === 'cloud' ? t.depCloud : d === 'box' ? t.depBox : t.depBoth),
      crm: (c) => (lang === 'en' ? localizeCrm(c) : c),
    }),
    [lang, setLang, t],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): Ctx {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang має використовуватися всередині <LangProvider>');
  return ctx;
}
