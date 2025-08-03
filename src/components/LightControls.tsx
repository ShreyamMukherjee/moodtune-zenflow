import { Lightbulb, Sun, Snowflake, Palette, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const LightControls = () => {
  const [isOn, setIsOn] = useState(true);
  const [brightness, setBrightness] = useState([75]);
  const [activePreset, setActivePreset] = useState("warm");
  const [rgbValues, setRgbValues] = useState({
    red: [255],
    green: [180],
    blue: [100]
  });

  const presets = [
    { id: "warm", label: "Warm", icon: Sun, color: "from-orange-400 to-yellow-400" },
    { id: "cool", label: "Cool", icon: Snowflake, color: "from-blue-400 to-cyan-400" },
    { id: "rgb", label: "RGB", icon: Palette, color: "from-purple-400 via-pink-400 to-red-400" },
  ];

  const rgbColor = `rgb(${rgbValues.red[0]}, ${rgbValues.green[0]}, ${rgbValues.blue[0]})`;

  return (
    <Card className="p-6 shadow-card bg-gradient-card border-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Smart Lighting</h3>
          <div className="flex items-center space-x-3">
            <Power className={`w-4 h-4 ${isOn ? 'text-primary' : 'text-muted-foreground'}`} />
            <Switch 
              checked={isOn} 
              onCheckedChange={setIsOn}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>

        {/* Light Visualization */}
        <div className="relative">
          <div 
            className={`w-24 h-24 rounded-full mx-auto transition-all duration-500 ${
              isOn ? 'shadow-glow' : 'shadow-soft'
            }`}
            style={{
              backgroundColor: isOn ? (activePreset === 'rgb' ? rgbColor : 'hsl(var(--primary))') : 'hsl(var(--muted))',
              opacity: isOn ? brightness[0] / 100 : 0.3
            }}
          >
            <Lightbulb 
              className={`w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-500 ${
                isOn ? 'text-white' : 'text-muted-foreground'
              }`}
            />
          </div>
        </div>

        {/* Brightness Control */}
        {isOn && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Brightness</span>
              <span className="text-sm text-muted-foreground">{brightness[0]}%</span>
            </div>
            <Slider
              value={brightness}
              max={100}
              step={1}
              className="w-full"
              onValueChange={setBrightness}
            />
          </div>
        )}

        {/* Preset Controls */}
        {isOn && (
          <div className="space-y-3">
            <span className="text-sm font-medium text-foreground">Light Modes</span>
            <div className="grid grid-cols-3 gap-2">
              {presets.map((preset) => {
                const IconComponent = preset.icon;
                return (
                  <Button
                    key={preset.id}
                    variant={activePreset === preset.id ? "default" : "secondary"}
                    onClick={() => setActivePreset(preset.id)}
                    className={`flex flex-col items-center space-y-1 h-auto py-3 ${
                      activePreset === preset.id 
                        ? "bg-gradient-primary shadow-glow" 
                        : "hover:shadow-soft"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="text-xs">{preset.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        {/* RGB Controls */}
        {isOn && activePreset === 'rgb' && (
          <div className="space-y-4">
            <span className="text-sm font-medium text-foreground">Custom RGB</span>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-red-500">Red</span>
                <span className="text-sm text-muted-foreground">{rgbValues.red[0]}</span>
              </div>
              <Slider
                value={rgbValues.red}
                max={255}
                step={1}
                onValueChange={(value) => setRgbValues(prev => ({ ...prev, red: value }))}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-500">Green</span>
                <span className="text-sm text-muted-foreground">{rgbValues.green[0]}</span>
              </div>
              <Slider
                value={rgbValues.green}
                max={255}
                step={1}
                onValueChange={(value) => setRgbValues(prev => ({ ...prev, green: value }))}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-500">Blue</span>
                <span className="text-sm text-muted-foreground">{rgbValues.blue[0]}</span>
              </div>
              <Slider
                value={rgbValues.blue}
                max={255}
                step={1}
                onValueChange={(value) => setRgbValues(prev => ({ ...prev, blue: value }))}
                className="w-full"
              />
            </div>

            <div 
              className="w-full h-8 rounded-lg border border-border/50"
              style={{ backgroundColor: rgbColor }}
            />
          </div>
        )}

        {/* Quick Actions */}
        {isOn && (
          <div className="pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground mb-2">Quick Actions:</p>
            <div className="flex space-x-2">
              {["Party Mode", "Reading", "Sleep"].map((action) => (
                <Button 
                  key={action}
                  variant="secondary" 
                  size="sm" 
                  className="text-xs px-3 py-1 h-auto hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {action}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default LightControls;