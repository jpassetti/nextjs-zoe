"use client";

import { useState, useEffect } from "react";
import { useResponsesAuth } from "@/lib/hooks/useResponsesAuth";

import Link from "next/link";
import Button from "@/components/html/Button";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Form from "@/components/html/Form";
import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";
import Table from "@/components/html/Table";
import Col from "@/components/layout/Col";
import Row from "@/components/layout/Row";

interface Response {
    _id: string;
    submittedAt: string;
    submitterName?: string;
}


export default function ResponsesPage() {
    const {
        authenticated,
        enteredPassword,
        setEnteredPassword,
        error: authError,
        checkPassword,
        logout,
    } = useResponsesAuth();
    const [responses, setResponses] = useState<Response[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Always call hooks before any return

    useEffect(() => {
        if (!authenticated) return;
        async function fetchResponses() {
            try {
                const res = await fetch("/api/responses");
                if (!res.ok) throw new Error("Failed to fetch responses");
                const data = await res.json();
                setResponses(data);
            } catch (err) {
                console.error("Error fetching responses:", err);
                setError("Error loading responses.");
            } finally {
                setLoading(false);
            }
        }
        fetchResponses();
    }, [authenticated]);

    if (!authenticated) {
        return (
            <Section>
                <Container>
                    <Heading level={2} marginBottom={2}>Protected Page</Heading>
                    <Paragraph marginBottom={2}>This page is password protected.</Paragraph>

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

    return (
        <Section>
            <Container>
                <Heading level={1}>Responses</Heading>
                <Paragraph>Click &quot;View&quot; to see response details.</Paragraph>
                <button onClick={logout} style={{ marginBottom: "1rem" }}>
                    Log out
                </button>
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