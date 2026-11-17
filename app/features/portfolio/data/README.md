# Portfolio content boundary

All public portfolio UI should consume content through `index.js`.

## Current source

The existing `app/lib/data/*` modules remain the canonical static fallback. This
keeps the current site rendering even when Firebase is unavailable or has not
yet been configured.

## Hybrid target

The repository layer will resolve content in this order:

1. Read the published section from Firestore when a public Firebase project is
   configured and the published document is available.
2. Validate/normalize the remote payload against the section's expected shape.
3. Fall back to the matching local module when the remote document is absent,
   invalid, or unavailable.

Draft documents must never be read by public portfolio routes. Only the
server-side publishing workflow may write to the published namespace.

## Published document contract

Use one document per section under `portfolioPublished`:

- `personal`
- `projects`
- `experience`
- `skills`
- `education`
- `certifications`
- `achievements`
- `social`
- `resume`

Each document stores a `content` field containing the section payload and
optional `version` and `updatedAt` metadata. The contract will be implemented
with runtime validation before the Firestore adapter is enabled.
