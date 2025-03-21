// components/custom/SuccessPage.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Container from "@/components/layout/Container";
import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";
import Section from "@/components/layout/Section";

interface Response {
 _id: string;
 submittedAt: string;
 data: {
  question: string;
  answer: string[];
 }[];
}

export default function SuccessPage() {
 const searchParams = useSearchParams();
 const id = searchParams.get("id");

 const [response, setResponse] = useState<Response | null>(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  if (!id) return;

  async function fetchResponse() {
   const res = await fetch(`/api/responses/${id}`);
   const data = await res.json();
   setResponse(data);
   setLoading(false);
  }

  fetchResponse();
 }, [id]);

 if (loading) return <p>Loading...</p>;
 if (!response) return <p>Something went wrong. Please try again later.</p>;

 const nameField = response.data.find((item) =>
  item.question.toLowerCase().includes("name")
 );
 const userName = nameField?.answer?.[0] || "there";

 return (
  <Section backgroundColor="secondary">
   <Container>
    <Heading level={1} marginBottom={2}>
     Thank you, {userName}.
    </Heading>
    <Paragraph>
     We’ll review your submission and will reach out to you soon.
    </Paragraph>
   </Container>
  </Section>
 );
}
