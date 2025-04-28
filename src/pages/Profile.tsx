
import Layout from "@/components/layout/Layout";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  User,
  Mail,
  Phone,
  Lock,
  Bell,
  Calendar as CalendarIcon,
  Clock,
  Map,
  Building2,
  Languages,
  Settings,
  Edit
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

const Profile = () => {
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://github.com/shadcn.png",
    position: "Senior Product Manager",
    department: "Product Management",
    location: "Madrid, Spain",
    timezone: "Central European Time (CET)",
    languages: ["English", "Spanish"],
    bio: "Product enthusiast passionate about building amazing user experiences. Leading product initiatives and driving cross-functional collaboration.",
    joinDate: new Date(2021, 3, 15) // April 15, 2021
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    meetingReminders: true,
    teamUpdates: false,
    darkMode: false,
    availability: "busy",
    workingHours: {
      start: "09:00",
      end: "17:00"
    },
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    calendarIntegration: "Google Calendar"
  });

  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Layout>
      <div className="animate-fade-in space-y-6">
        <div className="flex items-start justify-between">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <Button 
            variant="outline" 
            onClick={() => setIsEditMode(!isEditMode)}
            className="flex items-center gap-2"
          >
            {isEditMode ? "Save Changes" : (
              <>
                <Edit className="h-4 w-4" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={userProfile.avatar} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  {isEditMode && (
                    <div className="absolute bottom-0 right-0 bg-hyteams-pink rounded-full p-1 cursor-pointer hover:bg-hyteams-pink/90 transition-colors">
                      <Edit className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                
                <h2 className="text-xl font-bold">{userProfile.name}</h2>
                <p className="text-gray-500">{userProfile.position}</p>
                
                <div className="w-full mt-6 space-y-4">
                  <div className="flex items-center space-x-3 text-gray-600 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{userProfile.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{userProfile.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600 text-sm">
                    <Building2 className="h-4 w-4 text-gray-400" />
                    <span>{userProfile.department}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600 text-sm">
                    <Map className="h-4 w-4 text-gray-400" />
                    <span>{userProfile.location}</span>
                  </div>
                </div>
                
                <div className="w-full mt-6 pt-6 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Member Since</span>
                    <span className="text-sm text-gray-600">{format(userProfile.joinDate, "MMM dd, yyyy")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Teams</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Madrid Front</p>
                      <p className="text-xs text-gray-500">4 members</p>
                    </div>
                    <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      Lead
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">AI Workforce</p>
                      <p className="text-xs text-gray-500">3 members</p>
                    </div>
                    <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      Member
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    View All Teams
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Tabs defaultValue="info">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="info">Personal Info</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditMode ? (
                      <textarea
                        className="w-full h-32 p-3 border border-gray-300 rounded-md"
                        value={userProfile.bio}
                        onChange={(e) => setUserProfile({...userProfile, bio: e.target.value})}
                      />
                    ) : (
                      <p className="text-gray-600">{userProfile.bio}</p>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={userProfile.name}
                            readOnly={!isEditMode}
                            onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                            className={!isEditMode ? "bg-gray-50" : ""}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={userProfile.email}
                            readOnly={!isEditMode}
                            onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                            className={!isEditMode ? "bg-gray-50" : ""}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={userProfile.phone}
                            readOnly={!isEditMode}
                            onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                            className={!isEditMode ? "bg-gray-50" : ""}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={userProfile.location}
                            readOnly={!isEditMode}
                            onChange={(e) => setUserProfile({...userProfile, location: e.target.value})}
                            className={!isEditMode ? "bg-gray-50" : ""}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Work Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="position">Position</Label>
                          <Input
                            id="position"
                            value={userProfile.position}
                            readOnly={!isEditMode}
                            onChange={(e) => setUserProfile({...userProfile, position: e.target.value})}
                            className={!isEditMode ? "bg-gray-50" : ""}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Input
                            id="department"
                            value={userProfile.department}
                            readOnly={!isEditMode}
                            onChange={(e) => setUserProfile({...userProfile, department: e.target.value})}
                            className={!isEditMode ? "bg-gray-50" : ""}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="timezone">Timezone</Label>
                          {isEditMode ? (
                            <Select 
                              value={userProfile.timezone} 
                              onValueChange={(value) => setUserProfile({...userProfile, timezone: value})}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select timezone" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Eastern Standard Time (EST)">Eastern Standard Time (EST)</SelectItem>
                                <SelectItem value="Central European Time (CET)">Central European Time (CET)</SelectItem>
                                <SelectItem value="Pacific Standard Time (PST)">Pacific Standard Time (PST)</SelectItem>
                                <SelectItem value="Japan Standard Time (JST)">Japan Standard Time (JST)</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input
                              id="timezone"
                              value={userProfile.timezone}
                              readOnly
                              className="bg-gray-50"
                            />
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="languages">Languages</Label>
                          <Input
                            id="languages"
                            value={userProfile.languages.join(", ")}
                            readOnly={!isEditMode}
                            onChange={(e) => setUserProfile({...userProfile, languages: e.target.value.split(", ")})}
                            className={!isEditMode ? "bg-gray-50" : ""}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="preferences" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-gray-500">Receive emails about your account activity</p>
                        </div>
                        <Switch 
                          checked={preferences.emailNotifications} 
                          onCheckedChange={(checked) => setPreferences({...preferences, emailNotifications: checked})}
                          disabled={!isEditMode}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Meeting Reminders</Label>
                          <p className="text-sm text-gray-500">Get notified before scheduled meetings</p>
                        </div>
                        <Switch 
                          checked={preferences.meetingReminders} 
                          onCheckedChange={(checked) => setPreferences({...preferences, meetingReminders: checked})}
                          disabled={!isEditMode}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Team Updates</Label>
                          <p className="text-sm text-gray-500">Receive notifications about team activities</p>
                        </div>
                        <Switch 
                          checked={preferences.teamUpdates} 
                          onCheckedChange={(checked) => setPreferences({...preferences, teamUpdates: checked})}
                          disabled={!isEditMode}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Availability Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="status">Default Status</Label>
                        <Select 
                          disabled={!isEditMode}
                          value={preferences.availability} 
                          onValueChange={(value) => setPreferences({...preferences, availability: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="busy">Busy</SelectItem>
                            <SelectItem value="away">Away</SelectItem>
                            <SelectItem value="do-not-disturb">Do Not Disturb</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Working Hours</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="start-time" className="text-xs text-gray-500">Start Time</Label>
                            <Input
                              id="start-time"
                              type="time"
                              value={preferences.workingHours.start}
                              onChange={(e) => setPreferences({
                                ...preferences, 
                                workingHours: {
                                  ...preferences.workingHours,
                                  start: e.target.value
                                }
                              })}
                              disabled={!isEditMode}
                              className={!isEditMode ? "bg-gray-50" : ""}
                            />
                          </div>
                          <div>
                            <Label htmlFor="end-time" className="text-xs text-gray-500">End Time</Label>
                            <Input
                              id="end-time"
                              type="time"
                              value={preferences.workingHours.end}
                              onChange={(e) => setPreferences({
                                ...preferences, 
                                workingHours: {
                                  ...preferences.workingHours,
                                  end: e.target.value
                                }
                              })}
                              disabled={!isEditMode}
                              className={!isEditMode ? "bg-gray-50" : ""}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Calendar Integration</Label>
                        <Select 
                          disabled={!isEditMode}
                          value={preferences.calendarIntegration} 
                          onValueChange={(value) => setPreferences({...preferences, calendarIntegration: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select calendar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Google Calendar">Google Calendar</SelectItem>
                            <SelectItem value="Microsoft Outlook">Microsoft Outlook</SelectItem>
                            <SelectItem value="Apple Calendar">Apple Calendar</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" disabled={!isEditMode} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" disabled={!isEditMode} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" disabled={!isEditMode} />
                      </div>
                      <Button disabled={!isEditMode} className="bg-hyteams-purple hover:bg-hyteams-purple/90">
                        Update Password
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Enable 2FA</Label>
                          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                        <Switch disabled={!isEditMode} />
                      </div>
                      <Button disabled={!isEditMode} variant="outline" className="w-full">
                        <Lock className="h-4 w-4 mr-2" />
                        Setup 2FA
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">Current Session</p>
                          <p className="text-xs text-gray-500">Madrid, Spain • Chrome on Windows</p>
                        </div>
                        <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          Active Now
                        </div>
                      </div>
                      <Button variant="outline" className="w-full text-red-500 hover:text-red-600">
                        Sign Out of All Sessions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
