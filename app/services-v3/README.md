# services-v3 (contained quiz)

This folder contains a self-contained interactive quiz that recommends a service based on answers.

- `page.tsx` — server page that renders the client `Quiz` component.
- `components/custom/ServicesV3` — client-only quiz component and styles.

Notes:
- The mapping from internal service keys (`design`, `development`, `strategy`) to actual `services-v2` slugs is a placeholder in `Quiz.tsx` (`slugMap`). Run an audit of `app/services-v2` to replace with authoritative slugs.
