import { useCallback, useEffect, useRef, useState } from 'react';
import type { Project } from '@/data/projects';
import { cn } from '@/lib/utils';

interface Props {
  projects: Project[];
}

function wrapIndex(i: number, len: number) {
  return ((i % len) + len) % len;
}

export default function ProjectCarousel({ projects }: Props) {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const deltaX = useRef(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<number | null>(null);
  const len = projects.length;

  const go = useCallback(
    (next: number) => setActive(wrapIndex(next, len)),
    [len],
  );

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    autoplayRef.current = window.setInterval(() => {
      setActive((a) => wrapIndex(a + 1, len));
    }, 4800);
  }, [len, stopAutoplay]);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay, stopAutoplay]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        stopAutoplay();
        go(active - 1);
      }
      if (e.key === 'ArrowRight') {
        stopAutoplay();
        go(active + 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, go, stopAutoplay]);

  const onPointerDown = (e: React.PointerEvent) => {
    stopAutoplay();
    setDragging(true);
    startX.current = e.clientX;
    deltaX.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    deltaX.current = e.clientX - startX.current;
  };

  const onPointerUp = () => {
    if (!dragging) return;
    setDragging(false);
    if (deltaX.current > 60) go(active - 1);
    else if (deltaX.current < -60) go(active + 1);
    startAutoplay();
  };

  return (
    <div className="relative w-full select-none">
      <div
        ref={stageRef}
        className="relative mx-auto h-[420px] w-full touch-pan-y sm:h-[460px] md:h-[500px]"
        style={{ perspective: '1400px', perspectiveOrigin: '50% 45%' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {projects.map((project, i) => {
            let offset = i - active;
            if (offset > len / 2) offset -= len;
            if (offset < -len / 2) offset += len;

            const abs = Math.abs(offset);
            const isActive = offset === 0;
            const rotateY = offset * -42;
            const translateX = offset * 58;
            const translateZ = isActive ? 80 : 40 - abs * 70;
            const scale = isActive ? 1 : Math.max(0.72, 0.92 - abs * 0.1);
            const opacity = abs > 2 ? 0 : isActive ? 1 : 0.55 - abs * 0.1;
            const zIndex = 20 - abs;

            return (
              <article
                key={project.id}
                className={cn(
                  'absolute left-1/2 top-1/2 w-[min(82vw,340px)] overflow-hidden rounded-2xl bg-[hsl(var(--ink))] text-white sm:w-[380px]',
                  'duration-500 ease-out',
                  isActive ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer',
                  dragging && 'duration-0',
                )}
                style={{
                  transform: `translate(-50%, -50%) translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  pointerEvents: abs > 2 ? 'none' : 'auto',
                  boxShadow: isActive
                    ? '0 28px 60px hsl(168 28% 8% / 0.35)'
                    : '0 12px 30px hsl(168 28% 8% / 0.2)',
                }}
                onClick={() => {
                  if (!isActive && Math.abs(deltaX.current) < 8) {
                    stopAutoplay();
                    go(i);
                    startAutoplay();
                  }
                }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.cover}
                    alt=""
                    draggable={false}
                    className={cn(
                      'h-full w-full object-cover transition-transform duration-700',
                      isActive && 'scale-105',
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink))] via-[hsl(var(--ink)_/_0.4)] to-transparent" />
                  <div className="absolute left-4 top-4 flex items-center gap-2 text-xs tracking-wide text-white/80">
                    <span className="font-display uppercase">{project.subtitle}</span>
                    <span className="h-1 w-1 rounded-sm bg-accent" />
                    <span>{project.year}</span>
                  </div>
                </div>

                <div className="space-y-3 px-5 pb-5 pt-1">
                  <h3 className="font-display text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
                    {project.title}
                  </h3>
                  <p className="line-clamp-2 text-sm leading-relaxed text-white/70">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-white/10 px-2 py-0.5 text-[11px] text-white/75"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {isActive && (
                    <a
                      href={project.href}
                      className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--accent))] transition-opacity hover:opacity-80"
                      onClick={(e) => e.stopPropagation()}
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      查看详情
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="上一项"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-secondary"
          onClick={() => {
            stopAutoplay();
            go(active - 1);
            startAutoplay();
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="项目进度">
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={p.title}
              className={cn(
                'h-1.5 rounded-sm transition-all duration-300',
                i === active ? 'w-8 bg-primary' : 'w-1.5 bg-border hover:bg-muted-foreground/40',
              )}
              onClick={() => {
                stopAutoplay();
                go(i);
                startAutoplay();
              }}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="下一项"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-secondary"
          onClick={() => {
            stopAutoplay();
            go(active + 1);
            startAutoplay();
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        拖拽或方向键切换 · {active + 1} / {len}
      </p>
    </div>
  );
}
