
import { Building, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type WorkMode = "office" | "remote" | "traveling" | "vacation";

interface WorkModeSelectorProps {
  selected: WorkMode;
  onSelect: (mode: WorkMode) => void;
}

export function WorkModeSelector({ selected, onSelect }: WorkModeSelectorProps) {
  const modes = [
    { id: "office", label: "In Office", icon: Building },
    { id: "remote", label: "Remote", icon: User },
    { id: "traveling", label: "On the Go", icon: Calendar },
    { id: "vacation", label: "Vacation", icon: Calendar },
  ] as const;

  return (
    <div className="flex flex-wrap gap-3">
      {modes.map((mode) => {
        const Icon = mode.icon;
        return (
          <Button
            key={mode.id}
            variant={selected === mode.id ? "default" : "outline"}
            className={cn(
              "h-20 flex-col gap-2 flex-1",
              selected === mode.id && "bg-hyteams-pink hover:bg-hyteams-pink/90"
            )}
            onClick={() => onSelect(mode.id)}
          >
            <Icon className="w-6 h-6" />
            <span>{mode.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
