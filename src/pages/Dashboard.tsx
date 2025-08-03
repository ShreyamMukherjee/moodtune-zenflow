import WebcamPanel from "@/components/WebcamPanel";
import MoodDisplay from "@/components/MoodDisplay";
import MusicPlayer from "@/components/MusicPlayer";
import LightControls from "@/components/LightControls";
import { Brain, Home } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">MoodSync</h1>
                <p className="text-sm text-muted-foreground">Mood-Aware Music & Light System</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <Home className="w-4 h-4 text-secondary-foreground" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Webcam Panel */}
            <WebcamPanel />
            
            {/* Music Player */}
            <MusicPlayer />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Mood Display */}
            <MoodDisplay />
            
            {/* Light Controls */}
            <LightControls />
          </div>
        </div>

        {/* Stats Overview */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Sessions Today", value: "3", change: "+2" },
            { label: "Avg Mood Score", value: "8.2", change: "+0.5" },
            { label: "Music Tracks", value: "47", change: "+12" },
            { label: "Light Scenes", value: "6", change: "+1" },
          ].map((stat, index) => (
            <div 
              key={stat.label}
              className="bg-card/80 backdrop-blur-sm p-4 rounded-xl border border-border/50 shadow-soft animate-fade-in-up"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className="text-xs text-green-500 bg-green-50 px-2 py-1 rounded-full">
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;