'use client'
import { useState, useRef, useEffect } from 'react'
import Vapi from '@vapi-ai/web'

function MarkdownMessage({ content }: { content: string }) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let listItems: string[] = []

  const flushList = (key: string) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={key} className="list-disc pl-4 space-y-0.5 my-1">
          {listItems.map((item, i) => <li key={i}>{renderInline(item)}</li>)}
        </ul>
      )
      listItems = []
    }
  }

  const renderInline = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
      if (part.startsWith('*') && part.endsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>
      return part
    })
  }

  lines.forEach((line, i) => {
    const isBullet = /^[-•]\s+/.test(line)
    if (isBullet) {
      listItems.push(line.replace(/^[-•]\s+/, ''))
    } else {
      flushList(`list-${i}`)
      if (line.trim() === '') {
        if (elements.length > 0) elements.push(<br key={`br-${i}`} />)
      } else {
        elements.push(<p key={`p-${i}`} className="my-0.5">{renderInline(line)}</p>)
      }
    }
  })
  flushList('list-end')

  return <div className="space-y-0.5">{elements}</div>
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

type CallStatus = 'idle' | 'connecting' | 'active' | 'ending'

const VAPI_KEY = process.env.NEXT_PUBLIC_VAPI_API_KEY
const VAPI_ASSISTANT = process.env.NEXT_PUBLIC_VAPI_CCW_ASSISTANT_ID

export default function AIChat() {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<'chat' | 'voice'>('chat')

  // Text chat state
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "I'm the CCW Fleet Advisor. Are you exploring fleet refurbishment, purchasing pre-owned buses, or looking at leasing options?" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  // Voice call state
  const vapiRef = useRef<Vapi | null>(null)
  const [callStatus, setCallStatus] = useState<CallStatus>('idle')
  const [speaking, setSpeaking] = useState(false)
  const [voiceTranscript, setVoiceTranscript] = useState<Message[]>([])

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!VAPI_KEY) return
    const vapi = new Vapi(VAPI_KEY)
    vapiRef.current = vapi

    vapi.on('call-start', () => setCallStatus('active'))
    vapi.on('call-end', () => { setCallStatus('idle'); setSpeaking(false) })
    vapi.on('speech-start', () => setSpeaking(true))
    vapi.on('speech-end', () => setSpeaking(false))
    vapi.on('message', (msg: unknown) => {
      const m = msg as { type: string; role?: string; transcript?: string; transcriptType?: string }
      if (m.type === 'transcript' && m.transcriptType === 'final' && m.transcript) {
        setVoiceTranscript(prev => [...prev, {
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.transcript!,
        }])
      }
    })

    return () => { vapi.stop() }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, voiceTranscript])

  // Text chat send
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
      if (data.message) setMessages(prev => [...prev, { role: 'assistant', content: data.message! }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm temporarily unavailable. Please call (951) 684-9585." }])
    } finally {
      setLoading(false)
    }
  }

  // Voice call
  async function startCall() {
    if (!vapiRef.current || !VAPI_ASSISTANT || callStatus !== 'idle') return
    setCallStatus('connecting')
    setVoiceTranscript([])
    try {
      await vapiRef.current.start(VAPI_ASSISTANT)
    } catch {
      setCallStatus('idle')
    }
  }

  function endCall() {
    setCallStatus('ending')
    vapiRef.current?.stop()
  }

  const activeMessages = mode === 'voice' ? voiceTranscript : messages

  return (
    <>
      {/* Label pill — visible when closed */}
      {!open && (
        <div className="fixed bottom-[5.5rem] right-6 z-50 pointer-events-none">
          <div className="bg-[#003087] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#E8A020] rounded-full animate-pulse" />
            Ask our AI Agent
          </div>
        </div>
      )}

      {/* Bubble */}
      <button
        onClick={() => setOpen(o => !o)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 text-[#003087] rounded-full shadow-xl transition-all hover:scale-110 flex items-center justify-center ${open ? 'bg-[#003087] text-white' : 'bg-[#E8A020] ring-4 ring-[#E8A020]/30'}`}
        aria-label="Chat with CCW Fleet Advisor"
      >
        {open ? (
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7 text-[#003087]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
        {callStatus === 'active' && (
          <span className="absolute top-1 right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden" style={{ height: '500px' }}>
          {/* Header */}
          <div className="bg-[#003087] text-white p-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full bg-[#E8A020] flex items-center justify-center ${speaking ? 'ring-2 ring-white' : ''}`}>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/>
                  <path d="M19 11a7 7 0 0 1-14 0H3a9 9 0 0 0 18 0h-2z"/>
                </svg>
              </div>
              <div>
                <div className="font-bold text-sm">CCW Fleet Advisor</div>
                <div className="text-xs text-blue-200">
                  {mode === 'voice' && callStatus === 'active' && (speaking ? 'Speaking...' : 'Listening...')}
                  {mode === 'voice' && callStatus === 'connecting' && 'Connecting...'}
                  {mode === 'voice' && callStatus === 'idle' && 'AI-powered voice · Complete Coach Works'}
                  {mode === 'chat' && 'AI-powered · Complete Coach Works'}
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white text-xl leading-none" aria-label="Close">×</button>
          </div>

          {/* Mode toggle */}
          {VAPI_KEY && (
            <div className="flex border-b border-gray-100 flex-shrink-0">
              <button
                onClick={() => setMode('chat')}
                className={`flex-1 py-2 text-xs font-semibold transition-colors ${mode === 'chat' ? 'text-[#003087] border-b-2 border-[#003087]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                💬 Text Chat
              </button>
              <button
                onClick={() => setMode('voice')}
                className={`flex-1 py-2 text-xs font-semibold transition-colors ${mode === 'voice' ? 'text-[#003087] border-b-2 border-[#003087]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                🎙️ Voice Call
              </button>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {mode === 'voice' && voiceTranscript.length === 0 && (
              <div className="text-center text-gray-400 text-xs py-10 px-4">
                <div className="text-3xl mb-3">🎙️</div>
                <div className="font-medium text-gray-500 mb-1">Talk to the CCW Fleet Advisor</div>
                <div>Ask about rebuild timelines, ZEPS electric conversion, fleet services, and more.</div>
              </div>
            )}
            {activeMessages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${m.role === 'user' ? 'bg-[#003087] text-white rounded-br-sm' : 'bg-gray-100 text-gray-800 rounded-bl-sm'}`}>
                  {m.role === 'assistant' ? <MarkdownMessage content={m.content} /> : m.content}
                </div>
              </div>
            ))}
            {loading && mode === 'chat' && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 150, 300].map(delay => (
                      <div key={delay} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-gray-200 p-4 flex-shrink-0">
            {mode === 'chat' && (
              <div className="flex gap-2">
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
            )}
            {mode === 'voice' && (
              <>
                {callStatus === 'idle' && (
                  <button
                    onClick={startCall}
                    className="w-full bg-[#003087] text-white text-sm font-bold py-2.5 rounded-xl hover:bg-[#002070] transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/>
                      <path d="M19 11a7 7 0 0 1-14 0H3a9 9 0 0 0 18 0h-2z"/>
                    </svg>
                    Start Voice Call
                  </button>
                )}
                {(callStatus === 'active' || callStatus === 'connecting') && (
                  <button
                    onClick={endCall}
                    className="w-full bg-red-600 text-white text-sm font-bold py-2.5 rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    End Call
                  </button>
                )}
                {callStatus === 'ending' && (
                  <div className="text-center text-xs text-gray-400 py-2">Ending call...</div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
