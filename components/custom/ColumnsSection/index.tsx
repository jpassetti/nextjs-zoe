import React from "react";
import { ColumnsSection as ColumnsSectionType } from "@/lib/sanity";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Row from "@/components/layout/Row";
import Col from "@/components/layout/Col";
import Paragraph from "@/components/html/Paragraph";
import ParseContent, { ContentBlock } from "@/components/utils/ParseContent";

interface ColumnsSectionProps {
  data: ColumnsSectionType & {
    rows: Array<{
      columns: Array<{
        title: string;
        content: string | ContentBlock[];
        width?: {
          xs?: number;
          sm?: number;
          md?: number;
          lg?: number;
          xl?: number;
        };
      }>;
      backgroundColor?: string;
    }>;
    backgroundColor?: string;
    adminTitle?: string;
  };
}

const ColumnsSection: React.FC<ColumnsSectionProps> = ({ data }) => {
  const { backgroundColor, rows } = data;

  return (
    <Section backgroundColor={backgroundColor || "transparent"}>
      <Container>
        {rows.map((row, rowIndex) => (
          <Row key={rowIndex} justifyContent="center">
            {row.columns.map((column, columnIndex) => (
              <Col
                key={columnIndex}
                xs={column.width?.xs || 12}
                sm={column.width?.sm || 12}
                md={column.width?.md || 12}
                lg={column.width?.lg || 12}
                xl={column.width?.xl || 12}
                textAlign="center"
              >
                {typeof column.content === "string" ? (
                  <Paragraph>{column.content}</Paragraph>
                ) : (
                  <ParseContent content={column.content as ContentBlock[]} />
                )}
              </Col>
            ))}
          </Row>
        ))}
      </Container>
    </Section>
  );
};

export default ColumnsSection;