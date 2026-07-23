"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api";
        const res = await fetch(`${apiUrl}/super-admin/contacts`, {
          credentials: "include"
        });
        const data = await res.json();
        if (data.success) {
          setContacts(data.contacts);
        }
      } catch (err) {
        console.error("Failed to fetch contacts", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Contact Submissions</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Contacts</CardTitle>
          <CardDescription>
            Messages submitted via the public contact form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">Loading...</div>
          ) : contacts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No submissions found.</div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">
                        {format(new Date(contact.createdAt), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>{contact.firstName} {contact.lastName}</TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>
                        <Badge variant={contact.status === 'Unread' ? 'destructive' : 'secondary'}>
                          {contact.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedContact(contact)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Message from {selectedContact?.firstName} {selectedContact?.lastName}</DialogTitle>
            <DialogDescription>
              {selectedContact?.email} • {selectedContact && format(new Date(selectedContact.createdAt), "PPP p")}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 p-4 rounded-md bg-muted/50 max-h-[300px] overflow-y-auto whitespace-pre-wrap text-sm">
            {selectedContact?.message}
          </div>
          <div className="mt-4 flex justify-end">
             <Button variant="outline" onClick={() => setSelectedContact(null)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
