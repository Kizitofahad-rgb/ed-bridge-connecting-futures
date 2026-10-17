# Architecture rules
- Keep the tuition-support presentation domain in a browser-safe module with shared local demo state; it must remain self-contained without implying production authentication.
- Derive organisation reports from application records and keep approved and delivered amounts separate; this prevents simulated approvals being represented as payments.
- Keep the previous network prototype routes available but out of primary presentation navigation; this preserves existing work while focusing the new demo.