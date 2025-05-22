"use client";

import { useEffect, useState } from "react";
import Container from "@/components/layout/Container";
import Heading from "@/components/html/Heading";
import Row from "@/components/layout/Row";
import styles from "./previewbanner.module.scss";
import Button from "@/components/html/Button";

const PreviewBanner = () => {
    const [redirectPath, setRedirectPath] = useState("/");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setRedirectPath(window.location.pathname);
        }
    }, []);

    return (
        <div className={styles.preview_banner}> 
           <Container>
            <Row justifyContent="space-between" alignItems="center">
                <div className={styles.preview_banner_text}>
                    <Heading level={4}>Preview Mode</Heading>
                </div>
                <div className={styles.preview_banner_button}>
                    <Button
                        _type="button"
                        label="Exit Preview"
                        linkType="internal"
                        internalPage={{
                            slug: {
                                current: `api/exit-preview?redirect=${encodeURIComponent(redirectPath)}`
                            }
                        }}
                        variant="primary"
                    />
                </div>
            </Row>
           </Container>
        </div>
    );
};

export default PreviewBanner;