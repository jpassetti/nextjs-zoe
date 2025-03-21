"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";
import Table from "@/components/html/Table";

interface Response {
 _id: string;
 submittedAt: string;
 submitterName?: string;
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
    <Table>
     <Table.THead>
      <Table.TR>
       <Table.TH>Name</Table.TH>
       <Table.TH>Submitted At</Table.TH>
       <Table.TH>Action</Table.TH>
      </Table.TR>
     </Table.THead>
     <Table.TBody>
      {responses.map((response) => (
       <Table.TR key={response._id}>
        <Table.TD>{response.submitterName || "Unknown"}</Table.TD>
        <Table.TD>{new Date(response.submittedAt).toLocaleString()}</Table.TD>
        <Table.TD>
         <Link href={`/questionnaire/responses/${response._id}`}>View</Link>
        </Table.TD>
       </Table.TR>
      ))}
     </Table.TBody>
    </Table>
   </Container>
  </Section>
 );
}
