
import Layout from "@/components/layout/Layout";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format, addDays, addHours, subDays } from "date-fns";
import { 
  BarChart4,
  Clock,
  ChevronLeft,
  ChevronRight,
  Users,
  Search,
  FileText,
  ArrowUpRight
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Meeting {
  id: number;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  team: string;
  attendees: {
    id: number;
    name: string;
    avatar?: string;
    initials: string;
  }[];
  notes?: string;
  completed: boolean;
  task?: {
    title: string;
    progress: number;
  };
}

const Agenda = () => {
  const now = new Date();
  
  // Sample meeting data
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: 1,
      title: "Sprint Planning",
      date: addDays(now, -1),
      startTime: "10:00",
      endTime: "11:00",
      team: "Madrid Front",
      attendees: [
        { id: 1, name: "Maria Rodriguez", initials: "MR", avatar: "https://i.pravatar.cc/150?img=1" },
        { id: 2, name: "Alex Sanchez", initials: "AS", avatar: "https://i.pravatar.cc/150?img=2" },
        { id: 3, name: "Beth Lopez", initials: "BL", avatar: "https://i.pravatar.cc/150?img=3" },
      ],
      notes: "Discussed upcoming sprint goals and task allocation.",
      completed: true,
      task: {
        title: "Update roadmap",
        progress: 100
      }
    },
    {
      id: 2,
      title: "Team Sync",
      date: now,
      startTime: "14:00",
      endTime: "14:30",
      team: "Madrid Backend",
      attendees: [
        { id: 5, name: "Marcus Diaz", initials: "MD", avatar: "https://i.pravatar.cc/150?img=5" },
        { id: 6, name: "Anna Garcia", initials: "AG", avatar: "https://i.pravatar.cc/150?img=6" },
        { id: 7, name: "Mike Torres", initials: "MT", avatar: "https://i.pravatar.cc/150?img=7" },
      ],
      notes: "Daily sync to discuss blockers and progress.",
      completed: false,
      task: {
        title: "Resolve API issues",
        progress: 60
      }
    },
    {
      id: 3,
      title: "Product Demo",
      date: addDays(now, 1),
      startTime: "11:00",
      endTime: "12:00",
      team: "AI Workforce",
      attendees: [
        { id: 9, name: "Jake Ryan", initials: "JR", avatar: "https://i.pravatar.cc/150?img=9" },
        { id: 10, name: "Sarah Chen", initials: "SC", avatar: "https://i.pravatar.cc/150?img=10" },
        { id: 1, name: "Maria Rodriguez", initials: "MR", avatar: "https://i.pravatar.cc/150?img=1" },
        { id: 2, name: "Alex Sanchez", initials: "AS", avatar: "https://i.pravatar.cc/150?img=2" },
      ],
      completed: false
    },
    {
      id: 4,
      title: "Architecture Review",
      date: addDays(now, 2),
      startTime: "15:00",
      endTime: "16:30",
      team: "Madrid Backend",
      attendees: [
        { id: 5, name: "Marcus Diaz", initials: "MD", avatar: "https://i.pravatar.cc/150?img=5" },
        { id: 7, name: "Mike Torres", initials: "MT", avatar: "https://i.pravatar.cc/150?img=7" },
        { id: 8, name: "Alex Gomez", initials: "AG", avatar: "https://i.pravatar.cc/150?img=8" },
      ],
      completed: false
    },
    {
      id: 5,
      title: "Design Review",
      date: subDays(now, 2),
      startTime: "13:00",
      endTime: "14:00",
      team: "Madrid Front",
      attendees: [
        { id: 1, name: "Maria Rodriguez", initials: "MR", avatar: "https://i.pravatar.cc/150?img=1" },
        { id: 3, name: "Beth Lopez", initials: "BL", avatar: "https://i.pravatar.cc/150?img=3" },
      ],
      notes: "Reviewed new UI designs and provided feedback.",
      completed: true,
      task: {
        title: "Implement design changes",
        progress: 80
      }
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState<"upcoming" | "past" | "all">("upcoming");

  // Filter and sort meetings
  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         meeting.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meeting.attendees.some(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const isPast = meeting.date < new Date(now.setHours(0,0,0,0)) || 
                  (meeting.date.getDate() === now.getDate() && 
                   meeting.startTime < format(now, "HH:mm"));
    
    if (viewType === "upcoming" && !isPast) return matchesSearch;
    if (viewType === "past" && isPast) return matchesSearch;
    if (viewType === "all") return matchesSearch;
    
    return false;
  }).sort((a, b) => {
    if (viewType === "past") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <Layout>
      <div className="animate-fade-in space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Agenda</h1>
            <p className="text-gray-500 flex items-center">
              <BarChart4 className="inline-block w-4 h-4 mr-1" />
              <span>Keep track of your meetings and tasks</span>
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search meetings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full"
              />
            </div>
            <Button className="bg-hyteams-purple hover:bg-hyteams-purple/90">
              View Calendar
            </Button>
          </div>
        </div>

        <div className="flex space-x-2 mb-4">
          <Button
            variant={viewType === "upcoming" ? "default" : "outline"}
            onClick={() => setViewType("upcoming")}
            className={viewType === "upcoming" ? "bg-hyteams-pink hover:bg-hyteams-pink/90" : ""}
          >
            Upcoming
          </Button>
          <Button
            variant={viewType === "past" ? "default" : "outline"}
            onClick={() => setViewType("past")}
            className={viewType === "past" ? "bg-hyteams-pink hover:bg-hyteams-pink/90" : ""}
          >
            Past
          </Button>
          <Button
            variant={viewType === "all" ? "default" : "outline"}
            onClick={() => setViewType("all")}
            className={viewType === "all" ? "bg-hyteams-pink hover:bg-hyteams-pink/90" : ""}
          >
            All
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Meeting</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Attendees</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMeetings.length > 0 ? (
                  filteredMeetings.map((meeting) => (
                    <TableRow key={meeting.id} className={cn(
                      meeting.completed ? "bg-gray-50" : ""
                    )}>
                      <TableCell className="font-medium">
                        <div>
                          <p className={cn(
                            meeting.completed ? "text-gray-500" : "text-gray-900"
                          )}>{meeting.title}</p>
                          {meeting.task && (
                            <div className="mt-1">
                              <div className="flex items-center text-xs text-gray-500 mb-1">
                                <FileText className="h-3 w-3 mr-1" />
                                {meeting.task.title}
                              </div>
                              <Progress value={meeting.task.progress} className="h-1.5 w-32" />
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className={cn(
                            "w-2 h-2 rounded-full mr-2",
                            meeting.date < now ? "bg-gray-400" :
                            meeting.date.getDate() === now.getDate() ? "bg-hyteams-pink" : 
                            "bg-hyteams-purple"
                          )}></div>
                          <div>
                            <p className="text-sm">{format(meeting.date, "MMM d, yyyy")}</p>
                            <p className="text-xs text-gray-500">{meeting.startTime} - {meeting.endTime}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="bg-hyteams-lightpurple/30 text-hyteams-purple px-2 py-1 rounded text-xs font-medium">
                          {meeting.team}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex -space-x-2">
                          {meeting.attendees.slice(0, 3).map((attendee) => (
                            <Avatar key={attendee.id} className="border-2 border-white w-8 h-8">
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
                      </TableCell>
                      <TableCell>
                        {meeting.completed ? (
                          <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                            Completed
                          </span>
                        ) : meeting.date < now ? (
                          <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700">
                            Missed
                          </span>
                        ) : meeting.date.getDate() === now.getDate() ? (
                          <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                            Today
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                            Upcoming
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-32 text-gray-500">
                      No meetings found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Today</CardTitle>
            </CardHeader>
            <CardContent>
              {meetings.filter(m => 
                m.date.getDate() === now.getDate() && 
                m.date.getMonth() === now.getMonth() &&
                !m.completed
              ).length > 0 ? (
                <div className="space-y-4">
                  {meetings
                    .filter(m => 
                      m.date.getDate() === now.getDate() && 
                      m.date.getMonth() === now.getMonth() &&
                      !m.completed
                    )
                    .map(meeting => (
                      <div key={meeting.id} className="flex justify-between items-center pb-3 border-b border-gray-100">
                        <div>
                          <p className="font-medium">{meeting.title}</p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{meeting.startTime}</span>
                          </div>
                        </div>
                        <div className="flex -space-x-2">
                          {meeting.attendees.slice(0, 2).map(attendee => (
                            <Avatar key={attendee.id} className="border-2 border-white w-7 h-7">
                              <AvatarImage src={attendee.avatar} alt={attendee.name} />
                              <AvatarFallback>{attendee.initials}</AvatarFallback>
                            </Avatar>
                          ))}
                          {meeting.attendees.length > 2 && (
                            <div className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">
                              +{meeting.attendees.length - 2}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                }
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-gray-500">
                  <p>No meetings scheduled for today</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming This Week</CardTitle>
            </CardHeader>
            <CardContent>
              {meetings.filter(m => 
                m.date > now && 
                m.date < addDays(now, 7) &&
                !(m.date.getDate() === now.getDate() && m.date.getMonth() === now.getMonth()) &&
                !m.completed
              ).length > 0 ? (
                <div className="space-y-4">
                  {meetings
                    .filter(m => 
                      m.date > now && 
                      m.date < addDays(now, 7) &&
                      !(m.date.getDate() === now.getDate() && m.date.getMonth() === now.getMonth()) &&
                      !m.completed
                    )
                    .slice(0, 3)
                    .map(meeting => (
                      <div key={meeting.id} className="flex justify-between items-center pb-3 border-b border-gray-100">
                        <div>
                          <p className="font-medium">{meeting.title}</p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{format(meeting.date, "EEE")}, {meeting.startTime}</span>
                          </div>
                        </div>
                        <span className="bg-hyteams-lightpurple/30 text-hyteams-purple px-2 py-1 rounded text-xs font-medium">
                          {meeting.team}
                        </span>
                      </div>
                    ))
                }
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-gray-500">
                  <p>No meetings scheduled for this week</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {meetings.filter(m => m.completed).length > 0 ? (
                <div className="space-y-4">
                  {meetings
                    .filter(m => m.completed)
                    .slice(0, 3)
                    .map(meeting => (
                      <div key={meeting.id} className="pb-3 border-b border-gray-100">
                        <div className="flex justify-between items-center">
                          <p className="font-medium">{meeting.title}</p>
                          <span className="text-xs text-gray-500">
                            {format(meeting.date, "MMM d")}
                          </span>
                        </div>
                        {meeting.notes && (
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{meeting.notes}</p>
                        )}
                      </div>
                    ))
                }
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-gray-500">
                  <p>No recent activity</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Agenda;
