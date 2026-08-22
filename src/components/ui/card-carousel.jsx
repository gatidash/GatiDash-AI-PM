import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

// ─────────────────────────────────────────────────────────────
// CardCarousel — a peeking row of cards.
//
// Motion is native scroll-snap rather than a transform track: the browser
// gives real momentum on trackpads and touch, the gesture is interruptible
// mid-flight, and it composites off the main thread. Arrows, dots and the
// arrow keys all drive the same scroller through scrollTo({behavior:'smooth'}),
// so every input lands in exactly the same place. Mouse users get pointer-drag
// with a velocity flick on release.
// ─────────────────────────────────────────────────────────────

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const cardsOf = (el) => Array.from(el.querySelectorAll(':scope > [data-card]'))

export function CardCarousel({
  items,
  renderItem,
  ariaLabel = 'carousel',
  // Tailwind width classes for one card at each breakpoint — controls the peek.
  cardClass = 'w-[85%] sm:w-[58%] lg:w-[46%]',
  itemKey = (_, i) => i,
  onReady,
}) {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [overflowing, setOverflowing] = useState(false)
  // A trailing spacer so the LAST card can also sit flush-left. Without it the
  // final cards share one clamped scroll position and their dots go dead. It
  // has to be a flex item rather than padding: the cards are sized in %, and
  // padding would shrink the content box those percentages resolve against.
  const [gutter, setGutter] = useState(0)
  const n = items.length

  const measure = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const cards = cardsOf(el)
    if (!cards.length) return
    const last = cards[cards.length - 1]
    const content = last.offsetLeft + last.offsetWidth - cards[0].offsetLeft
    const overflows = content > el.clientWidth + 2
    setOverflowing(overflows)
    setGutter(overflows ? Math.max(0, Math.round(el.clientWidth - last.offsetWidth)) : 0)
  }, [])

  const sync = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const cards = cardsOf(el)
    if (!cards.length) return
    // Leading edge, not centre: the cards snap to start, and in a peeking row
    // the last card never reaches the centre.
    let best = 0
    let bestDist = Infinity
    cards.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft - cards[0].offsetLeft - el.scrollLeft)
      if (d < bestDist) {
        bestDist = d
        best = i
      }
    })
    setActive(best)
    setAtStart(el.scrollLeft <= 2)
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 2)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(sync)
    }
    const onResize = () => {
      measure()
      sync()
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onResize) : null
    ro?.observe(el)
    onResize()
    return () => {
      cancelAnimationFrame(frame)
      ro?.disconnect()
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [sync, measure])

  // Fonts land after first paint and change how the cards wrap — re-measure.
  useEffect(() => {
    if (typeof document === 'undefined' || !document.fonts) return
    document.fonts.ready
      .then(() => {
        measure()
        sync()
      })
      .catch(() => {})
  }, [measure, sync])

  const scrollToIndex = useCallback((i) => {
    const el = trackRef.current
    if (!el) return
    const cards = cardsOf(el)
    const target = cards[Math.max(0, Math.min(i, cards.length - 1))]
    if (!target) return
    el.scrollTo({
      left: target.offsetLeft - cards[0].offsetLeft,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
  }, [])

  const go = (d) => scrollToIndex(active + d)

  // Let a parent drive the row (e.g. "see the work from this era").
  useEffect(() => {
    onReady?.({ scrollToIndex })
  }, [onReady, scrollToIndex])

  // ── Pointer drag (mouse). Touch keeps the native scroller. ──
  const drag = useRef(null)

  const onPointerDown = (e) => {
    if (e.pointerType === 'touch') return
    const el = trackRef.current
    if (!el) return
    drag.current = {
      startX: e.clientX,
      startScroll: el.scrollLeft,
      lastX: e.clientX,
      lastT: e.timeStamp,
      v: 0,
      moved: false,
      captured: false,
    }
  }

  const onPointerMove = (e) => {
    const d = drag.current
    const el = trackRef.current
    if (!d || !el) return
    const dx = e.clientX - d.startX
    if (!d.moved && Math.abs(dx) > 4) {
      // Capture only once a real drag starts. Capturing on pointerdown would
      // retarget the click to the track and swallow taps on the cards.
      d.moved = true
      d.captured = true
      el.style.scrollSnapType = 'none'
      el.setPointerCapture?.(e.pointerId)
    }
    if (!d.moved) return
    el.scrollLeft = d.startScroll - dx
    const dt = e.timeStamp - d.lastT
    if (dt > 0) d.v = (e.clientX - d.lastX) / dt // px per ms
    d.lastX = e.clientX
    d.lastT = e.timeStamp
  }

  const endDrag = (e) => {
    const d = drag.current
    const el = trackRef.current
    if (!d || !el) {
      drag.current = null
      return
    }
    if (d.captured) {
      el.releasePointerCapture?.(e.pointerId)
      el.style.scrollSnapType = ''
    }
    if (!d.moved) {
      drag.current = null
      return
    }
    const cards = cardsOf(el)
    let nearest = 0
    let bestDist = Infinity
    cards.forEach((c, i) => {
      const dist = Math.abs(c.offsetLeft - cards[0].offsetLeft - el.scrollLeft)
      if (dist < bestDist) {
        bestDist = dist
        nearest = i
      }
    })
    // A flick throws to the neighbouring card; a slow drag settles on the
    // nearest one.
    const flick = Math.abs(d.v) > 0.45 ? (d.v < 0 ? 1 : -1) : 0
    scrollToIndex(nearest + flick)
    setTimeout(() => {
      drag.current = null
    }, 0)
  }

  // Suppress the click that ends a drag so cards don't fire on release.
  const onClickCapture = (e) => {
    if (drag.current?.moved) {
      e.preventDefault()
      e.stopPropagation()
    }
    drag.current = null
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(-1)
    }
  }

  const showControls = n > 1 && overflowing
  // `active` is the leading card and drives navigation. At the very end of the
  // track the readout jumps to the last card — the row is showing it even when
  // it is not flush left.
  const display = atEnd ? n - 1 : active

  return (
    <div aria-roledescription="carousel" aria-label={ariaLabel}>
      {showControls && (
        <div className="flex items-center justify-between gap-4 border-t border-sand pt-5">
          <span className="font-mono text-sm text-dust tabular-nums">
            {String(display + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => go(-1)}
              aria-label="Previous"
              disabled={atStart}
              className="h-9 w-9 rounded-full border border-sand flex items-center justify-center text-ink hover:border-accent hover:text-accent transition-colors disabled:opacity-30 disabled:hover:border-sand disabled:hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next"
              disabled={atEnd}
              className="h-9 w-9 rounded-full border border-sand flex items-center justify-center text-ink hover:border-accent hover:text-accent transition-colors disabled:opacity-30 disabled:hover:border-sand disabled:hover:text-ink"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div
        ref={trackRef}
        role="group"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        className={`card-track ${showControls ? 'mt-6' : ''} flex gap-5 sm:gap-6 overflow-x-auto overscroll-x-contain snap-x snap-mandatory pb-2`}
      >
        {items.map((item, i) => (
          <div
            key={itemKey(item, i)}
            data-card=""
            className={`snap-start shrink-0 ${n === 1 ? 'w-full' : cardClass}`}
          >
            {renderItem(item, i, i === active)}
          </div>
        ))}
        {gutter > 0 && <div aria-hidden="true" className="shrink-0" style={{ width: gutter }} />}
      </div>

      {showControls && (
        <div className="mt-6 flex items-center gap-2">
          {items.map((item, i) => (
            <button
              key={itemKey(item, i)}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to card ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === display ? 'w-7 bg-accent' : 'w-1.5 bg-sand hover:bg-dust'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
