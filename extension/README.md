# US Address Generator Extension

Manifest V3 extension for generating synthetic address test data from the same shared modules used by usaddregen.com.

## Local Load

1. Run from the project root:

```bash
npm run extension:build
```

2. Open Chrome or Edge extensions:

```text
chrome://extensions
```

3. Enable Developer mode, choose "Load unpacked", and select this `extension/` folder.

## Features

- Generate US state addresses from all 50 states.
- Generate Nigeria, Egypt, Turkey, and Pakistan test addresses.
- Copy the full address.
- Fill common address form fields on the active tab.

## Compliance

Synthetic, realistic-format only. Not deliverable. Not for fraud, account abuse, identity claims, KYC, tax evasion, or real verification workflows.
