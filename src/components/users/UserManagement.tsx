import React, { useState } from "react";
import UserFilters from "./UserFilters";
import UserTable from "./UserTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  UserPlus,
  Users,
  Filter,
  RefreshCw,
  Download,
  Upload,
  Trash2,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  status: "active" | "pending" | "blocked";
  role: "user" | "admin";
  lastLogin: string;
  createdAt: string;
}

interface UserManagementProps {
  projectId?: string;
  projectName?: string;
  users?: User[];
}

const UserManagement = ({
  projectId = "project-123",
  projectName = "Authentication Project",
  users: initialUsers = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      status: "active",
      role: "user",
      lastLogin: "2023-06-15T10:30:00Z",
      createdAt: "2023-01-10T08:15:00Z",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      status: "active",
      role: "admin",
      lastLogin: "2023-06-14T14:45:00Z",
      createdAt: "2023-02-05T11:20:00Z",
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert.j@example.com",
      status: "pending",
      role: "user",
      lastLogin: "",
      createdAt: "2023-06-10T09:00:00Z",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      status: "blocked",
      role: "user",
      lastLogin: "2023-05-20T16:30:00Z",
      createdAt: "2023-03-15T13:45:00Z",
    },
    {
      id: "5",
      name: "Michael Wilson",
      email: "michael.w@example.com",
      status: "active",
      role: "user",
      lastLogin: "2023-06-13T11:15:00Z",
      createdAt: "2023-04-02T10:30:00Z",
    },
  ],
}: UserManagementProps) => {
  const [filteredUsers, setFilteredUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [bulkActionDialogOpen, setBulkActionDialogOpen] = useState(false);

  // New user form state
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    status: "active",
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterUsers(query, statusFilter);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    filterUsers(searchQuery, status);
  };

  const filterUsers = (query: string, status: string | null) => {
    let result = [...initialUsers];

    if (query) {
      const lowercaseQuery = query.toLowerCase();
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(lowercaseQuery) ||
          user.email.toLowerCase().includes(lowercaseQuery) ||
          user.id.toLowerCase().includes(lowercaseQuery),
      );
    }

    if (status) {
      result = result.filter((user) => user.status === status);
    }

    setFilteredUsers(result);
  };

  const handleAddUser = () => {
    setAddUserDialogOpen(true);
  };

  const handleEditUser = (userId: string) => {
    const user = initialUsers.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
      setEditUserDialogOpen(true);
    }
  };

  const handleDeleteUser = (userId: string) => {
    // In a real app, this would call an API to delete the user
    const updatedUsers = initialUsers.filter((user) => user.id !== userId);
    setFilteredUsers(updatedUsers);
  };

  const handleChangeRole = (userId: string, role: "user" | "admin") => {
    // In a real app, this would call an API to update the user's role
    const updatedUsers = initialUsers.map((user) =>
      user.id === userId ? { ...user, role } : user,
    );
    setFilteredUsers(updatedUsers);
  };

  const handleChangeStatus = (
    userId: string,
    status: "active" | "pending" | "blocked",
  ) => {
    // In a real app, this would call an API to update the user's status
    const updatedUsers = initialUsers.map((user) =>
      user.id === userId ? { ...user, status } : user,
    );
    setFilteredUsers(updatedUsers);
  };

  const handleRefresh = () => {
    // In a real app, this would fetch fresh data from the API
    setFilteredUsers(initialUsers);
    setSearchQuery("");
    setStatusFilter(null);
  };

  const handleSubmitNewUser = () => {
    // In a real app, this would call an API to create the user
    const newUserId = `user-${Date.now()}`;
    const createdUser: User = {
      id: newUserId,
      name: newUser.name,
      email: newUser.email,
      status: newUser.status as "active" | "pending" | "blocked",
      role: newUser.role as "user" | "admin",
      lastLogin: "",
      createdAt: new Date().toISOString(),
    };

    setFilteredUsers([...filteredUsers, createdUser]);
    setAddUserDialogOpen(false);
    setNewUser({
      name: "",
      email: "",
      password: "",
      role: "user",
      status: "active",
    });
  };

  const handleUpdateUser = () => {
    if (!currentUser) return;

    // In a real app, this would call an API to update the user
    const updatedUsers = initialUsers.map((user) =>
      user.id === currentUser.id ? currentUser : user,
    );

    setFilteredUsers(updatedUsers);
    setEditUserDialogOpen(false);
    setCurrentUser(null);
  };

  return (
    <div className="w-full h-full bg-background dark:bg-gray-900 p-6 space-y-6">
      <div className="flex flex-col space-y-1.5">
        <h2 className="text-2xl font-bold tracking-tight text-foreground dark:text-white">
          User Management
        </h2>
        <p className="text-muted-foreground dark:text-gray-400">
          Manage users for {projectName}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Users size={16} />
              All Users
            </TabsTrigger>
            <TabsTrigger value="active" className="flex items-center gap-2">
              Active
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              Pending
            </TabsTrigger>
            <TabsTrigger value="blocked" className="flex items-center gap-2">
              Blocked
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setBulkActionDialogOpen(true)}
          >
            <Filter size={16} className="mr-2" />
            Bulk Actions
          </Button>
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload size={16} className="mr-2" />
            Import
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Users</CardTitle>
          <CardDescription>
            View and manage all users in your project.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 space-y-4">
          <UserFilters
            onSearch={handleSearch}
            onStatusChange={handleStatusChange}
            onAddUser={handleAddUser}
            onRefresh={handleRefresh}
          />

          <UserTable
            users={filteredUsers}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onChangeRole={handleChangeRole}
            onChangeStatus={handleChangeStatus}
          />
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={addUserDialogOpen} onOpenChange={setAddUserDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account for your project.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value) =>
                    setNewUser({ ...newUser, role: value })
                  }
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newUser.status}
                  onValueChange={(value) =>
                    setNewUser({ ...newUser, status: value })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAddUserDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmitNewUser}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editUserDialogOpen} onOpenChange={setEditUserDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and settings.
            </DialogDescription>
          </DialogHeader>
          {currentUser && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  value={currentUser.name}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={currentUser.email}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, email: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-role">Role</Label>
                  <Select
                    value={currentUser.role}
                    onValueChange={(value) =>
                      setCurrentUser({
                        ...currentUser,
                        role: value as "user" | "admin",
                      })
                    }
                  >
                    <SelectTrigger id="edit-role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={currentUser.status}
                    onValueChange={(value) =>
                      setCurrentUser({
                        ...currentUser,
                        status: value as "active" | "pending" | "blocked",
                      })
                    }
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditUserDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateUser}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Actions Dialog */}
      <Dialog
        open={bulkActionDialogOpen}
        onOpenChange={setBulkActionDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk Actions</DialogTitle>
            <DialogDescription>
              Apply actions to multiple users at once.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Action</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="activate">Activate Users</SelectItem>
                  <SelectItem value="deactivate">Deactivate Users</SelectItem>
                  <SelectItem value="delete">Delete Users</SelectItem>
                  <SelectItem value="change-role">Change Role</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Apply to</Label>
              <Select defaultValue="selected">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="selected">Selected Users</SelectItem>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="filtered">Filtered Users</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setBulkActionDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Apply Action
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
