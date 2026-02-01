"use client"

import { useState, useEffect, useRef } from "react"
import { updateProgress } from "../../actions"
import { CheckCircle2, ChevronLeft } from "lucide-react"
import Link from "next/link"

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
        YT: any;
    }
}

export default function Player({
    courseId,
    videoUrl,
    initialTime = 0,
    isCompleted: initialCompleted = false
}: {
    courseId: string,
    videoUrl: string,
    initialTime?: number,
    isCompleted?: boolean
}) {
    console.log(`[Player] Initializing for course ${courseId} at ${initialTime}s (completed: ${initialCompleted})`)
    const [currentTime, setCurrentTime] = useState(initialTime)
    const [duration, setDuration] = useState(0)
    const [isCompleted, setIsCompleted] = useState(initialCompleted)
    const [showConfetti, setShowConfetti] = useState(false)
    const [maxSeen, setMaxSeen] = useState(initialTime) // State for reactive updates
    const playerRef = useRef<any>(null)
    const intervalRef = useRef<any>(null)
    const maxSeenRef = useRef(initialTime)
    const lastSavedTimeRef = useRef<number>(Math.floor(initialTime))

    // Extract video ID from URL
    const videoId = videoUrl?.split('v=')[1]?.split('&')[0] || videoUrl?.split('be/')[1]

    useEffect(() => {
        const initPlayer = () => {
            playerRef.current = new window.YT.Player('player', {
                height: '100%',
                width: '100%',
                videoId: videoId,
                playerVars: {
                    'rel': 0,
                    'modestbranding': 1,
                    'controls': 1 // We show controls but we will override seeking
                },
                events: {
                    'onReady': (event: any) => {
                        const videoDuration = event.target.getDuration()
                        console.log(`[Player] Video ready, duration: ${videoDuration}s`)
                        setDuration(videoDuration)
                        event.target.seekTo(initialTime, true)
                        maxSeenRef.current = initialTime
                        setMaxSeen(initialTime) // Also update state
                    },
                    'onStateChange': (event: any) => {
                        if (event.data === window.YT.PlayerState.PLAYING) {
                            startTracking()
                        } else {
                            stopTracking()
                        }
                    }
                }
            })
        }

        if (window.YT && window.YT.Player) {
            initPlayer()
        } else {
            // Load YouTube IFrame API
            const tag = document.createElement('script')
            tag.src = "https://www.youtube.com/iframe_api"
            const firstScriptTag = document.getElementsByTagName('script')[0]
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

            window.onYouTubeIframeAPIReady = initPlayer
        }

        return () => {
            stopTracking()
            // Save final progress on unmount
            if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
                const finalTime = playerRef.current.getCurrentTime()
                console.log(`[Player] Auto-saving final progress: ${Math.floor(finalTime)}s`)
                updateProgress(courseId, Math.floor(finalTime))
            }
        }
    }, [videoId])

    const startTracking = () => {
        stopTracking()
        intervalRef.current = setInterval(() => {
            if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
                const now = playerRef.current.getCurrentTime()

                // Prevent major forward jumps (>5 seconds), but allow normal playback
                if (now > maxSeenRef.current + 5) {
                    console.log(`[Player] Preventing forward seek from ${now}s to ${maxSeenRef.current}s`)
                    if (typeof playerRef.current.seekTo === 'function') {
                        playerRef.current.seekTo(maxSeenRef.current, true)
                    }
                } else {
                    // Update max seen if user is progressing normally
                    if (now > maxSeenRef.current) {
                        console.log(`[Player] Updating maxSeen from ${maxSeenRef.current}s to ${now}s`)
                        maxSeenRef.current = now
                        setMaxSeen(now) // Update state to trigger re-render
                    }

                    setCurrentTime(now)

                    const floorNow = Math.floor(now)
                    // Save every 5 seconds or when milestone reached
                    if (floorNow % 5 === 0 && floorNow !== lastSavedTimeRef.current) {
                        console.log(`[Player] Saving progress at ${floorNow}s`)
                        lastSavedTimeRef.current = floorNow
                        updateProgress(courseId, floorNow)
                    }
                }
            }
        }, 1000)
    }

    const stopTracking = () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
    }

    const percentage = duration > 0 ? Math.min(Math.ceil((maxSeen / duration) * 100), 100) : 0
    console.log(`[Player] Percentage calc: maxSeen=${maxSeen}, duration=${duration}, percentage=${percentage}`)
    const canComplete = percentage >= 90

    const handleComplete = async () => {
        await updateProgress(courseId, Math.floor(currentTime), true)
        setIsCompleted(true)
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 5000)
    }

    return (
        <div className="flex flex-col h-screen bg-[#0b0e14] text-[#c9d1d9] overflow-hidden">
            {/* Player Header */}
            <div className="bg-[#0d1117]/80 backdrop-blur-3xl border-b border-[#30363d] p-4 flex items-center justify-between z-50">
                <Link href={`/dashboard/courses/${courseId}/preview`} className="flex items-center gap-2 text-[#8b949e] hover:text-white transition">
                    <ChevronLeft className="h-5 w-5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Exit Player</span>
                </Link>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="h-2 w-48 bg-[#1c2128] rounded-full overflow-hidden border border-[#30363d]">
                            <div
                                className={`h-full transition-all duration-1000 ${isCompleted ? 'bg-green-500' : 'bg-yellow-500'}`}
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isCompleted ? 'text-green-500' : 'text-yellow-500'}`}>
                            {isCompleted ? '100% Complete' : `${percentage}% In Progress`}
                        </span>
                    </div>

                    {canComplete && !isCompleted && (
                        <button
                            onClick={handleComplete}
                            className="bg-green-600 text-white px-6 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-green-700 transition active:scale-95 shadow-xl shadow-green-500/20"
                        >
                            Finalizar Curso
                        </button>
                    )}

                    {isCompleted && (
                        <div className="flex items-center gap-2 text-green-500 font-black text-[10px] uppercase tracking-widest">
                            <CheckCircle2 className="h-4 w-4" />
                            Certificado Disponible
                        </div>
                    )}
                </div>
            </div>

            {/* Video Area */}
            <div className="flex-1 relative bg-black flex flex-col">
                <div className="flex-1 w-full relative">
                    <div id="player" className="absolute inset-0 w-full h-full pointer-events-auto" />
                </div>

                {showConfetti && (
                    <div className="absolute inset-0 flex items-center justify-center z-[60] bg-black/40 pointer-events-none animate-in fade-in zoom-in duration-500">
                        <div className="text-center space-y-4">
                            <div className="h-24 w-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(34,197,94,0.5)]">
                                <CheckCircle2 className="h-12 w-12 text-white" />
                            </div>
                            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">¡Felicidades!</h2>
                            <p className="text-[#8b949e] font-bold">Has completado el módulo con éxito.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
