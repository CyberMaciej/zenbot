async function checkMaturity() {
  const industry = document.getElementById('industry').value;
  const res = await fetch('/api/maturity', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ industry })
  });
  const data = await res.json();
  document.getElementById('result').textContent = JSON.stringify(data, null, 2);
}

document.getElementById('check').addEventListener('click', checkMaturity);
