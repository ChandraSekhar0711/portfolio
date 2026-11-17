# Portfolio architecture

## Goals

- Preserve the current public portfolio UI, animations, theme behavior, and URLs.
- Separate presentation from content, authentication, publishing, and analytics.
- Use Firebase as the managed backend without making the public site depend on
  Firebase being available for its initial render.
- Keep drafts private and expose only published content to visitors.

## Application layers

```text
Next.js App Router
├── Public portfolio
│   ├── Existing section components and visual system
│   └── Portfolio content boundary
├── Admin area (next implementation stage)
│   ├── Phone OTP sign-in
│   ├── Role-protected content editors
│   ├── Draft / preview / publish workflow
│   └── Analytics dashboard
└── Server routes / services
    ├── Admin authorization
    ├── Content publishing
    └── Analytics ingestion and aggregation

Firebase
├── Authentication: phone OTP
├── Firestore: drafts, published sections, analytics events
└── Storage: project images, profile media, certificates, resume
```

## Hybrid content strategy

Local JavaScript content remains the fallback and source of truth until each
Firestore section has been migrated and verified. Public routes will prefer a
validated published Firestore document when configured, then fall back to the
local content. Admin drafts are never exposed to public routes.

The public UI imports data through `app/features/portfolio/data/index.js`.
This is the migration seam for the Firestore repository and keeps Firebase
details out of visual components.

## Security boundaries

- Phone verification proves control of a phone number; it does not grant admin
  privileges.
- Admin access must be checked server-side using a trusted Firebase Admin
  custom claim or equivalent server-managed allowlist.
- Never place service-account credentials or private keys in client code.
- Firestore and Storage rules must deny draft access to unauthenticated users
  and allow writes only to authorized admins.
- Publishing and analytics aggregation must run in trusted server code; clients
  must not be able to write aggregate counters directly.
- Admin previews and authenticated admin sessions should be excluded from
  public visitor analytics.

## Delivery sequence

1. Establish the content boundary and document the hybrid data contract.
2. Add Firebase configuration, server-side admin verification, and security
   rules after confirming the existing Firebase project's configuration.
3. Add the admin route group and phone OTP sign-in.
4. Add section editors, media uploads, draft preview, and publishing.
5. Add privacy-conscious visitor, resume-view, and download-request analytics.
6. Migrate content section-by-section, verify fallback behavior, then retire
   legacy imports only after parity checks.

## Existing implementation notes

The previous welcome chooser labels one option Admin, but currently only stores
that selection in client state; it is not authentication or authorization. Keep
it out of the security model. The current portfolio content is static JavaScript
and there is no Firebase SDK/configuration in the checked-in dependency list.
