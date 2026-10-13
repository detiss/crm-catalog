import { useLang, type Lang } from '@/i18n';

// Прапори намальовані як SVG: емодзі-прапори (🇺🇦 🇬🇧) у Windows відображаються просто буквами.
function FlagUA() {
  return (
    <svg width="24" height="16" viewBox="0 0 24 16" aria-hidden="true">
      <rect width="24" height="8" fill="#0057B7" />
      <rect y="8" width="24" height="8" fill="#FFD700" />
    </svg>
  );
}

function FlagGB() {
  return (
    <svg width="24" height="16" viewBox="0 0 60 30" preserveAspectRatio="none" aria-hidden="true">
      <clipPath id="gb-s">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="gb-t">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath="url(#gb-s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#gb-t)" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

export default function LangSwitch() {
  const { lang, setLang, t } = useLang();

  const item = (l: Lang, label: string, flag: React.ReactNode) => (
    <button
      type="button"
      onClick={() => setLang(l)}
      aria-pressed={lang === l}
      aria-label={label}
      title={label}
      className={`flex items-center px-2.5 py-2 transition-opacity ${
        lang === l ? 'bg-secondary opacity-100' : 'opacity-50 hover:opacity-100'
      }`}
    >
      {flag}
    </button>
  );

  return (
    <div role="group" aria-label={t.langAria} className="flex items-center border border-foreground">
      {item('uk', t.langUk, <FlagUA />)}
      {item('en', t.langEn, <FlagGB />)}
    </div>
  );
}
