import { Heart, Frown, Flame, Waves, Zap, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

const moodConfig = {
  happy: { icon: Heart, color: "mood-happy", label: "Happy", description: "Feeling joyful and positive" },
  sad: { icon: Frown, color: "mood-sad", label: "Sad", description: "Feeling down or melancholic" },
  angry: { icon: Flame, color: "mood-angry", label: "Angry", description: "Feeling frustrated or irritated" },
  calm: { icon: Waves, color: "mood-calm", label: "Calm", description: "Feeling peaceful and relaxed" },
  excited: { icon: Zap, color: "mood-excited", label: "Excited", description: "Feeling energetic and enthusiastic" },
  neutral: { icon: Minus, color: "mood-neutral", label: "Neutral", description: "Feeling balanced and steady" },
};

type MoodType = keyof typeof moodConfig;

const MoodDisplay = () => {
  const [currentMood, setCurrentMood] = useState<MoodType>("neutral");
  const [confidence, setConfidence] = useState(0);

  // Simulate mood detection changes
  useEffect(() => {
    const moodCycle: MoodType[] = ["happy", "calm", "excited", "neutral", "sad"];
    let index = 0;
    
    const interval = setInterval(() => {
      setCurrentMood(moodCycle[index]);
      setConfidence(Math.floor(Math.random() * 30) + 70); // 70-100% confidence
      index = (index + 1) % moodCycle.length;
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const mood = moodConfig[currentMood];
  const IconComponent = mood.icon;

  return (
    <Card className="p-6 shadow-card bg-gradient-card border-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold text-foreground mb-6">Current Mood</h3>
        
        <div className="relative">
          <div 
            className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center shadow-glow animate-pulse-glow`}
            style={{ backgroundColor: `hsl(var(--${mood.color}) / 0.2)` }}
          >
            <IconComponent 
              className="w-12 h-12" 
              style={{ color: `hsl(var(--${mood.color}))` }}
            />
          </div>
          
          <Badge 
            className="absolute -top-2 -right-2 text-xs font-medium"
            style={{ 
              backgroundColor: `hsl(var(--${mood.color}))`,
              color: 'white'
            }}
          >
            {confidence}%
          </Badge>
        </div>

        <div className="space-y-2">
          <h4 
            className="text-2xl font-bold transition-colors duration-500"
            style={{ color: `hsl(var(--${mood.color}))` }}
          >
            {mood.label}
          </h4>
          <p className="text-sm text-muted-foreground">{mood.description}</p>
        </div>

        <div className="pt-4 border-t border-border/50">
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>Confidence</span>
            <span>{confidence}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 mt-2">
            <div 
              className="h-2 rounded-full transition-all duration-500 shadow-sm"
              style={{ 
                width: `${confidence}%`,
                backgroundColor: `hsl(var(--${mood.color}))`
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MoodDisplay;