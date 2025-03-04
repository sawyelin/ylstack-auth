import React, { useState } from "react";
import { Copy, Eye, EyeOff, Plus, RefreshCw, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string | null;
  status: "active" | "expired";
}

interface ApiKeysProps {
  projectId?: string;
  apiKeys?: ApiKey[];
}

const ApiKeys = ({
  projectId = "123",
  apiKeys: initialApiKeys,
}: ApiKeysProps) => {
  // Default API keys if none provided
  const defaultApiKeys: ApiKey[] = [
    {
      id: "1",
      name: "Production API Key",
      key: "pk_live_51HG7d9CjttL2WsJdE8K2QhNPYcuNAJtbPpkMsqCqXHSILG6vVd",
      created: "2023-05-15T10:30:00Z",
      lastUsed: "2023-06-20T14:45:00Z",
      status: "active",
    },
    {
      id: "2",
      name: "Development API Key",
      key: "pk_test_51HG7d9CjttL2WsJdE8K2QhNPYcuNAJtbPpkMsqCqXHSILG6vVd",
      created: "2023-05-15T10:35:00Z",
      lastUsed: "2023-06-19T09:22:00Z",
      status: "active",
    },
    {
      id: "3",
      name: "Staging API Key",
      key: "pk_test_51HG7d9CjttL2WsJdE8K2QhNPYcuNAJtbPpkMsqCqXHSILG6vVd",
      created: "2023-05-16T08:15:00Z",
      lastUsed: null,
      status: "expired",
    },
  ];

  const [apiKeys, setApiKeys] = useState<ApiKey[]>(
    initialApiKeys || defaultApiKeys,
  );
  const [newKeyName, setNewKeyName] = useState("");
  const [showNewKeyDialog, setShowNewKeyDialog] = useState(false);
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null);
  const [keyVisibility, setKeyVisibility] = useState<Record<string, boolean>>(
    {},
  );

  // Function to toggle key visibility
  const toggleKeyVisibility = (keyId: string) => {
    setKeyVisibility((prev) => ({
      ...prev,
      [keyId]: !prev[keyId],
    }));
  };

  // Function to copy key to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  // Function to generate a new API key
  const generateNewKey = () => {
    if (!newKeyName.trim()) return;

    const newKey = `pk_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`;
    const newApiKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: newKey,
      created: new Date().toISOString(),
      lastUsed: null,
      status: "active",
    };

    setApiKeys([...apiKeys, newApiKey]);
    setNewlyCreatedKey(newKey);
    setNewKeyName("");
  };

  // Function to revoke an API key
  const revokeKey = (keyId: string) => {
    setApiKeys(apiKeys.filter((key) => key.id !== keyId));
  };

  // Function to format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full bg-background p-6">
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>
            Manage API keys that allow secure access to your authentication
            services.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Your API Keys</h3>
              <Dialog
                open={showNewKeyDialog}
                onOpenChange={setShowNewKeyDialog}
              >
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Generate New Key
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New API Key</DialogTitle>
                    <DialogDescription>
                      Give your API key a name to help you identify it later.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Key Name
                      </label>
                      <Input
                        id="name"
                        placeholder="e.g., Production API Key"
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setShowNewKeyDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        generateNewKey();
                        setShowNewKeyDialog(false);
                      }}
                    >
                      Generate
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Newly created key alert */}
            {newlyCreatedKey && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
                <div className="flex">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-yellow-800">
                      New API Key Created
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        Make sure to copy your API key now. You won't be able to
                        see it again!
                      </p>
                      <div className="mt-2 flex items-center space-x-2">
                        <code className="bg-yellow-100 px-2 py-1 rounded text-yellow-900 font-mono text-sm">
                          {newlyCreatedKey}
                        </code>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(newlyCreatedKey)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setNewlyCreatedKey(null)}
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium">Name</th>
                    <th className="px-4 py-3 text-left font-medium">Key</th>
                    <th className="px-4 py-3 text-left font-medium">Created</th>
                    <th className="px-4 py-3 text-left font-medium">
                      Last Used
                    </th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-right font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {apiKeys.map((apiKey) => (
                    <tr key={apiKey.id} className="border-b">
                      <td className="px-4 py-3">{apiKey.name}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <code className="font-mono bg-muted px-2 py-1 rounded text-xs">
                            {keyVisibility[apiKey.id]
                              ? apiKey.key
                              : `${apiKey.key.substring(0, 8)}...${apiKey.key.substring(apiKey.key.length - 4)}`}
                          </code>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => toggleKeyVisibility(apiKey.id)}
                                >
                                  {keyVisibility[apiKey.id] ? (
                                    <EyeOff className="h-3.5 w-3.5" />
                                  ) : (
                                    <Eye className="h-3.5 w-3.5" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                {keyVisibility[apiKey.id]
                                  ? "Hide key"
                                  : "Show key"}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => copyToClipboard(apiKey.key)}
                                >
                                  <Copy className="h-3.5 w-3.5" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Copy to clipboard</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {formatDate(apiKey.created)}
                      </td>
                      <td className="px-4 py-3">
                        {formatDate(apiKey.lastUsed)}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={
                            apiKey.status === "active" ? "default" : "outline"
                          }
                          className={
                            apiKey.status === "active"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }
                        >
                          {apiKey.status === "active" ? "Active" : "Expired"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end space-x-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => {
                                    // Regenerate key logic would go here
                                    // For now, just show a placeholder
                                    alert(
                                      "Regenerate key functionality would go here",
                                    );
                                  }}
                                >
                                  <RefreshCw className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Regenerate key</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Revoke API Key
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to revoke this API key?
                                  This action cannot be undone and any
                                  applications using this key will no longer be
                                  able to authenticate.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  onClick={() => revokeKey(apiKey.id)}
                                >
                                  Revoke Key
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t px-6 py-4">
          <div className="text-xs text-muted-foreground">
            API keys provide full access to your authentication services. Keep
            them secure!
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ApiKeys;
