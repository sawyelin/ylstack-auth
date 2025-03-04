import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  UserPlus,
  Shield,
  Key,
  Ban,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
  id: string;
  name: string;
  email: string;
  status: "active" | "pending" | "blocked";
  role: "user" | "admin";
  lastLogin: string;
  createdAt: string;
}

interface UserTableProps {
  users?: User[];
  onEdit?: (userId: string) => void;
  onDelete?: (userId: string) => void;
  onChangeRole?: (userId: string, role: "user" | "admin") => void;
  onChangeStatus?: (
    userId: string,
    status: "active" | "pending" | "blocked",
  ) => void;
}

const UserTable = ({
  users = [
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
  onEdit = () => {},
  onDelete = () => {},
  onChangeRole = () => {},
  onChangeStatus = () => {},
}: UserTableProps) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(users.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  const confirmDelete = (userId: string) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (userToDelete) {
      onDelete(userToDelete);
      setUserToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getStatusBadge = (status: "active" | "pending" | "blocked") => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-600 dark:bg-green-800 text-white">
            Active
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-600 dark:bg-yellow-800 text-white">
            Pending
          </Badge>
        );
      case "blocked":
        return (
          <Badge className="bg-red-600 dark:bg-red-800 text-white">
            Blocked
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full overflow-auto rounded-md border dark:border-gray-700">
      <Table>
        <TableHeader className="bg-muted/50 dark:bg-gray-800/50">
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={
                  selectedUsers.length === users.length && users.length > 0
                }
                onCheckedChange={(checked) => handleSelectAll(!!checked)}
              />
            </TableHead>
            <TableHead className="text-foreground dark:text-white">
              Name
            </TableHead>
            <TableHead className="text-foreground dark:text-white">
              Email
            </TableHead>
            <TableHead className="text-foreground dark:text-white">
              Status
            </TableHead>
            <TableHead className="text-foreground dark:text-white">
              Role
            </TableHead>
            <TableHead className="text-foreground dark:text-white">
              Last Login
            </TableHead>
            <TableHead className="text-foreground dark:text-white">
              Created
            </TableHead>
            <TableHead className="w-12 text-foreground dark:text-white">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="border-t dark:border-gray-700 hover:bg-muted/50 dark:hover:bg-gray-800/50"
            >
              <TableCell>
                <Checkbox
                  checked={selectedUsers.includes(user.id)}
                  onCheckedChange={(checked) =>
                    handleSelectUser(user.id, !!checked)
                  }
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                      alt={user.name}
                    />
                    <AvatarFallback>
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-foreground dark:text-white">
                    {user.name}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-foreground dark:text-gray-200">
                {user.email}
              </TableCell>
              <TableCell>{getStatusBadge(user.status)}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="capitalize dark:border-gray-700 dark:text-gray-200"
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell className="text-foreground dark:text-gray-200">
                {user.lastLogin ? (
                  formatDate(user.lastLogin)
                ) : (
                  <span className="text-muted-foreground dark:text-gray-500">
                    Never
                  </span>
                )}
              </TableCell>
              <TableCell className="text-foreground dark:text-gray-200">
                {formatDate(user.createdAt)}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onEdit(user.id)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => confirmDelete(user.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() =>
                        onChangeRole(
                          user.id,
                          user.role === "admin" ? "user" : "admin",
                        )
                      }
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        onChangeStatus(
                          user.id,
                          user.status === "blocked" ? "active" : "blocked",
                        )
                      }
                    >
                      {user.status === "blocked" ? (
                        <>
                          <Key className="mr-2 h-4 w-4" />
                          Unblock User
                        </>
                      ) : (
                        <>
                          <Ban className="mr-2 h-4 w-4" />
                          Block User
                        </>
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between p-4 border-t dark:border-gray-700">
        <div className="text-sm text-muted-foreground dark:text-gray-300">
          {selectedUsers.length > 0
            ? `${selectedUsers.length} selected`
            : `${users.length} users total`}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserTable;
