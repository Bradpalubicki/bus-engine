'use client'
import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function AIChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "I'm the CCW Fleet Advisor. Are you exploring fleet refurbishment, purchasing pre-owned buses, or looking at leasing options?" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    if (!input.trim() || loading) return
    const userMessage = input.trim()
    setInput('')
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      const data = await res.json() as { message?: string }
      if (data.message) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message! }])
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm temporarily unavailable. Please call (951) 826-5000." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#003087] text-white rounded-full shadow-lg hover:bg-[#002070] transition-all hover:scale-110 items-center justify-center ${open ? 'hidden' : 'flex'}`}
        aria-label="Chat with CCW Fleet Advisor"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="bg-[#003087] text-white p-4 flex items-center justify-between">
            <div>
              <div className="font-bold text-sm">CCW Fleet Advisor</div>
              <div className="text-xs text-blue-200">AI-powered · Complete Coach Works</div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white text-xl leading-none" aria-label="Close chat">×</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${m.role === 'user' ? 'bg-[#003087] text-white rounded-br-sm' : 'bg-gray-100 text-gray-800 rounded-bl-sm'}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 150, 300].map(delay => (
                      <div key={delay} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay:`${delay}ms`}} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="border-t border-gray-200 p-4 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask about refurbishment, buses, leasing..."
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="bg-[#003087] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#002070] disabled:opacity-50 transition-colors"
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  )
}
