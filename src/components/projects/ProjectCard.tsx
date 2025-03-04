import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowRight, Users, Activity, Lock } from "lucide-react";
import { Progress } from "../ui/progress";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  id?: string;
  name?: string;
  description?: string;
  userCount?: number;
  activeUsers?: number;
  totalUsers?: number;
  lastActivity?: string;
  status?: "active" | "inactive" | "maintenance";
}

const ProjectCard = ({
  id = "proj-123",
  name = "Authentication Project",
  description = "Main authentication service for web and mobile applications",
  userCount = 1250,
  activeUsers = 850,
  totalUsers = 1500,
  lastActivity = "2 hours ago",
  status = "active",
}: ProjectCardProps) => {
  const navigate = useNavigate();

  const statusColors = {
    active: "bg-green-100 text-green-800 hover:bg-green-200",
    inactive: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    maintenance: "bg-amber-100 text-amber-800 hover:bg-amber-200",
  };

  const userPercentage = Math.round((activeUsers / totalUsers) * 100);

  const handleNavigateToProject = () => {
    navigate(`/dashboard/project/${id}`);
  };

  return (
    <Card className="w-[350px] h-[220px] bg-card dark:bg-gray-800 border border-border dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg text-foreground dark:text-white">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground dark:text-gray-400 line-clamp-1">
              {description}
            </p>
          </div>
          <Badge className={statusColors[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground dark:text-gray-200">
              {userCount.toLocaleString()} users
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground dark:text-gray-400">
                Active users
              </span>
              <span className="font-medium text-foreground dark:text-white">
                {userPercentage}%
              </span>
            </div>
            <Progress value={userPercentage} className="h-1.5" />
          </div>

          <div className="flex items-center gap-2">
            <Activity size={16} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground dark:text-gray-400">
              Last activity: {lastActivity}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-between border-border dark:border-gray-700 hover:bg-secondary/50 dark:hover:bg-gray-700/50"
          onClick={handleNavigateToProject}
        >
          <span className="flex items-center gap-1">
            <Lock size={14} />
            Manage project
          </span>
          <ArrowRight size={14} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
