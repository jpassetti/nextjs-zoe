"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";

interface ResponseData {
 question: string;
 answer: string[];
}

interface Response {
 _id: string;
 submittedAt: string;
 questionnaireTitle?: string;
 data: ResponseData[];
}

export default function ResponseDetailPage() {
 const { id } = useParams();
 console.log({ id });
 const [response, setResponse] = useState<Response | null>(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  async function fetchResponse() {
   try {
    const res = await fetch(`/api/responses/${id}`);
    if (!res.ok) throw new Error("Failed to fetch response");

    const data = await res.json();
    setResponse(data);
   } catch (err) {
    console.error("Error fetching response:", err); // ✅ Now using the error
    setError("Error loading response.");
   } finally {
    setLoading(false);
   }
  }
  fetchResponse();
 }, [id]);

 if (loading) return <p>Loading...</p>;
 if (error) return <p style={{ color: "red" }}>{error}</p>;
 if (!response) return <p>No response found.</p>;

 return (
  <Section>
   <Container>
    <Heading level={1}>{response.questionnaireTitle || "Untitled"}</Heading>
    <Paragraph>
     Submitted At: {new Date(response.submittedAt).toLocaleString()}
    </Paragraph>

    <Heading level={2}>Responses</Heading>
    <ul>
     {response.data.map((item, index) => (
      <li key={index}>
       <strong>{item.question}</strong>: {item.answer.join(", ")}
      </li>
     ))}
    </ul>
   </Container>
  </Section>
 );
}
