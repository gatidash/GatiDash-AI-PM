import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const EASE = [0.2, 0.7, 0.2, 1]

// Reusable one-slide-at-a-time carousel (ibelick/21st pattern: Content / Item /
// Navigation / Indicator), themed with the site tokens. Works uncontrolled, or
// controlled via `index` + `onIndex`. `slideLabels[i]` shows in the control bar.
//
// The viewport height tracks the ACTIVE slide instead of the tallest one, so a
// short slide no longer leaves a screen of dead space under it. Drag/swipe is
// supported on touch as well as the arrows and dots.
export function Carousel({ slides, ariaLabel = 'carousel', slideLabels, index, onIndex }) {
  const [internal, setInternal] = useState(0)
  const n = slides.length
  const i = index != null ? index : internal
  const setI = (updater) => {
    const next = typeof updater === 'function' ? updater(i) : updater
    if (onIndex) onIndex(next)
    else setInternal(next)
  }
  const go = (d) => setI((p) => (p + d + n) % n)

  // ── Adaptive height ────────────────────────────────────────────────
  const slideRefs = useRef([])
  const [height, setHeight] = useState(null)

  const measure = useCallback(() => {
    const el = slideRefs.current[i]
    if (el) setHeight(el.offsetHeight)
  }, [i])

  useEffect(() => {
    measure()
    const el = slideRefs.current[i]
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [i, measure])

  // Fonts land after first paint and change wrapping — re-measure once ready.
  useEffect(() => {
    if (typeof document === 'undefined' || !document.fonts) return
    document.fonts.ready.then(measure).catch(() => {})
  }, [measure])

  return (
    <div aria-roledescription="carousel" aria-label={ariaLabel}>
      {/* Control bar: current label + counter + arrows */}
      <div className="flex items-center justify-between gap-4 border-t border-sand pt-5">
        <span className="eyebrow truncate">{slideLabels ? slideLabels[i] : ''}</span>
        <div className="flex items-center gap-4 flex-shrink-0">
          <span className="font-mono text-sm text-dust tabular-nums">
            {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
          </span>
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="h-9 w-9 rounded-full border border-sand flex items-center justify-center text-ink hover:border-accent hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="h-9 w-9 rounded-full border border-sand flex items-center justify-center text-ink hover:border-accent hover:text-accent transition-colors"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Sliding viewport — height follows the active slide */}
      <motion.div
        className="overflow-hidden mt-6"
        animate={{ height: height ?? 'auto' }}
        initial={false}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <motion.div
          className="flex items-start touch-pan-y"
          animate={{ x: `-${i * 100}%` }}
          transition={{ duration: 0.5, ease: EASE }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) go(1)
            else if (info.offset.x > 60) go(-1)
          }}
        >
          {slides.map((slide, idx) => (
            <div key={idx} className="w-full flex-shrink-0" aria-hidden={i !== idx}>
              <div className="px-0.5" ref={(el) => (slideRefs.current[idx] = el)}>
                {slide}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Dot indicators */}
      <div className="mt-8 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === idx ? 'w-7 bg-accent' : 'w-1.5 bg-sand hover:bg-dust'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
