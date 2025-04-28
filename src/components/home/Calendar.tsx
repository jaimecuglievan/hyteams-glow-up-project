
import { useState } from "react";
import { format, addDays, isSameDay } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentWeek, setCurrentWeek] = useState<Date[]>(
    Array(7).fill(null).map((_, i) => addDays(new Date(), i - 3))
  );

  const navigateWeek = (direction: number) => {
    setCurrentWeek(currentWeek.map(date => addDays(date, direction * 7)));
  };

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">My Schedule</CardTitle>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigateWeek(-1)}
            className="rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigateWeek(1)}
            className="rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          <Button size="sm" className="rounded-full bg-hyteams-pink hover:bg-hyteams-pink/90">
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {currentWeek.map((date, index) => (
            <div key={index} className="text-center">
              <p className="text-xs text-gray-500 mb-1">{dayNames[index]}</p>
              <button
                onClick={() => setSelectedDate(date)}
                className={cn(
                  "calendar-day",
                  isSameDay(date, selectedDate) && "selected"
                )}
              >
                {format(date, "d")}
              </button>
              <p className="text-xs mt-1">{format(date, "MMM")}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 space-y-1">
          {Array.from({ length: 10 }).map((_, i) => {
            const hour = 9 + i;
            const formattedHour = `${hour}:00`;
            
            // Demo data for visualization
            const hasEvent = i === 2;
            
            return (
              <div key={i} className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-2">
                <div className="text-sm text-gray-500 py-2">{formattedHour}</div>
                <div 
                  className={cn(
                    "schedule-timeslot rounded-lg transition-all",
                    hasEvent ? "bg-pink-50 border-pink-200" : "hover:bg-gray-50"
                  )}
                >
                  {hasEvent && (
                    <div className="flex items-center p-1">
                      <div className="w-2 h-full bg-hyteams-pink mr-2 rounded-full"></div>
                      <span className="text-sm font-medium">Team Sync Meeting</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
