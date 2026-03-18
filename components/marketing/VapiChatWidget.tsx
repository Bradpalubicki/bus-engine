'use client'

import { useEffect, useRef, useState } from 'react'
import Vapi from '@vapi-ai/web'

type CallStatus = 'idle' | 'connecting' | 'active' | 'ending'

const API_KEY = process.env.NEXT_PUBLIC_VAPI_API_KEY!
const ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_CCW_ASSISTANT_ID!

export function VapiChatWidget() {
  const vapiRef = useRef<Vapi | null>(null)
  const [status, setStatus] = useState<CallStatus>('idle')
  const [open, setOpen] = useState(false)
  const [transcript, setTranscript] = useState<{ role: 'user' | 'assistant'; text: string }[]>([])
  const [speaking, setSpeaking] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const vapi = new Vapi(API_KEY)
    vapiRef.current = vapi

    vapi.on('call-start', () => setStatus('active'))
    vapi.on('call-end', () => {
      setStatus('idle')
      setSpeaking(false)
    })
    vapi.on('speech-start', () => setSpeaking(true))
    vapi.on('speech-end', () => setSpeaking(false))
    vapi.on('message', (msg: unknown) => {
      const m = msg as { type: string; role?: string; transcript?: string; transcriptType?: string }
      if (m.type === 'transcript' && m.transcriptType === 'final' && m.transcript) {
        setTranscript(prev => [...prev, {
          role: (m.role === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
          text: m.transcript!,
        }])
      }
    })

    return () => {
      vapi.stop()
    }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [transcript])

  async function startCall() {
    if (!vapiRef.current || status !== 'idle') return
    setStatus('connecting')
    setTranscript([])
    try {
      await vapiRef.current.start(ASSISTANT_ID)
    } catch {
      setStatus('idle')
    }
  }

  function endCall() {
    setStatus('ending')
    vapiRef.current?.stop()
  }

  return (
    <>
      {/* Chat bubble */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#003087] text-white shadow-xl flex items-center justify-center hover:bg-[#002070] transition-colors"
        aria-label="Open CCW AI Assistant"
      >
        {open ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-4 4z" />
          </svg>
        )}
        {status === 'active' && (
          <span className="absolute top-1 right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden" style={{ maxHeight: '480px' }}>
          {/* Header */}
          <div className="bg-[#003087] text-white px-4 py-3 flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full bg-[#E8A020] flex items-center justify-center flex-shrink-0 ${speaking ? 'ring-2 ring-white ring-offset-1 ring-offset-[#003087]' : ''}`}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/>
                <path d="M19 11a7 7 0 0 1-14 0H3a9 9 0 0 0 18 0h-2z"/>
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold">CCW Assistant</div>
              <div className="text-xs text-blue-200">
                {status === 'idle' && 'Ask about rebuilds, ZEPS, fleet services'}
                {status === 'connecting' && 'Connecting...'}
                {status === 'active' && (speaking ? 'Speaking...' : 'Listening...')}
                {status === 'ending' && 'Ending call...'}
              </div>
            </div>
          </div>

          {/* Transcript */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-[160px]">
            {transcript.length === 0 && status === 'idle' && (
              <div className="text-center text-gray-400 text-xs py-8 px-4">
                <div className="text-2xl mb-2">🚌</div>
                <div>Tap <strong>Start Call</strong> to speak with our AI assistant about CCW services, rebuild timelines, ZEPS electric conversion, and more.</div>
              </div>
            )}
            {transcript.length === 0 && status === 'connecting' && (
              <div className="text-center text-gray-400 text-xs py-8">
                <div className="animate-spin text-2xl mb-2">⚙️</div>
                Connecting to CCW Assistant...
              </div>
            )}
            {transcript.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-xl px-3 py-2 text-xs ${
                  msg.role === 'user'
                    ? 'bg-[#003087] text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Controls */}
          <div className="p-3 border-t border-gray-100">
            {status === 'idle' && (
              <button
                onClick={startCall}
                className="w-full bg-[#003087] text-white text-sm font-bold py-2.5 rounded-xl hover:bg-[#002070] transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/>
                  <path d="M19 11a7 7 0 0 1-14 0H3a9 9 0 0 0 18 0h-2z"/>
                </svg>
                Start Call
              </button>
            )}
            {(status === 'active' || status === 'connecting') && (
              <button
                onClick={endCall}
                className="w-full bg-red-600 text-white text-sm font-bold py-2.5 rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a16 16 0 0 0 0 18l1.5-1.5A14 14 0 0 1 5 3z" />
                </svg>
                End Call
              </button>
            )}
            {status === 'ending' && (
              <div className="text-center text-xs text-gray-400 py-2">Ending...</div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
