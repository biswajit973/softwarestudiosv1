import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    Inject,
    Input,
    NgZone,
    OnDestroy,
    PLATFORM_ID,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
    animate,
    state,
    style,
    transition,
    trigger
} from '@angular/animations';

export interface VideoCard {
    src: string;
    poster?: string;
    title?: string;
    subtitle?: string;
}

@Component({
    selector: 'app-video-engine',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './video-engine.component.html',
    styleUrl: './video-engine.component.scss',
    animations: [
        trigger('modalAnim', [
            state('void', style({ opacity: 0 })),
            state('visible', style({ opacity: 1 })),
            transition('void => visible', animate('280ms cubic-bezier(0.25, 1, 0.5, 1)')),
            transition('visible => void', animate('200ms cubic-bezier(0.25, 1, 0.5, 1)'))
        ]),
        trigger('modalScale', [
            state('void', style({ opacity: 0, transform: 'scale(0.88)' })),
            state('visible', style({ opacity: 1, transform: 'scale(1)' })),
            transition('void => visible', animate('320ms cubic-bezier(0.175, 0.885, 0.32, 1.275)')),
            transition('visible => void', animate('200ms cubic-bezier(0.25, 1, 0.5, 1)'))
        ])
    ]
})
export class VideoEngineComponent implements AfterViewInit, OnDestroy {
    @Input() videos: VideoCard[] = [];

    @ViewChild('scrollTrack', { static: false }) scrollTrackRef!: ElementRef<HTMLDivElement>;
    @ViewChildren('videoEl') videoElRefs!: QueryList<ElementRef<HTMLVideoElement>>;

    /** Index within displayVideos that currently has audio */
    audioActiveIndex: number | null = null;
    /** Index that has audio "locked" on via button click */
    audioLockedIndex: number | null = null;

    /** Tracks which cards are still loading */
    loadingSet = new Set<number>();
    /** Tracks which cards are manually paused by user */
    pausedSet = new Set<number>();

    showArrows = false;
    modalOpen = false;
    modalVideo: VideoCard | null = null;

    @ViewChild('modalVideoEl', { static: false }) modalVideoRef!: ElementRef<HTMLVideoElement>;

    /** Doubled list for infinite scroll illusion */
    displayVideos: VideoCard[] = [];

    private readonly isBrowser: boolean;
    private observer: IntersectionObserver | null = null;
    private isDragging = false;
    private dragStartX = 0;
    private dragScrollLeft = 0;
    private autoScrollRaf: number | null = null;
    private autoScrollPaused = false;
    private autoScrollResumeTimer: ReturnType<typeof setTimeout> | null = null;
    private prefersReducedMotion = false;
    private hoveringCard = false;

    constructor(
        @Inject(PLATFORM_ID) platformId: object,
        private readonly sanitizer: DomSanitizer,
        private readonly zone: NgZone
    ) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    ngAfterViewInit(): void {
        if (!this.isBrowser) return;

        // Build doubled list for infinite scroll
        this.displayVideos = [...this.videos, ...this.videos];

        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Wait a tick for DOM to render displayVideos
        setTimeout(() => {
            this.setupVideoListeners();
            this.setupIntersectionObserver();
            this.setupWheelListener();
            if (!this.prefersReducedMotion) {
                this.startAutoScroll();
            }
        }, 100);
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
        this.stopAutoScroll();
        if (this.autoScrollResumeTimer) {
            clearTimeout(this.autoScrollResumeTimer);
        }
    }

    /* ═══════════════════════════════════════════
       VIDEO LISTENERS — loading state
       ═══════════════════════════════════════════ */

    private setupVideoListeners(): void {
        this.videoElRefs.forEach((ref, i) => {
            // All start as loading + paused
            this.loadingSet.add(i);
            this.pausedSet.add(i);
            const el = ref.nativeElement;

            // Fully buffered and ready to play without stalling
            el.addEventListener('canplaythrough', () => {
                this.loadingSet.delete(i);
            });
            // Video started stalling / buffering again
            el.addEventListener('waiting', () => {
                this.loadingSet.add(i);
            });
            // Video is actively playing (buffer recovered)
            el.addEventListener('playing', () => {
                this.loadingSet.delete(i);
            });
        });
    }

    isLoading(index: number): boolean {
        return this.loadingSet.has(index);
    }

    /* ═══════════════════════════════════════════
       PAUSE / PLAY TOGGLE
       ═══════════════════════════════════════════ */

    togglePause(index: number): void {
        const refs = this.videoElRefs?.toArray();
        if (!refs?.[index]) return;

        // Don't allow play if still loading
        if (this.pausedSet.has(index) && this.loadingSet.has(index)) return;

        const video = refs[index].nativeElement;

        if (this.pausedSet.has(index)) {
            this.pausedSet.delete(index);
            video.play().catch(() => { });
        } else {
            this.pausedSet.add(index);
            video.pause();
        }
    }

    isPaused(index: number): boolean {
        return this.pausedSet.has(index);
    }

    /* ═══════════════════════════════════════════
       INTERSECTION OBSERVER — autoplay/pause
       ═══════════════════════════════════════════ */

    private setupIntersectionObserver(): void {
        const track = this.scrollTrackRef?.nativeElement;
        if (!track) return;

        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const el = entry.target as HTMLVideoElement;
                    const idx = this.videoElRefs.toArray().findIndex(r => r.nativeElement === el);
                    if (!entry.isIntersecting) {
                        // Pause when scrolled out of view (but keep paused state)
                        if (!this.pausedSet.has(idx)) {
                            el.pause();
                        }
                    } else {
                        // Resume only if user explicitly started playing
                        if (!this.pausedSet.has(idx)) {
                            el.play().catch(() => { });
                        }
                    }
                });
            },
            { root: track, threshold: 0.3 }
        );

        this.videoElRefs.forEach((ref) => {
            this.observer!.observe(ref.nativeElement);
        });
    }

    /* ═══════════════════════════════════════════
       HOVER — unmute on enter, mute on leave
       ═══════════════════════════════════════════ */

    onCardEnter(index: number): void {
        this.hoveringCard = true;
        this.pauseAutoScrollWithDebounce();

        // If audio is locked on another card, don't override
        if (this.audioLockedIndex !== null && this.audioLockedIndex !== index) return;

        this.setAudioActive(index);
    }

    onCardLeave(index: number): void {
        this.hoveringCard = false;
        this.scheduleAutoScrollResume();

        // If audio is locked on this card, keep it playing
        if (this.audioLockedIndex === index) return;

        // Otherwise mute this card
        if (this.audioActiveIndex === index) {
            this.setAudioActive(null);
        }
    }

    /* ═══════════════════════════════════════════
       AUDIO LOCK — click to toggle persistent audio
       ═══════════════════════════════════════════ */

    toggleAudioLock(index: number): void {
        if (this.audioLockedIndex === index) {
            // Unlock — go back to muted
            this.audioLockedIndex = null;
            this.setAudioActive(null);
            this.scheduleAutoScrollResume();
        } else {
            // Lock this card's audio on
            this.audioLockedIndex = index;
            this.setAudioActive(index);
            this.pauseAutoScrollWithDebounce();
        }
    }

    isAudioLocked(index: number): boolean {
        return this.audioLockedIndex === index;
    }

    isAudioActive(index: number): boolean {
        return this.audioActiveIndex === index;
    }

    private setAudioActive(index: number | null): void {
        this.audioActiveIndex = index;

        // Mute all, unmute only active
        this.videoElRefs?.forEach((ref, i) => {
            ref.nativeElement.muted = (i !== index);
        });
    }

    /* ═══════════════════════════════════════════
       AUTO SCROLL — cinematic infinite drift
       ═══════════════════════════════════════════ */

    private startAutoScroll(): void {
        this.zone.runOutsideAngular(() => {
            const scroll = () => {
                this.autoScrollRaf = requestAnimationFrame(scroll);
                if (this.autoScrollPaused) return;

                const track = this.scrollTrackRef?.nativeElement;
                if (!track) return;

                // Drift 0.5px per frame (~30px/s)
                track.scrollLeft += 0.5;

                // Infinite loop: when past midpoint, reset silently
                const midpoint = track.scrollWidth / 2;
                if (track.scrollLeft >= midpoint) {
                    track.scrollLeft -= midpoint;
                }
            };
            this.autoScrollRaf = requestAnimationFrame(scroll);
        });
    }

    private stopAutoScroll(): void {
        if (this.autoScrollRaf !== null) {
            cancelAnimationFrame(this.autoScrollRaf);
            this.autoScrollRaf = null;
        }
    }

    private pauseAutoScrollWithDebounce(): void {
        this.autoScrollPaused = true;
        if (this.autoScrollResumeTimer) {
            clearTimeout(this.autoScrollResumeTimer);
            this.autoScrollResumeTimer = null;
        }
    }

    private scheduleAutoScrollResume(): void {
        if (this.autoScrollResumeTimer) {
            clearTimeout(this.autoScrollResumeTimer);
        }
        this.autoScrollResumeTimer = setTimeout(() => {
            // Only resume if nothing is blocking
            if (!this.hoveringCard && !this.isDragging && this.audioLockedIndex === null) {
                this.autoScrollPaused = false;
            }
        }, 2000);
    }

    /* ═══════════════════════════════════════════
       HORIZONTAL WHEEL
       ═══════════════════════════════════════════ */

    private setupWheelListener(): void {
        const track = this.scrollTrackRef?.nativeElement;
        if (!track) return;

        // Do NOT preventDefault — let page scroll work normally
        // Only add horizontal scroll as a bonus when using trackpad horizontal gestures
        track.addEventListener(
            'wheel',
            (e: WheelEvent) => {
                // Only intercept true horizontal scroll (e.g. trackpad swipe)
                if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 5) {
                    track.scrollLeft += e.deltaX;
                }
            },
            { passive: true }
        );
    }

    /* ═══════════════════════════════════════════
       DRAG / TOUCH
       ═══════════════════════════════════════════ */

    onDragStart(e: MouseEvent | TouchEvent): void {
        this.isDragging = true;
        this.pauseAutoScrollWithDebounce();
        const track = this.scrollTrackRef.nativeElement;
        track.style.scrollSnapType = 'none';
        track.style.cursor = 'grabbing';

        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        this.dragStartX = clientX;
        this.dragScrollLeft = track.scrollLeft;
    }

    onDragMove(e: MouseEvent | TouchEvent): void {
        if (!this.isDragging) return;
        e.preventDefault();

        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const walk = (this.dragStartX - clientX) * 1.5;
        this.scrollTrackRef.nativeElement.scrollLeft = this.dragScrollLeft + walk;
    }

    onDragEnd(): void {
        if (!this.isDragging) return;
        this.isDragging = false;
        const track = this.scrollTrackRef.nativeElement;
        track.style.scrollSnapType = 'x mandatory';
        track.style.cursor = '';
        this.scheduleAutoScrollResume();
    }

    /* ═══════════════════════════════════════════
       ARROW NAVIGATION
       ═══════════════════════════════════════════ */

    scrollPrev(): void {
        const track = this.scrollTrackRef?.nativeElement;
        if (!track) return;
        track.scrollBy({ left: -260, behavior: 'smooth' });
    }

    scrollNext(): void {
        const track = this.scrollTrackRef?.nativeElement;
        if (!track) return;
        track.scrollBy({ left: 260, behavior: 'smooth' });
    }

    /* ═══════════════════════════════════════════
       FULLSCREEN MODAL
       ═══════════════════════════════════════════ */

    openModal(video: VideoCard): void {
        this.modalVideo = video;
        this.modalOpen = true;
        this.pauseAutoScrollWithDebounce();
        if (this.isBrowser) {
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(): void {
        this.modalOpen = false;
        this.modalVideo = null;
        this.scheduleAutoScrollResume();
        if (this.isBrowser) {
            document.body.style.overflow = '';
        }
    }

    @HostListener('document:keydown.escape')
    onEsc(): void {
        if (this.modalOpen) this.closeModal();
    }

    /* ═══════════════════════════════════════════
       ARROW VISIBILITY
       ═══════════════════════════════════════════ */

    onTrackEnter(): void {
        this.showArrows = true;
    }

    onTrackLeave(): void {
        this.showArrows = false;
    }

    /* ═══════════════════════════════════════════
       HELPERS
       ═══════════════════════════════════════════ */

    trackByIndex(index: number): number {
        return index;
    }
}
