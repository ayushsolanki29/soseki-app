"use client";

import { useEffect, useState, useRef, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";
import API from "@/lib/api";
import { toast } from "sonner";
import { ChevronLeftIcon, SendIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function SupportTicketDetailPage({ params }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const ticketId = unwrappedParams.id;
  
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [messageContent, setMessageContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchTicket();
  }, [ticketId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ticket?.messages]);

  const fetchTicket = async () => {
    try {
      const res = await API.get(`/support-tickets/${ticketId}`);
      setTicket(res.data.ticket);
    } catch (error) {
      toast.error("Failed to load support ticket");
      router.push("/dashboard/support");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageContent.trim()) return;

    setIsSending(true);
    try {
      const res = await API.post(`/support-tickets/${ticketId}/messages`, {
        content: messageContent.trim()
      });
      setTicket(prev => ({
        ...prev,
        messages: [...prev.messages, res.data.message]
      }));
      setMessageContent("");
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 pt-4 max-w-4xl mx-auto w-full">
        <Skeleton className="h-4 w-24 mb-4" />
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-2 space-y-4">
             <Skeleton className="h-[400px] w-full" />
          </div>
          <div className="space-y-4">
             <Skeleton className="h-[200px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!ticket) return null;

  return (
    <div className="space-y-6 pt-4 max-w-4xl mx-auto w-full h-[calc(100vh-120px)] flex flex-col">
      <div className="shrink-0">
        <Link href="/dashboard/support" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeftIcon className="mr-1 size-4" />
          Back to tickets
        </Link>
        <div className="flex items-start justify-between mt-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{ticket.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">Ticket ID: {ticket.id}</p>
          </div>
          <div className="flex gap-2">
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
              ticket.priority === 'High' ? 'bg-red-100 text-red-800' : 
              ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
              'bg-green-100 text-green-800'
            }`}>
              {ticket.priority} Priority
            </span>
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
              ticket.status === 'Resolved' ? 'bg-green-100 text-green-800' : 
              'bg-blue-100 text-blue-800'
            }`}>
              {ticket.status}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Chat Area */}
        <div className="md:col-span-2 flex flex-col bg-card border rounded-lg overflow-hidden shadow-sm">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {/* Initial Description as first message */}
            <div className="flex gap-3">
              <DynamicAvatar type="user" seed={ticket.user.name || ticket.user.email} size={36} />
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-sm">{ticket.user.name || "User"}</span>
                  <span className="text-[10px] text-muted-foreground">{formatDate(ticket.createdAt)}</span>
                </div>
                <div className="mt-1 text-sm bg-muted/50 p-3 rounded-lg rounded-tl-none border">
                  {ticket.description}
                </div>
              </div>
            </div>

            {/* Replies */}
            {ticket.messages.map((msg) => {
              // Assume super admin replies come from a different user or someone else.
              const isSuperAdmin = msg.sender.email === 'admin@soseki.com';
              
              return (
                <div key={msg.id} className={`flex gap-3 ${isSuperAdmin ? 'flex-row-reverse' : ''}`}>
                  <DynamicAvatar 
                    type={isSuperAdmin ? "default" : "user"} 
                    seed={msg.sender.name || msg.sender.email} 
                    size={36} 
                  />
                  <div className={`flex-1 flex flex-col ${isSuperAdmin ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-baseline gap-2">
                      {!isSuperAdmin && <span className="font-semibold text-sm">{msg.sender.name || "User"}</span>}
                      <span className="text-[10px] text-muted-foreground">{formatDate(msg.createdAt)}</span>
                      {isSuperAdmin && <span className="font-semibold text-sm">Soseki Support</span>}
                    </div>
                    <div className={`mt-1 text-sm p-3 rounded-lg border ${
                      isSuperAdmin 
                        ? 'bg-primary text-primary-foreground rounded-tr-none border-primary' 
                        : 'bg-muted/50 rounded-tl-none'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-3 bg-muted/20 border-t">
            {ticket.status === 'Resolved' ? (
              <div className="text-center text-sm text-muted-foreground py-2">
                This ticket has been resolved and closed.
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Textarea 
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  placeholder="Type your reply here..." 
                  className="min-h-[60px] resize-none"
                  disabled={isSending}
                />
                <Button type="submit" disabled={isSending || !messageContent.trim()} className="self-end px-3">
                  {isSending ? <Loader2 className="size-4 animate-spin" /> : <SendIcon className="size-4" />}
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Sidebar details */}
        <div className="space-y-4 overflow-y-auto">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm">Ticket Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm pb-4">
              <div>
                <span className="text-muted-foreground block text-xs mb-1">Created By</span>
                <div className="flex items-center gap-2 font-medium">
                  <DynamicAvatar type="user" seed={ticket.user.name || ticket.user.email} size={20} />
                  {ticket.user.name}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5 ml-7">{ticket.user.email}</div>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs mb-1">Organization</span>
                <span className="font-medium">{ticket.organization.name}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs mb-1">Date Created</span>
                <span className="font-medium">{formatDate(ticket.createdAt)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
