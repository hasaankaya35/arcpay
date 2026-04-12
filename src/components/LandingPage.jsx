function LandingPage({ onLaunch }) {
  return (
    <div className="landing">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-logo">
          <div className="logo-icon">⚡</div>
          ArcPay
        </div>
        <div className="nav-links">
          <span className="nav-badge">🟢 Arc Testnet</span>
          <button className="nav-link" onClick={onLaunch}>Launch App</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="landing-hero">
        <div className="hero-badge">
          <span className="pulse"></span>
          Built on Arc Network × Circle Nanopayments
        </div>
        
        <h1 className="hero-title">
          AI Chat with<br />
          <span className="gradient-text">Micropayments</span><br />
          on <span className="accent-text">Arc</span>
        </h1>
        
        <p className="hero-subtitle">
          Pay only for what you use. Each AI query costs just $0.001 USDC — 
          settled instantly on Arc blockchain with Circle Nanopayments. 
          No subscriptions, no hidden fees.
        </p>
        
        <div className="hero-actions">
          <button className="btn-primary" onClick={onLaunch}>
            🚀 Launch App
          </button>
          <a href="https://arc.network" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            📄 Learn about Arc
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="landing-stats">
        <div className="stat-item">
          <div className="stat-value purple">$0.001</div>
          <div className="stat-label">Per Query Cost</div>
        </div>
        <div className="stat-item">
          <div className="stat-value green">&lt;1s</div>
          <div className="stat-label">Settlement Time</div>
        </div>
        <div className="stat-item">
          <div className="stat-value blue">$0</div>
          <div className="stat-label">Gas Fees</div>
        </div>
      </section>

      {/* Features */}
      <section className="landing-features">
        <div className="feature-card">
          <div className="feature-icon purple">💰</div>
          <h3 className="feature-title">USDC Micropayments</h3>
          <p className="feature-desc">
            Pay-per-query with USDC stablecoin. No volatile tokens, 
            no unpredictable costs. Just stable, dollar-denominated pricing.
          </p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon green">⚡</div>
          <h3 className="feature-title">Gas-Free via Nanopayments</h3>
          <p className="feature-desc">
            Circle Nanopayments batch thousands of transactions off-chain 
            and settle on Arc — making each payment virtually gas-free.
          </p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon blue">🤖</div>
          <h3 className="feature-title">Agentic Commerce</h3>
          <p className="feature-desc">
            Built for the agentic economy. AI agents can autonomously 
            pay for services, settle in real-time, and operate 24/7.
          </p>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
