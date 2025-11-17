'use client'

import { useState, useEffect, RefObject } from 'react'

interface UseInViewOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  triggerOnce?: boolean
}

/**
 * Hook to detect if an element is in the viewport
 * Uses Intersection Observer API
 *
 * @param ref - React ref object for the element to observe
 * @param options - Intersection Observer options
 * @returns boolean indicating if the element is in view
 */
export function useInView(
  ref: RefObject<Element>,
  options: UseInViewOptions = {}
): boolean {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    triggerOnce = false,
  } = options

  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting
        setIsInView(inView)

        // If triggerOnce is true, unobserve after first intersection
        if (inView && triggerOnce && element) {
          observer.unobserve(element)
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [ref, threshold, root, rootMargin, triggerOnce])

  return isInView
}

/**
 * Hook to get detailed intersection information
 */
export function useIntersectionObserver(
  ref: RefObject<Element>,
  options: UseInViewOptions = {}
): IntersectionObserverEntry | null {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
  } = options

  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry)
      },
      {
        threshold,
        root,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [ref, threshold, root, rootMargin])

  return entry
}
