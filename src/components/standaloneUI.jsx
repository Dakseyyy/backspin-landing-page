import React, { useEffect } from 'react';

const StandaloneUI = () => {
  useEffect(() => {
    // Set the document title/meta if needed when this mounts
    document.title = "Tucks MHP & Airport MHP | Cairn Communities";
  }, []);

  return (
    <div className="standalone-wrapper">
      <style>{`
        :root {
          --bg: #0b1220; --card: rgba(255,255,255,.08); --text: rgba(255,255,255,.92);
          --muted: rgba(255,255,255,.70); --faint: rgba(255,255,255,.55);
          --border: rgba(255,255,255,.14); --shadow: 0 18px 50px rgba(0,0,0,.35);
          --radius: 18px; --accent: #66e3c4; --accent2: #7aa7ff;
        }
        .standalone-wrapper {
          margin: 0; min-height: 100vh; color: var(--text);
          font-family: ui-sans-serif, system-ui, -apple-system;
          background: radial-gradient(1200px 600px at 20% 0%, rgba(122,167,255,.18), transparent 55%),
                      radial-gradient(900px 600px at 80% 10%, rgba(102,227,196,.14), transparent 55%),
                      var(--bg);
        }
        .container { width: min(1100px, 92vw); margin: 0 auto; padding: 28px 0 70px; }
        .topbar { position: sticky; top: 0; z-index: 10; backdrop-filter: blur(14px); background: rgba(11,18,32,.72); border-bottom: 1px solid var(--border); }
        .topbar-inner { display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; }
        .brand h1 { font-size: 14px; margin: 0; }
        .pill { padding: 9px 12px; border-radius: 999px; border: 1px solid var(--border); font-size: 13px; color: var(--muted); text-decoration: none; }
        .hero-grid { display: grid; grid-template-columns: 1.25fr .75fr; gap: 22px; margin-top: 34px; }
        .hero-card { border: 1px solid var(--border); background: rgba(255,255,255,.08); border-radius: var(--radius); padding: 22px; }
        .btn { display: inline-flex; align-items: center; padding: 12px 14px; border-radius: 12px; border: 1px solid var(--border); background: rgba(255,255,255,.05); color: white; text-decoration: none; font-weight: 600; }
        .btn.primary { background: linear-gradient(135deg, rgba(102,227,196,.22), rgba(122,167,255,.22)); border-color: rgba(255,255,255,.26); }
        /* Add the rest of your provided CSS here */
      `}</style>

      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <h1>Tucks MHP & Airport MHP <span style={{display:'block', color: 'var(--muted)', fontSize: '12px'}}>Manufactured Home Communities • Mineral Wells, TX</span></h1>
          </div>
          <nav style={{display:'flex', gap:'10px'}}>
            <a className="pill" href="#overview">Overview</a>
            <a className="pill cta" href="tel:+19406545224">Call (940) 654-5224</a>
          </nav>
        </div>
      </header>

      <main className="container">
        <section className="hero" id="overview">
          <div className="hero-grid">
            <div className="hero-card">
              <div className="kicker" style={{fontSize: '12px', color: 'var(--muted)'}}>Two friendly neighborhoods, one convenient location</div>
              <h2 style={{fontSize: 'clamp(26px, 3vw, 40px)'}}>Tree-lined community living at <span style={{color:'var(--accent)'}}>Tucks</span> & <span style={{color:'var(--accent2)'}}>Airport</span> MHP</h2>
              <p style={{color: 'var(--muted)', margin: '18px 0'}}>
                Tucks MHP and Airport MHP are small manufactured home communities in Mineral Wells, Texas...
              </p>
              <div style={{display:'flex', gap:'10px', flexWrap: 'wrap'}}>
                <a className="btn primary" href="#tour">Apply / Request a Tour</a>
                <a className="btn" href="mailto:info@cairncommunities.com">Email Cairn</a>
              </div>
            </div>
            
            <aside style={{display:'flex', flexDirection:'column', gap:'12px'}}>
              <div style={{border: '1px solid var(--border)', padding: '18px', borderRadius: 'var(--radius)', background: 'rgba(255,255,255,.05)'}}>
                <h3 style={{fontSize: '15px', margin: '0 0 10px'}}>Community Contact</h3>
                <p style={{fontSize: '13.5px', color: 'var(--muted)'}}>2001 FM 1195<br/>Mineral Wells, TX 76067</p>
              </div>
            </aside>
          </div>
        </section>
        
        {/* Continue mapping the rest of your sections (Amenities, Gallery, Form) to JSX */}
        
      </main>
    </div>
  );
};

export default StandaloneUI;