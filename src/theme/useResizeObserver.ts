/// <reference types="resize-observer-browser" />
import { MutableRefObject, useEffect, useState, useRef } from "react"

type ObservedSize = {
  width: number | undefined
  height: number | undefined
}

type HookResponse<T extends Element> = {
  ref: MutableRefObject<T | null>
} & ObservedSize

function useResizeObserver<T extends Element>(): HookResponse<T> {
  const refElement = useRef<T | null>(null)
  const resizeObserverRef = useRef<ResizeObserver>()
  const [size, setSize] = useState<ObservedSize>({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    resizeObserverRef.current = new ResizeObserver((entries) => {
      if (!Array.isArray(entries) || entries.length === 0) {
        return
      }

      const entry = entries[0]

      setSize({
        height: Math.round(entry.contentRect.height),
        width: Math.round(entry.contentRect.width),
      })
    })

    if (refElement.current != null) {
      resizeObserverRef.current.observe(refElement.current)
    }

    return () => {
      if (resizeObserverRef.current != null && refElement.current != null) {
        resizeObserverRef.current.unobserve(refElement.current)
      }
    }
  }, [])

  return {
    ...size,
    ref: refElement,
  }
}

export default useResizeObserver
