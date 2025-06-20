const express = require('express');
const fs = require('fs');
const path = require('path');
const { DefaultAzureCredential } = require('@azure/identity');
const { LogsQueryClient } = require('@azure/monitor-query');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const credential = new DefaultAzureCredential();
const logsClient = new LogsQueryClient(credential);

const frameworksPath = path.join(__dirname, 'frameworks.json');
let frameworks = {};
if (fs.existsSync(frameworksPath)) {
  frameworks = JSON.parse(fs.readFileSync(frameworksPath));
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/api/maturity', async (req, res) => {
  const { industry } = req.body;
  const framework = frameworks[industry];
  if (!framework) {
    return res.status(400).json({ error: 'Unknown industry' });
  }

  try {
    const query = 'AzureActivity | limit 100';
    const result = await logsClient.queryWorkspace(
      process.env.AZURE_WORKSPACE_ID,
      query,
      { timespan: 'P1D' }
    );

    const score = Math.min(100, result.tables[0].rows.length);
    const maturity = score >= framework.threshold ? 'Compliant' : 'Needs Improvement';
    res.json({
      industry,
      bestPractices: framework.bestPractices,
      score,
      maturity
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to query logs' });
  }
});

app.listen(port, () => {
  console.log(`Dashboard listening on port ${port}`);
});
