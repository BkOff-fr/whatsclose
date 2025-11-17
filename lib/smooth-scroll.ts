'use client'

import Lenis from 'lenis'

let lenis: Lenis | null = null

/**
 * Initialize smooth scrolling with Lenis
 */
export function initSmoothScroll() {
  if (typeof window === 'undefined') return null

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  })

  function raf(time: number) {
    lenis?.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  return lenis
}

/**
 * Scroll to a specific target
 * @param target - Element, selector, or number (scroll position)
 * @param options - Scroll options
 */
export function scrollTo(
  target: HTMLElement | string | number,
  options?: {
    offset?: number
    duration?: number
    easing?: (t: number) => number
    immediate?: boolean
    lock?: boolean
  }
) {
  if (!lenis) return

  lenis.scrollTo(target, options)
}

/**
 * Stop smooth scrolling
 */
export function stopScroll() {
  if (!lenis) return
  lenis.stop()
}

/**
 * Start smooth scrolling
 */
export function startScroll() {
  if (!lenis) return
  lenis.start()
}

/**
 * Destroy the Lenis instance
 */
export function destroySmoothScroll() {
  if (!lenis) return
  lenis.destroy()
  lenis = null
}

/**
 * Get the current Lenis instance
 */
export function getLenis() {
  return lenis
}
