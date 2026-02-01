"use client"

import { useEffect, useState } from "react"

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
        YT: any;
    }
}

function getYouTubeVideoId(url: string): string | null {
    const match = url?.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]+)/);
    return match ? match[1] : null;
}

function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
}

export default function ProgressDisplay({
    videoUrl,
    playbackTime
}: {
    videoUrl: string | null,
    playbackTime: number
}) {
    const [duration, setDuration] = useState<number>(0)
    const [percentage, setPercentage] = useState<number>(0)

    useEffect(() => {
        if (!videoUrl) return

        const videoId = getYouTubeVideoId(videoUrl)
        if (!videoId) return

        const loadYouTubeAPI = () => {
            // Create a hidden player just to get duration
            const tempDiv = document.createElement('div')
            tempDiv.style.display = 'none'
            tempDiv.id = 'temp-player-' + Date.now()
            document.body.appendChild(tempDiv)

            const player = new window.YT.Player(tempDiv.id, {
                videoId: videoId,
                events: {
                    'onReady': (event: any) => {
                        const videoDuration = event.target.getDuration()
                        setDuration(videoDuration)
                        const calc = videoDuration > 0 ? Math.min(Math.ceil((playbackTime / videoDuration) * 100), 100) : 0
                        setPercentage(calc)
                        // Cleanup
                        event.target.destroy()
                        tempDiv.remove()
                    }
                }
            })
        }

        if (window.YT && window.YT.Player) {
            loadYouTubeAPI()
        } else {
            // Load YouTube IFrame API
            const tag = document.createElement('script')
            tag.src = "https://www.youtube.com/iframe_api"
            const firstScriptTag = document.getElementsByTagName('script')[0]
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

            window.onYouTubeIframeAPIReady = loadYouTubeAPI
        }
    }, [videoUrl, playbackTime])

    return (
        <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 p-6 rounded-3xl space-y-3">
            <div className="flex items-center justify-between">
                <p className="font-black text-xs uppercase tracking-widest">In Progress</p>
                <p className="font-black text-xs uppercase tracking-widest">{percentage}%</p>
            </div>
            <div className="h-2 w-full bg-[#1c2128] rounded-full overflow-hidden border border-[#30363d]">
                <div
                    className="h-full bg-yellow-500 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <p className="text-sm font-bold text-yellow-500 text-center">
                {formatTime(playbackTime)} watched
            </p>
        </div>
    )
}
