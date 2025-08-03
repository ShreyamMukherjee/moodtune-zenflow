import { Camera, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

const WebcamPanel = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <Card className="p-6 shadow-card bg-gradient-card border-0 animate-fade-in-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Emotion Detection</h3>
        <Button 
          onClick={() => setIsActive(!isActive)}
          variant={isActive ? "default" : "secondary"}
          size="sm"
          className={isActive ? "bg-gradient-primary shadow-glow" : ""}
        >
          {isActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
          {isActive ? "Stop" : "Start"}
        </Button>
      </div>
      
      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden shadow-soft">
        {isActive ? (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center animate-pulse-glow">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Camera Active</p>
              <div className="flex space-x-1 justify-center">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <div className="text-center space-y-2">
              <Camera className="w-12 h-12 text-muted-foreground mx-auto" />
              <p className="text-sm text-muted-foreground">Click Start to begin emotion detection</p>
            </div>
          </div>
        )}
      </div>
      
      {isActive && (
        <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span>Analyzing facial expressions...</span>
        </div>
      )}
    </Card>
  );
};

export default WebcamPanel;