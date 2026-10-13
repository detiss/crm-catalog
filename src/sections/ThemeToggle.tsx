import { useEffect, useState } from 'react';
import { useLang } from '@/i18n';

const KEY = 'theme';

function initialDark(): boolean {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved) return saved === 'dark';
  } catch { /* localStorage недоступний */ }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// застосовуємо тему одразу при завантаженні, щоб не було білого спалаху
document.documentElement.classList.toggle('dark', initialDark());

export default function ThemeToggle() {
  const { t } = useLang();
  const [dark, setDark] = useState(initialDark);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    try {
      localStorage.setItem(KEY, dark ? 'dark' : 'light');
    } catch { /* ignore */ }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      aria-label={t.themeAria}
      title={t.themeTitle}
      className="btn-outline whitespace-nowrap !px-3 !py-2"
    >
      {dark ? t.themeLight : t.themeDark}
    </button>
  );
}
