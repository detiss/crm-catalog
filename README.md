# CRM-Каталог — агрегатор українських CRM-систем

Односторінковий сайт для порівняння CRM-систем: таблиця з характеристиками, теги, плюси й мінуси, фільтри, порівняння до 4 систем, світла/темна тема, додавання власних CRM.

**Стек:** React 19 · TypeScript · Vite · Tailwind CSS. Бекенду немає: дані лежать у `src/data`.

**Демо:** https://detiss.github.io/crm-catalog/

## Запуск локально
Потрібен [Node.js](https://nodejs.org) 20+.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # перевірка продакшн-збірки
```

## Публікація
GitHub Pages збирає сайт автоматично після кожного push у `main` (`.github/workflows/deploy.yml`).
Settings → Pages → Source → **GitHub Actions**.

## Дані
- `src/data/crms.ts` — основний каталог (10 систем) і списки фільтрів.
- `src/data/community.ts` — CRM, запропоновані користувачами через Issues.

Пропозиції з Issues додаються вставкою блоку у `community.ts` між двома маркерами.

## Документація
- [STRUCTURE.txt](./STRUCTURE.txt) — призначення кожного файлу
- [GLOSSARY.md](./GLOSSARY.md) — пояснення термінів (хмара, коробка, Enterprise…)
