import React from "react";
import HelpLayout from "@/components/layouts/HelpLayout";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I place an order?",
    answer: "Browse our products, add items to your cart, and proceed to checkout. Follow the on-screen instructions to complete your purchase.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We only accept cash on delivery.",
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you will receive a tracking link via email and SMS.",
  },
  {
    question: "What is your return policy?",
    answer: "You can return most items within 7 days of delivery. Please see our Returns Policy page for details.",
  },
  {
    question: "How do I contact support?",
    answer: "You can reach us via the Contact page or email us at support@beautycrossasia.com.",
  },
];

export default function FaqPage() {
  return (
    <HelpLayout>
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, idx) => (
          <AccordionItem key={idx} value={String(idx)}>
            <AccordionTrigger className="text-lg font-medium">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </HelpLayout>
  );
} 