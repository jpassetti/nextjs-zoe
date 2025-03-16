"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";

interface Response {
 _id: string;
 submittedAt: string;
 questionnaireTitle?: string;
}

export default function ResponsesPage() {
 const [responses, setResponses] = useState<Response[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  async function fetchResponses() {
   try {
    const res = await fetch("/api/responses");
    if (!res.ok) throw new Error("Failed to fetch responses");

    const data = await res.json();
    setResponses(data);
   } catch (err) {
    console.error("Error fetching responses:", err); // ✅ Logs the error
    setError("Error loading responses.");
   } finally {
    setLoading(false);
   }
  }
  fetchResponses();
 }, []);

 if (loading) return <p>Loading...</p>;
 if (error) return <p style={{ color: "red" }}>{error}</p>;

 return (
  <Section>
   <Container>
    <Heading level={1}>Responses</Heading>
    <Paragraph>Click &quot;View&quot; to see response details.</Paragraph>
    <table>
     <thead>
      <tr>
       <th>Questionnaire</th>
       <th>Submitted At</th>
       <th>Action</th>
      </tr>
     </thead>
     <tbody>
      {responses.map((response) => (
       <tr key={response._id}>
        <td>{response.questionnaireTitle || "Untitled"}</td>
        <td>{new Date(response.submittedAt).toLocaleString()}</td>
        <td>
         <Link href={`/questionnaire/responses/${response._id}`}>View</Link>
        </td>
       </tr>
      ))}
     </tbody>
    </table>
   </Container>
  </Section>
 );
}
