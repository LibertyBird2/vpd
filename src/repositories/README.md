# Repositories

Data-access boundary between the app and its content sources. Today they
read locale-scoped JSON from `src/content/`; tomorrow they can read a CMS
without touching consuming components.

Components consume repositories through hooks (e.g. `usePageContent`),
never by importing JSON directly.
