
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/types";
import { CalendarDays, Mail, User as UserIcon } from "lucide-react";

interface UserProfileProps {
  user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
          <div className="flex-shrink-0">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <UserIcon className="w-12 h-12 text-primary" />
              </div>
            )}
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 text-lg font-medium">
              <UserIcon className="w-5 h-5 text-primary" />
              <span>{user.name}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-5 h-5 text-primary/70" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarDays className="w-5 h-5 text-primary/70" />
              <span>Member since {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
