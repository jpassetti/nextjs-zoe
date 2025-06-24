"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useResponsesAuth } from "@/lib/hooks/useResponsesAuth";

import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Form from "@/components/html/Form";
import Row from "@/components/layout/Row";
import Col from "@/components/layout/Col";
import Button from "@/components/html/Button";
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
 const {
    authenticated,
    enteredPassword,
    setEnteredPassword,
    error: authError,
    checkPassword,
    logout,
  } = useResponsesAuth();

 const [response, setResponse] = useState<Response | null>(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
    if (!authenticated) return;
    async function fetchResponse() {
      try {
        const res = await fetch(`/api/responses/${id}`);
        if (!res.ok) throw new Error("Failed to fetch response");
        const data = await res.json();
        setResponse(data);
      } catch (err) {
        console.error("Error fetching response:", err);
        setError("Error loading response.");
      } finally {
        setLoading(false);
      }
    }
    fetchResponse();
  }, [id, authenticated]);

  if (!authenticated) {
    return (
      <Section>
        <Container>
          <Heading level={2}>Protected Page</Heading>
          <Paragraph>This page is password protected.</Paragraph>
           <Form
                        onSubmit={e => {
                            e.preventDefault();
                            checkPassword();
                        }}
                    >
                        <Row>
                            <Col xs={12} sm={6}>
                                <Form.Group>
                                    <Form.Input
                                        type="password"
                                        value={enteredPassword}
                                        onChange={e => setEnteredPassword(e.target.value)}
                                        placeholder="Enter password"
                                    />
<Button _type="button" label="Submit" variant="primary" actionType="submit" />                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
          {authError && <p style={{ color: "red" }}>{authError}</p>}
        </Container>
      </Section>
    );
  }

 if (loading) return <p>Loading...</p>;
 if (error) return <p style={{ color: "red" }}>{error}</p>;
 if (!response) return <p>No response found.</p>;

 return (
  <Section>
   <Container>
    <button onClick={logout} style={{ marginBottom: "1rem" }}>
                    Log out
                </button>
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
