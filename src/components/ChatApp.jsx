import { useState, useRef, useEffect } from 'react'
import { ethers } from 'ethers'
import ArcPayABI from '../ArcPayABI.json'

// We will get this from .env or default to deployed testnet contract
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || "0x7798249325D81ad1Ca6eFe8F382edf6F9240d469"

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
  erc8183: "**ERC-8183** is a groundbreaking standard for AI agent commerce on Arc! 🤖\n\nIt defines a trustless **Job** primitive with 4 phases:\n\n1️⃣ **Post** — Agent A publishes a task with requirements\n2️⃣ **Lock** — Payment locked in smart contract escrow\n3️⃣ **Deliver** — Agent B completes the work and submits proof\n4️⃣ **Settle** — Automatic USDC payout upon verification\n\n🔑 Key benefit: No human oversight needed. AI agents can autonomously hire other AI agents, negotiate prices, and settle payments.\n\nThis enables a true **machine-to-machine economy** on Arc.",
  institutions: "Arc has backing from 100+ major institutions! 🏛️\n\n**Financial Giants:**\n🏦 **BlackRock** — USDC reserve manager + strategic investor\n💰 **Goldman Sachs** — Testnet participant\n🏛️ **Deutsche Bank, HSBC, Standard Chartered** — Active testers\n\n**Payment Networks:**\n💳 **Visa & Mastercard** — Exploring stablecoin payment rails\n\n**Tech Partners:**\n☁️ **Amazon Web Services (AWS)** — Infrastructure partner\n🔒 **Fireblocks** — Institutional custody integration\n💻 **Cloudflare, FIS, Fiserv** — Network participants\n\nCircle itself is publicly traded (NYSE: **CRCL**) with ~**$22B market cap**.",
  gas: "Gas fees on Arc work differently from other blockchains! ⛽\n\n**Traditional chains:**\n❌ ETH gas = volatile, unpredictable ($2 to $200+)\n❌ SOL fees = cheap but still token-denominated\n❌ Budget planning impossible for enterprises\n\n**Arc Network:**\n✅ Gas paid in **USDC** — always $1\n✅ Predictable, dollar-denominated costs\n✅ Sub-cent transaction fees\n✅ Perfect for enterprise budgeting\n\n💡 Example: A bank processing 1M daily transactions knows exactly what it costs beforehand. No surprises, no volatility risk.",
}

function getAIResponse(message) {
  const lower = message.toLowerCase()
  if (lower.includes('arc') && (lower.includes('nedir') || lower.includes('what') || lower.includes('explain') || lower.includes('tell'))) {
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
  if (lower.includes('erc') || lower.includes('8183') || lower.includes('agent') || lower.includes('ajan')) {
    return AI_RESPONSES.erc8183
  }
  if (lower.includes('institu') || lower.includes('blackrock') || lower.includes('visa') || lower.includes('partner') || lower.includes('kurum')) {
    return AI_RESPONSES.institutions
  }
  if (lower.includes('gas') || lower.includes('fee') || lower.includes('ücret') || lower.includes('maliyet') || lower.includes('cost')) {
    return AI_RESPONSES.gas
  }
  return AI_RESPONSES.default[Math.floor(Math.random() * AI_RESPONSES.default.length)]
}

function shortHash(hash) {
  if (!hash) return "";
  return hash.slice(0, 10) + '...' + hash.slice(-6)
}

function formatTime(date) {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

const SUGGESTIONS = [
  { icon: '🌐', text: 'What is Arc Network?' },
  { icon: '💰', text: 'How do Nanopayments work?' },
  { icon: '🤖', text: 'Explain ERC-8183 agent commerce' },
  { icon: '🏛️', text: 'Which institutions back Arc?' },
  { icon: '⛽', text: 'How do gas fees work on Arc?' },
  { icon: '🏆', text: 'Tell me about the Arc Hackathon' },
]

// Render markdown text with **bold** and `code`
function RenderMarkdown({ text }) {
  return text.split('\n').map((line, j) => {
    const parts = line.split(/(\*\*.*?\*\*|`.*?`)/g)
    return (
      <span key={j}>
        {parts.map((part, k) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={k} style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{part.slice(2, -2)}</strong>
          }
          if (part.startsWith('`') && part.endsWith('`')) {
            return <code key={k} style={{
              background: 'rgba(99,102,241,0.15)',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '0.85em',
              fontFamily: 'var(--font-mono)'
            }}>{part.slice(1, -1)}</code>
          }
          return part
        })}
        {j < text.split('\n').length - 1 && <br />}
      </span>
    )
  })
}

function ChatApp({ onBack }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  
  // Real Web3 States
  const [walletAddress, setWalletAddress] = useState('')
  const [signer, setSigner] = useState(null)
  const [balance, setBalance] = useState(0.000)
  
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

  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const accounts = await provider.send("eth_requestAccounts", [])
        const ethSigner = await provider.getSigner()
        setWalletAddress(accounts[0])
        setSigner(ethSigner)
        
        // Check network (Arc Testnet 5042002)
        const network = await provider.getNetwork()
        if (network.chainId !== 5042002n) {
           try {
             await window.ethereum.request({
               method: 'wallet_switchEthereumChain',
               params: [{ chainId: '0x4cef52' }], // 5042002 in hex
             });
           } catch(e) {
             console.error("Please add Arc Testnet manually to MetaMask.");
           }
        }
        
        // Fetch real balance
        const bal = await provider.getBalance(accounts[0])
        setBalance(parseFloat(ethers.formatEther(bal)))
        setToast({ txHash: 'Connected', amount: 0, type: 'deposit' })
        setTimeout(() => setToast(null), 3000)
      } catch (err) {
        console.error("Wallet connection failed", err)
      }
    } else {
      alert("Please install MetaMask!")
    }
  }

  const sendMessage = async (text) => {
    if (!text.trim() || isTyping) return
    if (!signer) {
      alert("Lütfen önce MetaMask cüzdanınızı bağlayın! (Please connect your wallet first!)")
      return
    }

    const userMsg = { role: 'user', content: text, time: new Date() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    try {
      // Connect to the deployed contract
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ArcPayABI, signer)
      
      // Cost: 0.001 USDC (assuming native gas token has 18 decimals like standard ETH)
      const costWei = ethers.parseEther("0.001") 
      
      // Prompt Metamask to pay
      const tx = await contract.payForQuery({ value: costWei })
      
      // Adding a temporary "processing" message
      setToast({ txHash: 'Processing Transaction...', amount: 0.001, type: 'info' })
      
      // Wait for network confirmation
      const receipt = await tx.wait() 
      
      const cost = 0.001
      const txHash = tx.hash
      const now = new Date()
      
      // Update real balance
      const provider = signer.provider
      const bal = await provider.getBalance(walletAddress)
      setBalance(parseFloat(ethers.formatEther(bal)))
      
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
      
      // Show confirmation toast
      setToast({ txHash, amount: cost })
      setTimeout(() => setToast(null), 3000)

      // Get AI response
      const aiResponse = getAIResponse(text)
      const aiMsg = { 
        role: 'ai', 
        content: aiResponse, 
        time: new Date(),
        txHash,
        cost,
      }
      setMessages(prev => [...prev, aiMsg])

    } catch (err) {
      console.error(err)
      setMessages(prev => [...prev, { role: 'ai', content: "Payment rejected or transaction failed. Please try again.", time: new Date() }])
      setToast(null)
    }
    
    setIsTyping(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <div className="chat-app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo" onClick={onBack}>⚡ ArcPay</div>
          <div className="sidebar-subtitle">Web3 dApp: Pay-per-Query</div>
        </div>

        {/* Wallet */}
        <div className="wallet-card">
          <div className="wallet-label">USDC Balance (Testnet)</div>
          <div className="wallet-balance">{balance.toFixed(4)}</div>
          
          {walletAddress ? (
            <>
              <div className="wallet-address">
                <span>{shortHash(walletAddress)}</span>
                <span style={{ cursor: 'pointer' }} onClick={() => navigator.clipboard?.writeText(walletAddress)}>📋</span>
              </div>
              <div className="wallet-network">
                <span className="dot"></span>
                Arc Testnet (Live)
              </div>
            </>
          ) : (
            <button className="deposit-btn" onClick={handleConnectWallet} style={{ background: '#f6851b', color: 'white' }}>
              🦊 Connect MetaMask
            </button>
          )}
        </div>

        {/* Payment History */}
        <div className="payment-history">
          <div className="payment-history-title">On-Chain Payments</div>
          {payments.length === 0 ? (
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', padding: '16px 0', textAlign: 'center' }}>
              No payments yet. Ask a question!
            </div>
          ) : (
            payments.slice(0, 20).map((p, i) => (
              <div className="payment-item" key={i}>
                <div className="payment-info">
                  <span className="payment-type">Tx: {shortHash(p.txHash)}</span>
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
            <span className="sidebar-stat-label">Settlement</span>
            <span className="sidebar-stat-value" style={{ color: 'var(--arc-accent)' }}>Arc L1</span>
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
                Web3 Active
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
              <h2 className="welcome-title">Welcome to ArcPay dApp</h2>
              <p className="welcome-desc">
                This is a live Web3 integration. Each query requires a real transaction on the Arc Testnet using MetaMask. Cost is $0.001 USDC per query.
              </p>
              <div className="welcome-suggestions">
                {SUGGESTIONS.map((s, i) => (
                  <div className="suggestion-card" key={i} onClick={() => sendMessage(s.text)}>
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
                      <RenderMarkdown text={msg.content} />
                    </div>
                    {msg.role === 'ai' && msg.txHash && (
                      <div className="message-payment" style={{ cursor: 'pointer' }} onClick={() => window.open(`https://testnet.arcscan.app/tx/${msg.txHash}`)}>
                        <span className="check">✓</span>
                        Paid ${msg.cost?.toFixed(4)} USDC • {shortHash(msg.txHash)} (View Tracker)
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="message ai">
                  <div className="message-avatar">🤖</div>
                  <div className="message-content">
                    <div className="typing-indicator" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                      <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Awaiting wallet signature & network confirmation...</div>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <span></span><span></span><span></span>
                      </div>
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
              disabled={isTyping || !signer}
            />
            <button 
              className="chat-send-btn" 
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isTyping || !signer}
            >
              ➤
            </button>
          </div>
          <div className="chat-input-hint">
            {!signer ? (
              <span style={{ color: '#f6851b' }}>⚠️ Please Connect MetaMask to start chatting!</span>
            ) : (
              <>
                <span>Press Enter to send • Connects to Web3 Contract</span>
                <span>⚡ Cost: $0.001 USDC (Requires MetaMask Approval)</span>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Transaction Toast */}
      {toast && (
        <div className="tx-toast">
          <div className="tx-toast-icon">{toast.type === 'deposit' ? '🦊' : (toast.type === 'info' ? '⏳' : '✓')}</div>
          <div className="tx-toast-info">
            <span className="tx-toast-title">
              {toast.type === 'deposit' 
                ? `MetaMask Connected ✓` 
                : (toast.type === 'info' ? 'Processing on Blockchain...' : `Payment Confirmed — $${toast.amount.toFixed(4)} USDC`)
              }
            </span>
            <span className="tx-toast-hash">
              {toast.txHash === 'Connected' || toast.txHash === 'Processing Transaction...' ? toast.txHash : `Tx: ${shortHash(toast.txHash)} • View on Explorer`}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatApp
