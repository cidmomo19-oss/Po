export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // =========================================================
    // KODE RAHASIA LU
    // =========================================================
    const URL_ADMIN = "/admin"; 
    const KUNCI_API = "Ipulapik999#"; 
    // =========================================================

    // 1. MUNCULKAN HALAMAN ADMIN
    if (request.method === "GET" && url.pathname === URL_ADMIN) {
      const adminHTML = `
      <!DOCTYPE html>
      <html lang="id">
      <head>
          <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
          <title>Panel Pengelola</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Outfit:wght@600;700&display=swap" rel="stylesheet">
          <style>
              * { box-sizing: border-box; outline: none; }
              body { font-family: 'Inter', sans-serif; background: #f6f8fa; background-image: radial-gradient(circle at 50% 0%, #ffffff 0%, transparent 70%); color: #0f172a; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px; }
              .card { background: #ffffff; padding: 40px 32px; border-radius: 28px; box-shadow: 0 20px 40px -10px rgba(0,0,0,0.05); width: 100%; max-width: 400px; text-align: center; border: 1px solid rgba(226, 232, 240, 0.8); }
              .icon-admin { width: 56px; height: 56px; background: #0f172a; border-radius: 18px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px; box-shadow: 0 10px 20px -5px rgba(15, 23, 42, 0.3); color: #fff; }
              h2 { font-family: 'Outfit', sans-serif; margin: 0 0 24px 0; font-size: 24px; color: #0f172a; letter-spacing: -0.5px; }
              input { width: 100%; background: #f1f5f9; border: 2px solid transparent; border-radius: 16px; padding: 14px 20px; font-size: 15px; font-family: inherit; color: #0f172a; font-weight: 500; transition: all 0.2s; margin-bottom: 16px; }
              input[type="text"] { text-transform: uppercase; letter-spacing: 2px; font-weight: 700;}
              input::placeholder { color: #94a3b8; font-weight: 400; text-transform: none; letter-spacing: normal;}
              input:focus { background: #ffffff; border-color: #cbd5e1; box-shadow: 0 0 0 4px rgba(226, 232, 240, 0.5); }
              
              .input-group { display: flex; gap: 10px; margin-bottom: 16px; }
              .input-group input { margin-bottom: 0; }
              .btn-gen { background: #e2e8f0; color: #334155; border: none; border-radius: 16px; padding: 0 15px; font-weight: 600; cursor: pointer; transition: 0.2s; white-space: nowrap; }
              .btn-gen:hover { background: #cbd5e1; }
              .btn-gen:active { transform: scale(0.95); }

              button.submit-btn { width: 100%; background: #0f172a; color: #ffffff; border: none; border-radius: 16px; padding: 15px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; margin-top: 8px; }
              button.submit-btn:hover { background: #334155; }
              button.submit-btn:active { transform: scale(0.98); }
              button:disabled { background: #cbd5e1; cursor: not-allowed; color: #94a3b8; }
              
              .res-box { margin-top: 24px; padding: 20px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 16px; display: none; text-align: left; animation: fadeIn 0.3s ease; }
              .res-box .badge { display: inline-block; background: #22c55e; color: #fff; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 99px; margin-bottom: 12px; }
              .res-box p { margin: 8px 0; font-size: 14px; color: #166534; }
              .res-box a { color: #15803d; font-weight: 600; word-break: break-all; text-decoration: none; border-bottom: 1px dashed #15803d; }
              .res-box span { color: #dc2626; font-weight: 700; background: #fee2e2; padding: 2px 8px; border-radius: 6px; letter-spacing: 1px;}
              @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          </style>
      </head>
      <body>
          <div class="card">
              <div class="icon-admin">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
              </div>
              <h2>Panel Pengelola</h2>
              
              <input type="password" id="key" placeholder="Kunci API Administrator">
              <input type="url" id="url" placeholder="URL Asli (Target Tujuan)">
              
              <div class="input-group">
                  <input type="text" id="pass" placeholder="Kata Kunci" maxlength="4">
                  <button type="button" class="btn-gen" id="btnGen" onclick="generateAntiTypo()">Auto Buat</button>
              </div>
              
              <button onclick="save()" id="btn" class="submit-btn">Simpan ke Database</button>
              
              <div id="resBox" class="res-box">
                  <div class="badge">Berhasil Disimpan!</div>
                  <p>Suruh user buka: <a href="${url.origin}/" target="_blank">${url.origin}/</a></p>
                  <p>Kata Kunci Video: <span id="resPass"></span></p>
              </div>
          </div>
          
          <script>
              // Fungsi buat narik 4 Huruf Aman dari Worker
              async function generateAntiTypo() {
                  const key = document.getElementById("key").value.trim();
                  const btnGen = document.getElementById("btnGen");
                  
                  if(!key) return alert("Isi Kunci API Administrator dulu!");
                  
                  btnGen.innerText = "..."; btnGen.disabled = true;
                  
                  try {
                      const req = await fetch('/api/generate-safe-key', { 
                          method: 'POST', 
                          headers: {'Content-Type': 'application/json'}, 
                          body: JSON.stringify({adminKey: key}) 
                      });
                      
                      if(req.ok) { 
                          const data = await req.json();
                          document.getElementById("pass").value = data.code;
                      } else if(req.status === 401) {
                          alert("Akses Ditolak: Kunci API Salah!");
                      } else {
                          alert("Gagal generate kode!");
                      }
                  } catch(e) { alert("Error Jaringan!"); }
                  
                  btnGen.innerText = "Auto Buat"; btnGen.disabled = false;
              }

              // Fungsi simpan biasa
              async function save() {
                  const key = document.getElementById("key").value.trim();
                  const url = document.getElementById("url").value.trim();
                  const pass = document.getElementById("pass").value.trim().toUpperCase(); 
                  const btn = document.getElementById("btn");
                  const resBox = document.getElementById("resBox");
                  
                  if(!key || !url || !pass) return alert("Harap isi semua kolom!");
                  if(pass.length !== 4) return alert("Kata kunci harus persis 4 huruf!");
                  
                  btn.innerText = "Memproses..."; btn.disabled = true; resBox.style.display = "none";
                  
                  try {
                      const req = await fetch('/api/create', { 
                          method: 'POST', 
                          headers: {'Content-Type': 'application/json'}, 
                          body: JSON.stringify({adminKey: key, url: url, password: pass}) 
                      });
                      
                      if(req.ok) { 
                          document.getElementById("resPass").innerText = pass;
                          resBox.style.display = "block";
                          document.getElementById("url").value = ""; 
                          document.getElementById("pass").value = ""; 
                      }
                      else if(req.status === 401) alert("Akses Ditolak: Kunci API Salah!");
                      else alert("Terjadi kesalahan sistem saat menyimpan data!");
                  } catch(e) { alert("Error Jaringan!"); }
                  
                  btn.innerText = "Simpan ke Database"; btn.disabled = false;
              }
          </script>
      </body></html>
      `;
      return new Response(adminHTML, { headers: { "Content-Type": "text/html" } });
    }

    // 2. API BUAT KATA KUNCI AMAN (ANTI-TYPO)
    if (request.method === "POST" && url.pathname === "/api/generate-safe-key") {
        try {
            const body = await request.json();
            if (body.adminKey !== KUNCI_API) return new Response("Akses Ditolak", { status: 401 });

            // Tarik semua kata kunci yang udah ada di database (max 1000)
            const keysData = await env.LINK_DB.list();
            const existingKeys = keysData.keys.map(k => k.name);

            // Huruf yg dipakai (Dihapus: O, I, Q, L supaya ga ambigu di mata)
            const chars = "ABCDEFGHJKMNPRSTUVWXYZ"; 
            let newCode = "";
            let attempt = 0;

            // Looping cari kata kunci yang bedanya minimal 2 huruf dari semua kode yang ada
            while (attempt < 200) {
                newCode = "";
                for (let i = 0; i < 4; i++) {
                    newCode += chars.charAt(Math.floor(Math.random() * chars.length));
                }

                let isSafe = true;
                for (let oldCode of existingKeys) {
                    if (oldCode.length !== 4) continue;
                    
                    let differences = 0;
                    for (let i = 0; i < 4; i++) {
                        if (newCode[i] !== oldCode[i]) differences++;
                    }
                    
                    // Kalau cuma beda 1 huruf (rawan typo), batalkan dan buat ulang!
                    if (differences < 2) {
                        isSafe = false;
                        break; 
                    }
                }

                if (isSafe) break; // Ketemu yang bener-bener aman!
                attempt++;
            }

            return new Response(JSON.stringify({ code: newCode }), { headers: { 'Content-Type': 'application/json' } });

        } catch (e) { return new Response("Error", { status: 500 }); }
    }

    // 3. API SIMPAN KATA KUNCI BARU (KATA KUNCI JADI KEY DI KV)
    if (request.method === "POST" && url.pathname === "/api/create") {
      try {
        const body = await request.json();
        if (body.adminKey !== KUNCI_API) return new Response("Akses Ditolak", { status: 401 });

        const { url: targetUrl, password } = body;
        if (!targetUrl || !password || password.length !== 4) return new Response("Data Kurang", { status: 400 });

        const dbKey = password.toUpperCase();
        const dbData = { url: targetUrl }; 
        await env.LINK_DB.put(dbKey, JSON.stringify(dbData));

        return new Response(JSON.stringify({ status: "success" }), { headers: { 'Content-Type': 'application/json' } });

      } catch (e) { return new Response("Error", { status: 500 }); }
    }

    // 4. API GET / CEK KATA KUNCI DARI USER
    if (request.method === "GET" && url.pathname.startsWith("/api/get/")) {
      const parts = url.pathname.split("/");
      const reqPass = decodeURIComponent(parts[3] || "").toUpperCase(); 
      
      const headerAntiCache = {
        'Content-Type': 'application/json', 
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Access-Control-Allow-Origin': '*'
      };

      if (!reqPass || reqPass.length !== 4) {
          return new Response(JSON.stringify({ error: "Kata kunci tidak valid" }), { status: 400, headers: headerAntiCache });
      }

      // Langsung cari kata kunci di Database
      const rawData = await env.LINK_DB.get(reqPass);
      if (!rawData) {
          // Jika tidak ada di database, berarti typo atau kata kunci salah
          return new Response(JSON.stringify({ error: "Kata kunci tidak ditemukan" }), { status: 404, headers: headerAntiCache });
      }

      // Jika ada, kembalikan URL aslinya
      const data = JSON.parse(rawData);
      return new Response(JSON.stringify({ url: data.url }), { headers: headerAntiCache });
    }

    // 5. SELAIN DI ATAS, TAMPILKAN HALAMAN UTAMA (index.html)
    return env.ASSETS.fetch(request);
  }
};
