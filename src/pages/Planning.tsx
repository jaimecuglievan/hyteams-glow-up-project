
import Layout from "@/components/layout/Layout";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format, addDays, isSameDay, startOfMonth } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Users, Clock, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Planning = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const navigateMonth = (direction: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const timeSlots = [
    "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", 
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", 
    "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

  // Sample meeting data
  const meetings = [
    { 
      id: 1, 
      title: "Team Sync", 
      date: addDays(new Date(), 1), 
      startTime: "10:00", 
      endTime: "11:00",
      attendees: [
        { id: 1, name: "Maria", initials: "MA", avatar: "https://i.pravatar.cc/150?img=1" },
        { id: 2, name: "Alex", initials: "AL", avatar: "https://i.pravatar.cc/150?img=2" },
        { id: 3, name: "Beth", initials: "BE", avatar: "https://i.pravatar.cc/150?img=3" },
      ] 
    },
    { 
      id: 2, 
      title: "Product Review", 
      date: addDays(new Date(), 2), 
      startTime: "14:00", 
      endTime: "15:30",
      attendees: [
        { id: 4, name: "Ella", initials: "EL", avatar: "https://i.pravatar.cc/150?img=4" },
        { id: 5, name: "Marcus", initials: "MA", avatar: "https://i.pravatar.cc/150?img=5" },
      ] 
    },
    { 
      id: 3, 
      title: "Sprint Planning", 
      date: addDays(new Date(), 3), 
      startTime: "9:00", 
      endTime: "10:30",
      attendees: [
        { id: 1, name: "Maria", initials: "MA", avatar: "https://i.pravatar.cc/150?img=1" },
        { id: 2, name: "Alex", initials: "AL", avatar: "https://i.pravatar.cc/150?img=2" },
        { id: 5, name: "Marcus", initials: "MA", avatar: "https://i.pravatar.cc/150?img=5" },
        { id: 6, name: "Anna", initials: "AN", avatar: "https://i.pravatar.cc/150?img=6" },
      ] 
    },
  ];

  const getMeetingsForSelectedDate = () => {
    return meetings.filter(meeting => 
      isSameDay(meeting.date, selectedDate)
    );
  };

  const selectableTimeSlots = timeSlots.filter(
    time => !getMeetingsForSelectedDate().some(
      meeting => meeting.startTime <= time && meeting.endTime > time
    )
  );

  return (
    <Layout>
      <div className="animate-fade-in space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Planning Calendar</h1>
            <p className="text-gray-500 flex items-center">
              <CalendarIcon className="inline-block w-4 h-4 mr-1" />
              <span>{format(selectedDate, "EEEE, MMMM d, yyyy")}</span>
            </p>
          </div>
          <Button className="mt-4 md:mt-0 bg-hyteams-purple hover:bg-hyteams-purple/90">
            <Plus className="w-4 h-4 mr-2" />
            New Meeting
          </Button>
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
                classNames={{
                  day_selected: "bg-hyteams-pink text-white hover:bg-hyteams-pink hover:text-white",
                  day_today: "bg-hyteams-lightpurple text-gray-900",
                }}
              />

              <div className="mt-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Meetings on {format(selectedDate, "MMM d")}</h3>
                </div>
                
                {getMeetingsForSelectedDate().length > 0 ? (
                  <div className="space-y-3">
                    {getMeetingsForSelectedDate().map(meeting => (
                      <div key={meeting.id} className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">{meeting.title}</h4>
                            <p className="text-sm text-gray-500 flex items-center mt-1">
                              <Clock className="w-3 h-3 mr-1" />
                              {meeting.startTime} - {meeting.endTime}
                            </p>
                          </div>
                          <div className="flex -space-x-2">
                            {meeting.attendees.slice(0, 3).map((attendee) => (
                              <Avatar key={attendee.id} className="w-8 h-8 border-2 border-white">
                                <AvatarImage src={attendee.avatar} alt={attendee.name} />
                                <AvatarFallback>{attendee.initials}</AvatarFallback>
                              </Avatar>
                            ))}
                            {meeting.attendees.length > 3 && (
                              <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">
                                +{meeting.attendees.length - 3}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-6 text-gray-500">No meetings scheduled for this day</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-bold">Book a Time Slot</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Selected date: {format(selectedDate, "EEEE, MMMM d")}</p>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {selectedTimeSlot || "Choose time"}
                      <Clock className="ml-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="center">
                    <div className="grid grid-cols-2 gap-1 p-2 max-h-[300px] overflow-y-auto">
                      {selectableTimeSlots.map((time) => (
                        <Button
                          key={time}
                          variant="ghost"
                          className={cn(
                            "rounded-md",
                            selectedTimeSlot === time && "bg-hyteams-pink text-white hover:bg-hyteams-pink hover:text-white"
                          )}
                          onClick={() => setSelectedTimeSlot(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-3">Add Participants</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Avatar className="w-10 h-10 cursor-pointer avatar-ring">
                    <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                    <AvatarFallback>MA</AvatarFallback>
                  </Avatar>
                  <Avatar className="w-10 h-10 cursor-pointer avatar-ring selected">
                    <AvatarImage src="https://i.pravatar.cc/150?img=2" />
                    <AvatarFallback>AL</AvatarFallback>
                  </Avatar>
                  <Avatar className="w-10 h-10 cursor-pointer avatar-ring">
                    <AvatarImage src="https://i.pravatar.cc/150?img=3" />
                    <AvatarFallback>BE</AvatarFallback>
                  </Avatar>
                  <Button size="icon" variant="outline" className="w-10 h-10 rounded-full">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button className="w-full mt-4 bg-hyteams-pink hover:bg-hyteams-pink/90">Schedule Meeting</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Planning;
