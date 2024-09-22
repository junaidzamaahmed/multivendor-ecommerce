"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  purchaseHistory: Purchase[];
}

interface Purchase {
  id: string;
  date: string;
  items: string[];
  total: number;
}

const CustomerDashboard = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [expandedCustomerId, setExpandedCustomerId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch customer data from API
    fetch("/api/customers")
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data);
        setIsLoading(false);
      });
  }, []);

  const toggleAccordion = (customerId: string) => {
    setExpandedCustomerId(expandedCustomerId === customerId ? null : customerId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Customer Dashboard</h1>
      {customers.map((customer) => (
        <Card key={customer.id} className="mb-4">
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{customer.name}</h2>
                <p>{customer.email}</p>
                <p>{customer.phone}</p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => toggleAccordion(customer.id)}
              >
                {expandedCustomerId === customer.id ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </div>
            {expandedCustomerId === customer.id && (
              <Accordion type="single">
                <AccordionItem value={customer.id}>
                  <AccordionTrigger>Purchase History</AccordionTrigger>
                  <AccordionContent>
                    {customer.purchaseHistory.map((purchase) => (
                      <div key={purchase.id} className="mb-2">
                        <p>Date: {purchase.date}</p>
                        <p>Items: {purchase.items.join(", ")}</p>
                        <p>Total: ${purchase.total}</p>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CustomerDashboard;