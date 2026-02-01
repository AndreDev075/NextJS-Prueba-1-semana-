// Helper function to extract video ID from YouTube URL
export function getYouTubeVideoId(url: string | null): string | null {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]+)/);
    return match ? match[1] : null;
}

// Helper function to get YouTube thumbnail URL
export function getYouTubeThumbnail(videoUrl: string | null): string | null {
    const videoId = getYouTubeVideoId(videoUrl);
    if (!videoId) return null;
    // Use maxresdefault for highest quality, fallback to hqdefault if not available
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}
