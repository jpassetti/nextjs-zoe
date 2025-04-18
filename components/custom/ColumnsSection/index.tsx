import React from "react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Row from "@/components/layout/Row";
import Col from "@/components/layout/Col";
import Paragraph from "@/components/html/Paragraph";
import ParseContent from "@/components/utils/ParseContent";
import { ColumnsSectionProps, ContentBlockProps} from "@/lib/interfaces";



const ColumnsSection: React.FC<ColumnsSectionProps> = ({ data }) => {
  const { backgroundColor, rows, paddingTop, paddingBottom, marginTop, marginBottom } = data;
  return (
    <Section 
      backgroundColor={backgroundColor}
      textAlign={data.textAlign || "left"}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      marginTop={marginTop}
      marginBottom={marginBottom}
    >
      <Container>
        {rows.map((row, rowIndex) => (
          <Row
            key={rowIndex}
            justifyContent="center"
          >
            {row.columns.map((column, columnIndex) => (
              <Col
                key={columnIndex}
                xs={column.width?.xs || 12}
                sm={column.width?.sm || 12}
                md={column.width?.md || 12}
                lg={column.width?.lg || 12}
                xl={column.width?.xl || 12}
                textAlign={column.textAlign}
              >
                {typeof column.content === "string" ? (
                  <Paragraph>{column.content}</Paragraph>
                ) : (
                  <ParseContent content={column.content as ContentBlockProps[]} />
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