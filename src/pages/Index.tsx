
import Layout from "@/components/layout/Layout";
import Calendar from "@/components/home/Calendar";
import TeamList from "@/components/home/TeamList";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="animate-fade-in">
        <section className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
              <p className="text-gray-500">
                <Clock className="inline-block w-4 h-4 mr-1" />
                <span>Monday, April 28, 2025</span>
              </p>
            </div>
            <div className="flex items-center mt-4 md:mt-0 space-x-3">
              <Button className="bg-hyteams-purple hover:bg-hyteams-purple/90">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Schedule Meeting
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
            <Calendar />
            <TeamList />
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Upcoming Meetings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="event-card">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-hyteams-pink font-medium">{i === 0 ? "Today" : i === 1 ? "Tomorrow" : "Next Week"}</p>
                    <h3 className="font-semibold text-lg">Team Planning {i+1}</h3>
                    <p className="text-gray-500 text-sm mt-1">
                      <Clock className="inline-block w-3 h-3 mr-1" />
                      <span>11:00 - 12:00</span>
                    </p>
                  </div>
                  <div className="flex -space-x-2">
                    <Avatar className="w-8 h-8 border-2 border-white">
                      <AvatarImage src={`https://i.pravatar.cc/150?img=${i+1}`} />
                      <AvatarFallback>U{i+1}</AvatarFallback>
                    </Avatar>
                    <Avatar className="w-8 h-8 border-2 border-white">
                      <AvatarImage src={`https://i.pravatar.cc/150?img=${i+2}`} />
                      <AvatarFallback>U{i+2}</AvatarFallback>
                    </Avatar>
                    {i > 0 && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">
                        +{i+1}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default Index;
