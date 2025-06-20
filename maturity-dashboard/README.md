# Azure Monitor Maturity Dashboard

This example shows a minimal Express application that queries Azure Monitor logs and maps them to a simple maturity assessment. It exposes a small website that allows selecting an industry so that different framework requirements can be applied.

This code only demonstrates the flow. You must provide Azure credentials via environment variables and install the required dependencies before running.

## Setup

```bash
cd maturity-dashboard
npm install
```

Create a `.env` file or set the following environment variables for Azure authentication:

- `AZURE_TENANT_ID`
- `AZURE_CLIENT_ID`
- `AZURE_CLIENT_SECRET`
- `AZURE_SUBSCRIPTION_ID`
- `AZURE_RESOURCE_GROUP`

Run the server:

```bash
node index.js
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Industry frameworks

Framework requirements are stored in `frameworks.json`. Update this file to adjust the logic for different industries.
