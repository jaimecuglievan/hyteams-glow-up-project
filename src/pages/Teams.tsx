
import Layout from "@/components/layout/Layout";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Search, 
  Users, 
  User, 
  MoreHorizontal,
  Clock,
  CalendarIcon
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface TeamMember {
  id: string;
  name: string;
  initials: string;
  avatar?: string;
  role: string;
  status?: "active" | "busy" | "away" | "offline";
  selected?: boolean;
}

interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
}

const Teams = () => {
  // Sample team data
  const [teams, setTeams] = useState<Team[]>([
    {
      id: "1",
      name: "Madrid Front",
      description: "Frontend development team based in Madrid",
      members: [
        { id: "1", name: "Maria Rodriguez", role: "Team Lead", initials: "MR", avatar: "https://i.pravatar.cc/150?img=1", status: "active" },
        { id: "2", name: "Alex Sanchez", role: "Frontend Developer", initials: "AS", avatar: "https://i.pravatar.cc/150?img=2", status: "busy" },
        { id: "3", name: "Beth Lopez", role: "UI/UX Designer", initials: "BL", avatar: "https://i.pravatar.cc/150?img=3", status: "away" },
        { id: "4", name: "Ella Martinez", role: "QA Engineer", initials: "EM", avatar: "https://i.pravatar.cc/150?img=4", status: "offline" }
      ]
    },
    {
      id: "2",
      name: "Madrid Backend",
      description: "Backend development team based in Madrid",
      members: [
        { id: "5", name: "Marcus Diaz", role: "Backend Lead", initials: "MD", avatar: "https://i.pravatar.cc/150?img=5", status: "active" },
        { id: "6", name: "Anna Garcia", role: "Backend Developer", initials: "AG", avatar: "https://i.pravatar.cc/150?img=6", status: "busy" },
        { id: "7", name: "Mike Torres", role: "Database Engineer", initials: "MT", avatar: "https://i.pravatar.cc/150?img=7", status: "away" },
        { id: "8", name: "Alex Gomez", role: "DevOps Engineer", initials: "AG", avatar: "https://i.pravatar.cc/150?img=8", status: "active" }
      ]
    },
    {
      id: "3",
      name: "AI Workforce",
      description: "AI and machine learning specialists",
      members: [
        { id: "9", name: "Jake Ryan", role: "Data Scientist", initials: "JR", avatar: "https://i.pravatar.cc/150?img=9", status: "active" },
        { id: "10", name: "Sarah Chen", role: "ML Engineer", initials: "SC", avatar: "https://i.pravatar.cc/150?img=10", status: "busy" },
        { id: "11", name: "Tom Wilson", role: "AI Researcher", initials: "TW", avatar: "https://i.pravatar.cc/150?img=11", status: "away" }
      ]
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all-teams");
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.members.some(member => member.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const allMembers = teams.flatMap(team => team.members);
  const uniqueMembers = allMembers.filter((member, index, self) => 
    index === self.findIndex(m => m.id === member.id)
  );

  const getStatusColor = (status: string | undefined) => {
    switch(status) {
      case "active": return "bg-green-500";
      case "busy": return "bg-red-500";
      case "away": return "bg-yellow-500";
      default: return "bg-gray-400";
    }
  };

  const handleSelectTeam = (teamId: string) => {
    setSelectedTeamId(teamId === selectedTeamId ? null : teamId);
  };

  return (
    <Layout>
      <div className="animate-fade-in space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Teams</h1>
            <p className="text-gray-500 flex items-center">
              <Users className="inline-block w-4 h-4 mr-1" />
              <span>Manage your teams and members</span>
            </p>
          </div>
          <Button className="mt-4 md:mt-0 bg-hyteams-purple hover:bg-hyteams-purple/90">
            <Plus className="w-4 h-4 mr-2" />
            Create Team
          </Button>
        </div>

        <div className="flex w-full mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search teams or members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="all-teams">All Teams</TabsTrigger>
            <TabsTrigger value="my-teams">My Teams</TabsTrigger>
            <TabsTrigger value="members">All Members</TabsTrigger>
          </TabsList>

          <TabsContent value="all-teams" className="space-y-6">
            {filteredTeams.map(team => (
              <Card key={team.id} className={cn(
                "hover:border-hyteams-pink/50 transition-all cursor-pointer",
                selectedTeamId === team.id && "border-hyteams-pink"
              )}
              onClick={() => handleSelectTeam(team.id)}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-xl font-bold">{team.name}</CardTitle>
                    <p className="text-sm text-gray-500">{team.description}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        <span>View Team</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>Schedule Meeting</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500">
                        Leave Team
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {team.members.map(member => (
                      <div key={member.id} className="text-center group relative">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            {member.avatar ? (
                              <AvatarImage src={member.avatar} alt={member.name} />
                            ) : null}
                            <AvatarFallback className="bg-hyteams-lightpurple text-gray-700">
                              {member.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div 
                            className={cn(
                              "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white",
                              getStatusColor(member.status)
                            )} 
                          />
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity">
                          {member.name}
                          <div className="absolute w-2 h-2 bg-black transform rotate-45 left-1/2 -ml-1 -bottom-1"></div>
                        </div>
                      </div>
                    ))}
                    <Button size="icon" variant="outline" className="w-12 h-12 rounded-full">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="my-teams">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTeams.slice(0, 2).map(team => (
                <Card key={team.id} className="hover:border-hyteams-pink/50 transition-all">
                  <CardHeader>
                    <CardTitle>{team.name}</CardTitle>
                    <p className="text-sm text-gray-500">{team.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {team.members.slice(0, 5).map(member => (
                        <Avatar key={member.id} className="w-8 h-8">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.initials}</AvatarFallback>
                        </Avatar>
                      ))}
                      {team.members.length > 5 && (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                          +{team.members.length - 5}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="members">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {uniqueMembers
                .filter(member => member.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map(member => (
                <Card key={member.id} className="overflow-hidden">
                  <div className="p-4 flex flex-col items-center">
                    <div className="relative">
                      <Avatar className="w-20 h-20 mb-3">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="text-lg bg-hyteams-lightpurple">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div 
                        className={cn(
                          "absolute bottom-3 right-0 w-4 h-4 rounded-full border-2 border-white",
                          getStatusColor(member.status)
                        )} 
                      />
                    </div>
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.role}</p>
                    
                    <div className="flex mt-4 space-x-2">
                      <Button size="sm" variant="outline" className="rounded-full text-xs px-3">
                        <Clock className="h-3 w-3 mr-1" /> Schedule
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-full text-xs px-3">
                        <User className="h-3 w-3 mr-1" /> Profile
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Teams;
