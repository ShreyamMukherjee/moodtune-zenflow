import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(42);
  const [volume, setVolume] = useState([75]);
  const [liked, setLiked] = useState(false);

  const currentTrack = {
    title: "Peaceful Morning",
    artist: "Ambient Soundscapes",
    album: "Mood Relaxation",
    duration: 180,
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center"
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="p-6 shadow-card bg-gradient-card border-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Now Playing</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLiked(!liked)}
              className={liked ? "text-red-500 hover:text-red-600" : "text-muted-foreground"}
            >
              <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="relative">
            <img 
              src={currentTrack.coverUrl} 
              alt="Album cover"
              className="w-20 h-20 rounded-lg shadow-soft object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
          </div>
          
          <div className="flex-1 space-y-1">
            <h4 className="font-semibold text-foreground truncate">{currentTrack.title}</h4>
            <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
            <p className="text-xs text-muted-foreground truncate">{currentTrack.album}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Slider
            value={[currentTime]}
            max={currentTrack.duration}
            step={1}
            className="w-full"
            onValueChange={(value) => setCurrentTime(value[0])}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(currentTrack.duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4">
          <Button variant="ghost" size="sm">
            <SkipBack className="w-5 h-5" />
          </Button>
          
          <Button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 rounded-full bg-gradient-primary shadow-glow hover:shadow-lg transition-all duration-300"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-0.5" />
            )}
          </Button>
          
          <Button variant="ghost" size="sm">
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-3 pt-2">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <Slider
            value={volume}
            max={100}
            step={1}
            className="flex-1"
            onValueChange={setVolume}
          />
          <span className="text-xs text-muted-foreground w-8 text-right">{volume[0]}%</span>
        </div>

        {/* Mood-based Recommendations */}
        <div className="pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground mb-2">Mood-based suggestions:</p>
          <div className="flex space-x-2">
            {["Calm Vibes", "Happy Beats", "Focus Flow"].map((playlist) => (
              <Button 
                key={playlist}
                variant="secondary" 
                size="sm" 
                className="text-xs px-3 py-1 h-auto"
              >
                {playlist}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MusicPlayer;