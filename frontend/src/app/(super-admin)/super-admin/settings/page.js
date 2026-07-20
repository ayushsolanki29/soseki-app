"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function TwoFactorSection({ isEnabled, onUpdate }) {
  const [setupModalOpen, setSetupModalOpen] = useState(false);
  const [disableModalOpen, setDisableModalOpen] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [secret, setSecret] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const startSetup = async () => {
    setLoading(true);
    try {
      const res = await API.post("/super-admin/settings/2fa/generate");
      setQrCode(res.data.qrCodeUrl);
      setSecret(res.data.secret);
      setSetupModalOpen(true);
    } catch (error) {
      toast.error("Error", { description: "Failed to start 2FA setup" });
    } finally {
      setLoading(false);
    }
  };

  const confirmSetup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/super-admin/settings/2fa/verify", { token });
      toast.success("Success", { description: "Two-Factor Authentication enabled" });
      setSetupModalOpen(false);
      setToken("");
      onUpdate();
    } catch (error) {
      toast.error("Error", { description: error.response?.data?.message || "Invalid code" });
    } finally {
      setLoading(false);
    }
  };

  const confirmDisable = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/super-admin/settings/2fa/disable", { token });
      toast.success("Success", { description: "Two-Factor Authentication disabled" });
      setDisableModalOpen(false);
      setToken("");
      onUpdate();
    } catch (error) {
      toast.error("Error", { description: error.response?.data?.message || "Invalid code" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Two-Factor Authentication
          {isEnabled ? (
            <Badge variant="default" className="bg-green-600 hover:bg-green-700">Enabled</Badge>
          ) : (
            <Badge variant="secondary">Disabled</Badge>
          )}
        </CardTitle>
        <CardDescription>
          Add an extra layer of security to your account using an authenticator app (like Google Authenticator or Authy).
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isEnabled ? (
          <p className="text-sm text-muted-foreground">
            Two-Factor Authentication is currently enabled. You will be prompted for a code each time you sign in.
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Two-Factor Authentication is currently disabled. We highly recommend enabling it to secure your super admin access.
          </p>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4">
        {isEnabled ? (
          <Button variant="destructive" onClick={() => setDisableModalOpen(true)}>Disable 2FA</Button>
        ) : (
          <Button variant="default" onClick={startSetup} disabled={loading}>
            {loading ? "Loading..." : "Setup 2FA"}
          </Button>
        )}
      </CardFooter>

      {/* Setup Modal */}
      <Dialog open={setupModalOpen} onOpenChange={(open) => {
        if (!open) { setSetupModalOpen(false); setToken(""); }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Setup Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              Scan the QR code below with your authenticator app, then enter the 6-digit code to verify.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={confirmSetup}>
            <div className="flex flex-col items-center gap-4 py-4">
              {qrCode && <img src={qrCode} alt="2FA QR Code" className="w-48 h-48 rounded border" />}
              <div className="text-sm">
                <span className="text-muted-foreground">Manual entry code: </span>
                <code className="font-mono bg-muted p-1 rounded">{secret}</code>
              </div>
              <div className="w-full space-y-2">
                <Label htmlFor="token">6-Digit Code</Label>
                <Input
                  id="token"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="123456"
                  maxLength={6}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setSetupModalOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={loading || token.length < 6}>Verify & Enable</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Disable Modal */}
      <Dialog open={disableModalOpen} onOpenChange={(open) => {
        if (!open) { setDisableModalOpen(false); setToken(""); }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Disable Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              Enter a code from your authenticator app to confirm you want to disable 2FA.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={confirmDisable}>
            <div className="py-4 space-y-2">
              <Label htmlFor="disable-token">6-Digit Code</Label>
              <Input
                id="disable-token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="123456"
                maxLength={6}
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDisableModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="destructive" disabled={loading || token.length < 6}>Confirm Disable</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default function SuperAdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);

  const fetchSettings = async () => {
    try {
      const res = await API.get("/super-admin/settings");
      if (res.data.success && res.data.admin) {
        setFormData({
          name: res.data.admin.name || "",
          email: res.data.admin.email || "",
          password: "",
        });
        setIsTwoFactorEnabled(res.data.admin.isTwoFactorEnabled || false);
      }
    } catch (error) {
      toast.error("Error", { description: "Failed to load super admin settings." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await API.put("/super-admin/settings", {
        name: formData.name,
        email: formData.email,
        password: formData.password || undefined,
      });
      toast.success("Success", { description: "Settings updated successfully." });
      // clear password field on success
      setFormData(prev => ({ ...prev, password: "" }));
    } catch (error) {
      toast.error("Error", { description: error.message || "Failed to update settings." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Super Admin Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your super admin account credentials.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Credentials</CardTitle>
          <CardDescription>
            Update your login details and personal information.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Super Admin"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave blank to keep unchanged"
                minLength={8}
              />
              <p className="text-[10px] text-muted-foreground">
                Minimum 8 characters.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end pt-4 border-t">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <TwoFactorSection isEnabled={isTwoFactorEnabled} onUpdate={fetchSettings} />
    </div>
  );
}
