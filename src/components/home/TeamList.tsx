
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface TeamMember {
  id: string;
  name: string;
  initials: string;
  avatar?: string;
  selected?: boolean;
}

interface Team {
  id: string;
  name: string;
  members: TeamMember[];
}

export default function TeamList() {
  // Sample data
  const [teams] = useState<Team[]>([
    {
      id: "1",
      name: "Madrid Front",
      members: [
        { id: "1", name: "Maria", initials: "MA", avatar: "https://i.pravatar.cc/150?img=1" },
        { id: "2", name: "Alex", initials: "AL", avatar: "https://i.pravatar.cc/150?img=2" },
        { id: "3", name: "Beth", initials: "BE", avatar: "https://i.pravatar.cc/150?img=3" },
        { id: "4", name: "Ella", initials: "EL", avatar: "https://i.pravatar.cc/150?img=4" }
      ]
    },
    {
      id: "2",
      name: "Madrid",
      members: [
        { id: "5", name: "Marcus", initials: "MA", avatar: "https://i.pravatar.cc/150?img=5" },
        { id: "6", name: "Anna", initials: "AN", avatar: "https://i.pravatar.cc/150?img=6" },
        { id: "7", name: "Mike", initials: "MI", avatar: "https://i.pravatar.cc/150?img=7" },
        { id: "8", name: "Alex", initials: "AL", avatar: "https://i.pravatar.cc/150?img=8" }
      ]
    },
    {
      id: "3",
      name: "AI Workforce",
      members: [
        { id: "9", name: "Jake", initials: "JA", avatar: "https://i.pravatar.cc/150?img=9" },
        { id: "10", name: "Sarah", initials: "SA", avatar: "https://i.pravatar.cc/150?img=10" },
        { id: "11", name: "Tom", initials: "TO", avatar: "https://i.pravatar.cc/150?img=11" }
      ]
    }
  ]);
  
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  
  const toggleMemberSelection = (memberId: string) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter(id => id !== memberId));
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Teams</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="teams">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="colleagues">Colleagues</TabsTrigger>
          </TabsList>
          <TabsContent value="teams" className="space-y-6">
            {teams.map(team => (
              <div key={team.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">{team.name}</h3>
                  <button className="text-sm text-hyteams-blue hover:underline">Details</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {team.members.map(member => (
                    <div key={member.id} className="text-center">
                      <Avatar 
                        className={cn(
                          "w-12 h-12 cursor-pointer avatar-ring", 
                          selectedMembers.includes(member.id) && "selected"
                        )}
                        onClick={() => toggleMemberSelection(member.id)}
                      >
                        {member.avatar ? (
                          <AvatarImage src={member.avatar} />
                        ) : null}
                        <AvatarFallback className="bg-hyteams-lightpurple text-gray-700">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="favorites">
            <div className="flex flex-wrap gap-3 py-2">
              {teams[0].members.map(member => (
                <Avatar key={member.id} className="w-12 h-12 avatar-ring">
                  {member.avatar ? (
                    <AvatarImage src={member.avatar} />
                  ) : null}
                  <AvatarFallback className="bg-hyteams-lightpurple text-gray-700">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="colleagues">
            <div className="flex flex-wrap gap-3 py-2">
              {teams[1].members.map(member => (
                <Avatar key={member.id} className="w-12 h-12 avatar-ring">
                  {member.avatar ? (
                    <AvatarImage src={member.avatar} />
                  ) : null}
                  <AvatarFallback className="bg-hyteams-lightpurple text-gray-700">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
