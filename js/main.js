// main.js minimal client
const GAS_URL = 'https://script.google.com/macros/s/AKfycbz_zRMfgqXzhe3Yxivq3FxfNZev6Ne6DfVhTsxT_hX-5Ty0uc2sp7FycbEiQPeHX8B_XA/exec'; // <<< REPLACE with deployed GAS webapp URL
document.getElementById('btn-login').addEventListener('click', ()=> location.href='/login.html');
document.getElementById('btn-register').addEventListener('click', ()=> location.href='/register.html');
document.getElementById('btn-dashboard').addEventListener('click', ()=> location.href='/');
document.getElementById('btn-add-tx').addEventListener('click', addTxDialog);

async function init(){
  // try session from localStorage
  const s = localStorage.getItem('dp_session');
  if(!s){ document.getElementById('userBox').innerText='Belum login'; return; }
  const session = JSON.parse(s);
  document.getElementById('userBox').innerText = session.username;
  await loadDashboard(session.userId);
}
async function loadDashboard(userId){
  try{
    const res = await fetch(GAS_URL, {method:'POST', body: JSON.stringify({action:'getDashboard', userId})});
    const j = await res.json();
    if(!j.success){ console.error(j); return; }
    document.getElementById('saldoVal').innerText = j.data.saldo;
    document.getElementById('incomeVal').innerText = j.data.income;
    document.getElementById('expenseVal').innerText = j.data.expense;
    document.getElementById('budgetVal').innerText = j.data.budget;
    const tbody = document.querySelector('#txTable tbody'); tbody.innerHTML='';
    j.data.transactions.forEach(t=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${t.tanggal}</td><td>${t.deskripsi}</td><td>${t.kategori}</td><td>${t.jumlah}</td>`;
      tbody.appendChild(tr);
    });
  }catch(err){ console.error(err); }
}

function addTxDialog(){
  const s = localStorage.getItem('dp_session'); if(!s){ alert('Silakan login terlebih dahulu'); return; }
  const user = JSON.parse(s);
  const des = prompt('Deskripsi transaksi:'); if(!des) return;
  const amt = prompt('Nominal (use negative for keluar):'); if(!amt) return;
  const payload = {action:'saveTransaction', userId:user.userId, tanggal: new Date().toISOString().slice(0,10), deskripsi:des, jumlah: parseFloat(amt)};
  fetch(GAS_URL, {method:'POST', body: JSON.stringify(payload)}).then(r=>r.json()).then(j=>{ if(j.success) alert('Tersimpan'); loadDashboard(user.userId); else alert('Gagal: '+(j.message||'')); });
}

init();
