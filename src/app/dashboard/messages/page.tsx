"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";

export default function ContactMessagesPage() {
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<any>();

  useEffect(() => {
    const messages = async () => {
      const res = await axios.get("/api/contact");
      setContactMessages(res.data);
    };
    messages();
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-8">Contact Messages</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Message Preview</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contactMessages.map((message) => (
              <TableRow key={message.id}>
                <TableCell>{message.name}</TableCell>
                <TableCell>{message.email}</TableCell>
                <TableCell>{message.phone}</TableCell>
                <TableCell>{message.message.substring(0, 50)}...</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedMessage(message)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Contact Message Details</DialogTitle>
                        <DialogDescription>
                          Full details of the contact message
                        </DialogDescription>
                      </DialogHeader>
                      {selectedMessage && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <h3 className="font-semibold">Name</h3>
                            <p>{selectedMessage.name}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Email</h3>
                            <p>{selectedMessage.email}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Phone</h3>
                            <p>{selectedMessage.phone}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Message</h3>
                            <p>{selectedMessage.message}</p>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
