"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";
import Table from "@/components/html/Table";
import Link from "next/link";

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
    <Paragraph marginBottom={2}>
     <Link href="/questionnaire/responses">Back to Responses</Link>
    </Paragraph>
    <Heading level={1} marginBottom={2}>
     {response.questionnaireTitle || "Untitled"}
    </Heading>
    <Paragraph marginBottom={2}>
     Submitted At: {new Date(response.submittedAt).toLocaleString()}
    </Paragraph>
    <Table>
     <Table.THead>
      <Table.TR>
       <Table.TH>Question</Table.TH>
       <Table.TH>Answer</Table.TH>
      </Table.TR>
     </Table.THead>
     <Table.TBody>
      {response.data.map((item, index) => (
       <Table.TR key={index}>
        <Table.TD>{item.question}</Table.TD>
        <Table.TD>{item.answer.join(", ")}</Table.TD>
       </Table.TR>
      ))}
     </Table.TBody>
    </Table>
   </Container>
  </Section>
 );
}
