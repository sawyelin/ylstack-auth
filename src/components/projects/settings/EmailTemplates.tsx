import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Plus,
  Save,
  Eye,
  Code,
  Mail,
  AlertTriangle,
  CheckCircle,
  X,
  Copy,
} from "lucide-react";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type:
    | "verification"
    | "welcome"
    | "password-reset"
    | "invitation"
    | "notification";
  active: boolean;
}

interface EmailTemplatesProps {
  templates?: EmailTemplate[];
  onSave?: (template: EmailTemplate) => void;
  onPreview?: (template: EmailTemplate) => void;
  onCreateTemplate?: (template: Partial<EmailTemplate>) => void;
}

const defaultTemplates: EmailTemplate[] = [
  {
    id: "1",
    name: "Email Verification",
    subject: "Verify your email address",
    content:
      '<h1>Hello {{name}},</h1><p>Please verify your email address by clicking the button below:</p><p><a href="{{verificationLink}}" style="background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a></p><p>If you did not create an account, please ignore this email.</p>',
    type: "verification",
    active: true,
  },
  {
    id: "2",
    name: "Welcome Email",
    subject: "Welcome to our platform!",
    content:
      '<h1>Welcome, {{name}}!</h1><p>Thank you for joining our platform. We are excited to have you on board.</p><p>You can now access all features by logging in to your account.</p><p><a href="{{loginLink}}" style="background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to Dashboard</a></p>',
    type: "welcome",
    active: true,
  },
  {
    id: "3",
    name: "Password Reset",
    subject: "Reset your password",
    content:
      '<h1>Hello {{name}},</h1><p>We received a request to reset your password. Click the button below to set a new password:</p><p><a href="{{resetLink}}" style="background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a></p><p>If you did not request a password reset, please ignore this email or contact support.</p>',
    type: "password-reset",
    active: true,
  },
  {
    id: "4",
    name: "User Invitation",
    subject: "You have been invited to join",
    content:
      '<h1>Hello,</h1><p>You have been invited to join our platform by {{inviterName}}.</p><p>Click the button below to accept the invitation and create your account:</p><p><a href="{{invitationLink}}" style="background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Accept Invitation</a></p>',
    type: "invitation",
    active: true,
  },
];

const EmailTemplates: React.FC<EmailTemplatesProps> = ({
  templates = defaultTemplates,
  onSave = () => {},
  onPreview = () => {},
  onCreateTemplate = () => {},
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    templates[0]?.id || "",
  );
  const [editMode, setEditMode] = useState<"visual" | "code">("visual");
  const [previewVisible, setPreviewVisible] = useState(false);

  const selectedTemplate =
    templates.find((t) => t.id === selectedTemplateId) || templates[0];
  const [editedTemplate, setEditedTemplate] =
    useState<EmailTemplate>(selectedTemplate);

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplateId(templateId);
    const template = templates.find((t) => t.id === templateId) || templates[0];
    setEditedTemplate(template);
  };

  const handleInputChange = (field: keyof EmailTemplate, value: any) => {
    setEditedTemplate((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedTemplate);
  };

  const handlePreview = () => {
    onPreview(editedTemplate);
    setPreviewVisible(true);
  };

  const handleCreateTemplate = () => {
    onCreateTemplate({
      name: "New Template",
      subject: "Subject",
      content: "<h1>Hello,</h1><p>This is a new email template.</p>",
      type: "notification",
      active: true,
    });
  };

  return (
    <div className="w-full h-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Email Templates
          </h2>
          <p className="text-gray-500">
            Customize email templates for different user interactions
          </p>
        </div>
        <Button
          onClick={handleCreateTemplate}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          <span>New Template</span>
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Template List */}
        <div className="col-span-12 md:col-span-3">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Templates</CardTitle>
              <CardDescription>Select a template to edit</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-2">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => handleTemplateChange(template.id)}
                      className={`p-3 rounded-md cursor-pointer flex items-center justify-between ${selectedTemplateId === template.id ? "bg-primary/10 border border-primary/20" : "hover:bg-gray-100"}`}
                    >
                      <div className="flex items-center gap-3">
                        <Mail
                          size={18}
                          className={
                            selectedTemplateId === template.id
                              ? "text-primary"
                              : "text-gray-500"
                          }
                        />
                        <div>
                          <p className="font-medium text-sm">{template.name}</p>
                          <p className="text-xs text-gray-500">
                            {template.type}
                          </p>
                        </div>
                      </div>
                      {template.active ? (
                        <div
                          className="h-2 w-2 rounded-full bg-green-500"
                          title="Active"
                        ></div>
                      ) : (
                        <div
                          className="h-2 w-2 rounded-full bg-gray-300"
                          title="Inactive"
                        ></div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Template Editor */}
        <div className="col-span-12 md:col-span-9">
          <Card className="h-full">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">
                  {editedTemplate?.name || "Template Editor"}
                </CardTitle>
                <CardDescription>Edit your email template</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handlePreview}>
                  <Eye size={16} className="mr-2" />
                  Preview
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save size={16} className="mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="template-name">Template Name</Label>
                    <Input
                      id="template-name"
                      value={editedTemplate?.name || ""}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="template-type">Template Type</Label>
                    <Select
                      value={editedTemplate?.type}
                      onValueChange={(value) =>
                        handleInputChange("type", value)
                      }
                    >
                      <SelectTrigger id="template-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="verification">
                          Verification
                        </SelectItem>
                        <SelectItem value="welcome">Welcome</SelectItem>
                        <SelectItem value="password-reset">
                          Password Reset
                        </SelectItem>
                        <SelectItem value="invitation">Invitation</SelectItem>
                        <SelectItem value="notification">
                          Notification
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="template-subject">Email Subject</Label>
                  <Input
                    id="template-subject"
                    value={editedTemplate?.subject || ""}
                    onChange={(e) =>
                      handleInputChange("subject", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="template-content">Email Content</Label>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={editMode === "visual" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setEditMode("visual")}
                      >
                        <Eye size={14} className="mr-1" /> Visual
                      </Button>
                      <Button
                        variant={editMode === "code" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setEditMode("code")}
                      >
                        <Code size={14} className="mr-1" /> HTML
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    id="template-content"
                    value={editedTemplate?.content || ""}
                    onChange={(e) =>
                      handleInputChange("content", e.target.value)
                    }
                    className="min-h-[300px] font-mono"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="template-active"
                    checked={editedTemplate?.active || false}
                    onCheckedChange={(checked) =>
                      handleInputChange("active", checked)
                    }
                  />
                  <Label htmlFor="template-active">Active</Label>
                </div>

                <Separator />

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-sm font-medium mb-2">
                    Available Variables
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {"{{name}}"}
                      </code>
                      <span className="text-xs text-gray-500">User's name</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {"{{email}}"}
                      </code>
                      <span className="text-xs text-gray-500">
                        User's email
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {"{{verificationLink}}"}
                      </code>
                      <span className="text-xs text-gray-500">
                        Email verification URL
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {"{{resetLink}}"}
                      </code>
                      <span className="text-xs text-gray-500">
                        Password reset URL
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {"{{invitationLink}}"}
                      </code>
                      <span className="text-xs text-gray-500">
                        Invitation URL
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {"{{inviterName}}"}
                      </code>
                      <span className="text-xs text-gray-500">
                        Inviter's name
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Preview Modal would be implemented here */}
      {previewVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[800px] max-w-[90vw] max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">
                Email Preview: {editedTemplate.subject}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPreviewVisible(false)}
              >
                <X size={18} />
              </Button>
            </div>
            <div className="p-4 overflow-auto flex-1">
              <div className="bg-gray-50 p-6 rounded-md">
                <div className="bg-white p-6 rounded border shadow-sm">
                  <div
                    dangerouslySetInnerHTML={{ __html: editedTemplate.content }}
                  />
                </div>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setPreviewVisible(false)}
              >
                Close
              </Button>
              <Button>
                <Copy size={16} className="mr-2" />
                Copy HTML
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailTemplates;
