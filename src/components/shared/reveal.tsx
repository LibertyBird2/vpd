"use client";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ElementType,
  type CSSProperties,
} from "react";

export type RevealDirection = "up" | "down" | "left" | "right" | "zoom" | "blur" | "fade";

export interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  blur?: number;
  scale?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** Shared IntersectionObserver pool to minimize main-thread execution time. */
const observerMap = new Map<string, IntersectionObserver>();
const elementCallbacks = new Map<Element, (isIntersecting: boolean) => void>();

function getObserver(threshold: number, rootMargin: string): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) return null;
  const key = `${threshold}_${rootMargin}`;
  if (!observerMap.has(key)) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const cb = elementCallbacks.get(entry.target);
          if (cb) {
            cb(entry.isIntersecting);
          }
        }
      },
      { threshold, rootMargin },
    );
    observerMap.set(key, observer);
  }
  return observerMap.get(key) || null;
}

export function Reveal({
  children,
  as: Tag = "div",
  direction = "up",
  delay = 0,
  duration = 700,
  distance = 24,
  blur = 8,
  scale = 0.94,
  threshold = 0.08,
  once = true,
  className = "",
  style: userStyle = {},
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const el = ref.current;
    if (!el) return;

    // Check reduced motion preference
    if (
      typeof window !== "undefined" &&
      (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        document.documentElement.classList.contains("reduce-motion") ||
        document.body.classList.contains("reduce-motion"))
    ) {
      setShown(true);
      return;
    }

    const observer = getObserver(threshold, "0px 0px -8% 0px");
    if (!observer) {
      setShown(true);
      return;
    }

    const handleIntersect = (isIntersecting: boolean) => {
      if (isIntersecting) {
        // Double requestAnimationFrame ensures browser paints the initial unrevealed state first
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setShown(true);
          });
        });
        if (once) {
          elementCallbacks.delete(el);
          observer.unobserve(el);
        }
      } else if (!once) {
        setShown(false);
      }
    };

    elementCallbacks.set(el, handleIntersect);
    observer.observe(el);

    return () => {
      elementCallbacks.delete(el);
      observer.unobserve(el);
    };
  }, [threshold, once]);

  // Compute hidden state transforms based on direction
  const getHiddenTransform = () => {
    switch (direction) {
      case "up":
        return `translate3d(0, ${distance}px, 0)`;
      case "down":
        return `translate3d(0, -${distance}px, 0)`;
      case "left":
        return `translate3d(${distance}px, 0, 0)`;
      case "right":
        return `translate3d(-${distance}px, 0, 0)`;
      case "zoom":
        return `scale(${scale})`;
      case "blur":
      case "fade":
      default:
        return "none";
    }
  };

  const getHiddenFilter = () => {
    if (direction === "blur") {
      return `blur(${blur}px)`;
    }
    return "none";
  };

  const isHidden = mounted && !shown;

  const animationStyle: CSSProperties = {
    opacity: isHidden ? 0 : 1,
    transform: isHidden ? getHiddenTransform() : "translate3d(0, 0, 0) scale(1)",
    filter: isHidden ? getHiddenFilter() : "blur(0px)",
    transitionProperty: "opacity, transform, filter",
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    transitionDelay: `${delay}ms`,
    willChange: "opacity, transform, filter",
    ...userStyle,
  };

  return (
    <Tag ref={ref as never} style={animationStyle} className={className}>
      {children}
    </Tag>
  );
}
