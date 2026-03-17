'use client'

import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { GripVertical } from 'lucide-react'

interface BeforeAfterSliderProps {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  initialPosition?: number // 0–100, default 50
  height?: number          // px, default 480
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  initialPosition = 50,
  height = 480,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(initialPosition)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const getPosition = useCallback((clientX: number): number => {
    const el = containerRef.current
    if (!el) return 50
    const rect = el.getBoundingClientRect()
    const x = clientX - rect.left
    return Math.min(100, Math.max(0, (x / rect.width) * 100))
  }, [])

  const onMouseDown = () => { dragging.current = true }
  const onMouseUp   = () => { dragging.current = false }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return
    setPosition(getPosition(e.clientX))
  }

  const onTouchStart = () => { dragging.current = true }
  const onTouchEnd   = () => { dragging.current = false }
  const onTouchMove  = (e: React.TouchEvent) => {
    if (!dragging.current) return
    setPosition(getPosition(e.touches[0].clientX))
  }

  return (
    <div
      ref={containerRef}
      className="relative select-none overflow-hidden rounded-2xl cursor-col-resize"
      style={{ height }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* AFTER (full width, bottom layer) */}
      <div className="absolute inset-0">
        <Image src={afterSrc} alt={afterAlt} fill className="object-cover" />
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
          After
        </div>
      </div>

      {/* BEFORE (clipped to left of handle) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <div className="absolute inset-0" style={{ width: containerRef.current?.offsetWidth ?? '100%' }}>
          <Image src={beforeSrc} alt={beforeAlt} fill className="object-cover" />
        </div>
        <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
          Before
        </div>
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/90 shadow-lg z-10"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center cursor-col-resize"
        style={{ left: `${position}%` }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        <GripVertical className="w-5 h-5 text-gray-600" />
      </div>
    </div>
  )
}
