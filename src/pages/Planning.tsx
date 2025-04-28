
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format, addDays, isSameDay } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { WorkModeSelector } from "@/components/planning/WorkModeSelector";
import { cn } from "@/lib/utils";

type WorkMode = "office" | "remote" | "traveling" | "vacation";

interface DayPlan {
  date: Date;
  mode: WorkMode;
}

const Planning = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedMode, setSelectedMode] = useState<WorkMode>("office");
  const [plans, setPlans] = useState<DayPlan[]>([]);

  const navigateMonth = (direction: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const handleSavePlan = () => {
    setPlans(prevPlans => {
      const existingPlanIndex = prevPlans.findIndex(plan => 
        isSameDay(plan.date, selectedDate)
      );

      if (existingPlanIndex >= 0) {
        const newPlans = [...prevPlans];
        newPlans[existingPlanIndex] = { date: selectedDate, mode: selectedMode };
        return newPlans;
      }

      return [...prevPlans, { date: selectedDate, mode: selectedMode }];
    });
  };

  const getDayPlan = (date: Date): WorkMode | undefined => {
    return plans.find(plan => isSameDay(plan.date, date))?.mode;
  };

  return (
    <Layout>
      <div className="animate-fade-in space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Work Mode Planning</h1>
            <p className="text-gray-500 flex items-center">
              <CalendarIcon className="inline-block w-4 h-4 mr-1" />
              <span>{format(selectedDate, "EEEE, MMMM d, yyyy")}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold">Calendar</CardTitle>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigateMonth(-1)}
                  className="rounded-full"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <span className="text-sm font-medium">
                  {format(currentMonth, "MMMM yyyy")}
                </span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigateMonth(1)}
                  className="rounded-full"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                className="rounded-md"
                modifiers={{
                  booked: (date) => !!getDayPlan(date),
                }}
                modifiersStyles={{
                  booked: { 
                    backgroundColor: "rgb(255, 49, 131, 0.1)",
                    borderRadius: "0.5rem",
                  },
                }}
                classNames={{
                  day_selected: "bg-hyteams-pink text-white hover:bg-hyteams-pink hover:text-white",
                  day_today: "bg-hyteams-lightpurple text-gray-900",
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-bold">Set Work Mode</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <WorkModeSelector 
                selected={selectedMode} 
                onSelect={setSelectedMode}
              />
              
              <div className="pt-4">
                <Button 
                  className="w-full bg-hyteams-pink hover:bg-hyteams-pink/90"
                  onClick={handleSavePlan}
                >
                  Save Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Planning;
