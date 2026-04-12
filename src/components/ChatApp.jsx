import { useState, useRef, useEffect } from 'react'

// Simulated AI responses about Arc Network
const AI_RESPONSES = {
  default: [
    "Arc is a Layer-1 blockchain built by Circle, designed as an Economic Operating System for the internet. It uses USDC as the native gas token, offering predictable dollar-denominated transaction costs. With sub-second deterministic finality powered by the Malachite consensus engine, Arc is purpose-built for institutional-grade financial applications.",
    "Circle Nanopayments enable gas-free USDC transfers as small as $0.000001. They work by aggregating transactions off-chain and settling in batches on-chain — making micropayments economically viable for the first time. This powers the agentic economy where AI agents can autonomously transact.",
    "The Arc testnet launched on October 28, 2025, with participation from over 100 major institutions including BlackRock, Visa, Mastercard, Goldman Sachs, and AWS. The mainnet is expected to launch later in 2026.",
    "Arc uses USDC as its gas token instead of a volatile native token. This means transaction costs are always predictable and dollar-denominated. No more worrying about ETH price spikes making your transactions expensive!",
    "ERC-8183 is a new standard for AI agent commerce. It creates a trustless 'Job' primitive — like a freelance marketplace for AI agents. Agents can post jobs, lock payments in escrow, deliver work, and settle automatically without human intervention.",
    "Circle recently launched CPN Managed Payments, allowing banks and fintechs to use USDC for settlements without managing crypto directly. Partners include Thunes, Worldline, and Veem. This bridges traditional finance with blockchain infrastructure.",
  ],
  arc: "Arc is Circle's Layer-1 blockchain — the Economic OS for the internet. Key features:\n\n💰 **USDC-native gas** — predictable, dollar-based fees\n⚡ **Sub-second finality** — powered by Malachite consensus\n🔐 **Opt-in privacy** — configurable for enterprise compliance\n🛠️ **EVM compatible** — use Solidity, familiar tools\n\nOver 100 institutions (BlackRock, Visa, Mastercard) are already building on Arc testnet. Mainnet launches in 2026.",
  usdc: "USDC is the second-largest stablecoin globally, issued by Circle.\n\n📊 **$75.3B** in circulation (72% YoY growth)\n🏦 Reserves managed by **BlackRock**\n🌐 Available on **30+ blockchains**\n📈 Circle's 2025 revenue: **$2.75B**\n\nOn Arc, USDC serves as the native gas token — replacing volatile tokens with stable, predictable fees. Circle is publicly traded on NYSE (ticker: CRCL) with ~$22B market cap.",
  nanopayments: "Circle Nanopayments make sub-cent transactions possible! Here's how:\n\n1️⃣ Buyer signs a payment authorization **off-chain** (zero gas)\n2️⃣ Merchant verifies the signature instantly\n3️⃣ Service is provided immediately\n4️⃣ Circle Gateway **batches** thousands of authorizations\n5️⃣ Single on-chain settlement on Arc\n\n💡 Result: Payments as small as **$0.000001 USDC** become viable!\n\nUse cases: Per-API billing, AI agent commerce, compute marketplaces, streaming payments.",
  quantum: "Arc is the first blockchain with a post-quantum security roadmap! Announced April 2, 2026:\n\n🛡️ **Phase 1** (Mainnet) — Quantum-resistant wallet signatures using CRYSTALS-Dilithium & Falcon\n🔒 **Phase 2** — Smart contract state protection\n🏗️ **Phase 3** — Network infrastructure hardening (TLS 1.3, HSM)\n⚙️ **Phase 4** — Validator security\n\n⚠️ The 'Q-Day' threat (when quantum computers can break current crypto) is estimated around 2030. Arc is preparing NOW while other chains will need painful retrofits.",
  hackathon: "The Agentic Economy on Arc Hackathon runs April 20-26, 2026! 🏆\n\n💰 **$10,000 prize pool**\n📍 Online + San Francisco\n\n**Tracks:**\n1. Per-API Monetization — charge per API call\n2. AI Agent Commerce — autonomous AI trading\n3. Compute Marketplaces — buy/sell compute\n\n**Tech stack:** Circle Nanopayments + Arc + ERC-8183\n\nThe winning project from the previous hackathon was VibeCard — a viral rewards network using Circle Wallets + x402 protocol for instant USDC payouts.",
}

function getAIResponse(message) {
  const lower = message.toLowerCase()
  if (lower.includes('arc') && (lower.includes('nedir') || lower.includes('what') || lower.includes('explain'))) {
    return AI_RESPONSES.arc
  }
  if (lower.includes('usdc') || lower.includes('circle') || lower.includes('stablecoin')) {
    return AI_RESPONSES.usdc
  }
  if (lower.includes('nano') || lower.includes('micropay') || lower.includes('micro') || lower.includes('payment')) {
    return AI_RESPONSES.nanopayments
  }
  if (lower.includes('quantum') || lower.includes('kuantum') || lower.includes('security') || lower.includes('güvenlik')) {
    return AI_RESPONSES.quantum
  }
  if (lower.includes('hackathon') || lower.includes('yarışma') || lower.includes('prize') || lower.includes('ödül')) {
    return AI_RESPONSES.hackathon
  }
  return AI_RESPONSES.default[Math.floor(Math.random() * AI_RESPONSES.default.length)]
}

function generateTxHash() {
  const chars = '0123456789abcdef'
  let hash = '0x'
  for (let i = 0; i < 12; i++) hash += chars[Math.floor(Math.random() * chars.length)]
  return hash + '...'
}

function formatTime(date) {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

const SUGGESTIONS = [
  { icon: '🌐', text: 'What is Arc Network?' },
  { icon: '💰', text: 'How do Nanopayments work?' },
  { icon: '🔐', text: 'Tell me about quantum security' },
  { icon: '🏆', text: 'What is the Arc Hackathon?' },
]

function ChatApp({ onBack }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [balance, setBalance] = useState(10.000)
  const [payments, setPayments] = useState([])
  const [totalQueries, setTotalQueries] = useState(0)
  const [totalSpent, setTotalSpent] = useState(0)
  const [toast, setToast] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const sendMessage = async (text) => {
    if (!text.trim() || isTyping) return
    
    const userMsg = { role: 'user', content: text, time: new Date() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate payment
    const cost = 0.001
    const txHash = generateTxHash()
    const now = new Date()
    
    // Deduct balance
    setBalance(prev => Math.max(0, prev - cost))
    setTotalQueries(prev => prev + 1)
    setTotalSpent(prev => prev + cost)
    
    // Add payment record
    const payment = {
      type: 'AI Query',
      amount: cost,
      time: now,
      txHash,
    }
    setPayments(prev => [payment, ...prev])
    
    // Show toast
    setToast({ txHash, amount: cost })
    setTimeout(() => setToast(null), 3000)

    // Simulate AI thinking
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800))
    
    const aiResponse = getAIResponse(text)
    const aiMsg = { 
      role: 'ai', 
      content: aiResponse, 
      time: new Date(),
      txHash,
      cost,
    }
    
    setMessages(prev => [...prev, aiMsg])
    setIsTyping(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const handleSuggestion = (text) => {
    sendMessage(text)
  }

  return (
    <div className="chat-app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo" onClick={onBack}>⚡ ArcPay</div>
          <div className="sidebar-subtitle">Pay-per-Query AI Chat</div>
        </div>

        {/* Wallet */}
        <div className="wallet-card">
          <div className="wallet-label">USDC Balance</div>
          <div className="wallet-balance">{balance.toFixed(3)}</div>
          <div className="wallet-balance-usd">≈ ${balance.toFixed(3)} USD</div>
          <div className="wallet-address">
            <span>0x7a3f...c829</span>
            <span>📋</span>
          </div>
          <div className="wallet-network">
            <span className="dot"></span>
            Arc Testnet
          </div>
        </div>

        {/* Payment History */}
        <div className="payment-history">
          <div className="payment-history-title">Recent Payments</div>
          {payments.length === 0 ? (
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', padding: '16px 0', textAlign: 'center' }}>
              No payments yet. Start chatting!
            </div>
          ) : (
            payments.slice(0, 15).map((p, i) => (
              <div className="payment-item" key={i}>
                <div className="payment-info">
                  <span className="payment-type">{p.type}</span>
                  <span className="payment-time">{formatTime(p.time)}</span>
                </div>
                <span className="payment-amount debit">-${p.amount.toFixed(4)}</span>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        <div className="sidebar-stats">
          <div className="sidebar-stat">
            <span className="sidebar-stat-label">Total Queries</span>
            <span className="sidebar-stat-value">{totalQueries}</span>
          </div>
          <div className="sidebar-stat">
            <span className="sidebar-stat-label">Total Spent</span>
            <span className="sidebar-stat-value">${totalSpent.toFixed(4)}</span>
          </div>
          <div className="sidebar-stat">
            <span className="sidebar-stat-label">Avg Cost</span>
            <span className="sidebar-stat-value">$0.0010</span>
          </div>
          <div className="sidebar-stat">
            <span className="sidebar-stat-label">Network</span>
            <span className="sidebar-stat-value" style={{ color: 'var(--arc-accent)' }}>Arc</span>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="chat-main">
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-ai-avatar">🤖</div>
            <div>
              <div className="chat-ai-name">ArcPay AI</div>
              <div className="chat-ai-status">
                <span className="dot"></span>
                Online — Arc Testnet
              </div>
            </div>
          </div>
          <div className="chat-cost-badge">⚡ $0.001/query</div>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.length === 0 ? (
            <div className="welcome-container">
              <div className="welcome-icon">🤖</div>
              <h2 className="welcome-title">Welcome to ArcPay</h2>
              <p className="welcome-desc">
                Ask me anything about Arc Network, USDC, or blockchain. 
                Each query costs just $0.001 USDC via Circle Nanopayments.
              </p>
              <div className="welcome-suggestions">
                {SUGGESTIONS.map((s, i) => (
                  <div className="suggestion-card" key={i} onClick={() => handleSuggestion(s.text)}>
                    <div className="suggestion-icon">{s.icon}</div>
                    <div className="suggestion-text">{s.text}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <div className={`message ${msg.role}`} key={i}>
                  <div className="message-avatar">
                    {msg.role === 'ai' ? '🤖' : '👤'}
                  </div>
                  <div>
                    <div className="message-content">
                      {msg.content.split('\n').map((line, j) => (
                        <span key={j}>
                          {line.replace(/\*\*(.*?)\*\*/g, '').replace(/`(.*?)`/g, '$1')}
                          {j < msg.content.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </div>
                    {msg.role === 'ai' && msg.txHash && (
                      <div className="message-payment">
                        <span className="check">✓</span>
                        Paid ${msg.cost?.toFixed(4)} USDC • {msg.txHash}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="message ai">
                  <div className="message-avatar">🤖</div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-input-area">
          <div className="chat-input-wrapper">
            <textarea
              ref={inputRef}
              className="chat-input"
              placeholder="Ask anything about Arc Network..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={isTyping}
            />
            <button 
              className="chat-send-btn" 
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isTyping}
            >
              ➤
            </button>
          </div>
          <div className="chat-input-hint">
            <span>Press Enter to send • Shift+Enter for new line</span>
            <span>Cost: $0.001 USDC per query</span>
          </div>
        </div>
      </main>

      {/* Transaction Toast */}
      {toast && (
        <div className="tx-toast">
          <div className="tx-toast-icon">✓</div>
          <div className="tx-toast-info">
            <span className="tx-toast-title">Payment Confirmed — ${toast.amount.toFixed(4)} USDC</span>
            <span className="tx-toast-hash">Tx: {toast.txHash} • Arc Testnet</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatApp
