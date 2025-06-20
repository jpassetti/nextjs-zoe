import React from "react";
import Image from "next/image";
import styles from "./blockquote.module.scss"; // Assuming you have a CSS module for styling

interface BlockQuoteProps {
    quote: string;
    name: string;
    linkedinUrl?: string;
    jobTitle?: string;
    companyName?: string;
    companyUrl?: string;
    photo?: {
        asset?: {
            url?: string;
            metadata?: {
                dimensions?: {
                    width?: number;
                    height?: number;
                };
            };
        };
    };
}

const BlockQuote: React.FC<BlockQuoteProps> = ({
    quote,
    name,
    linkedinUrl,
    jobTitle,
    companyName,
    companyUrl,
    photo,
}) => {
    return (
        <blockquote className={styles.blockquote} lang="en" itemProp="review">
            <p className={styles.quote} itemProp="reviewBody">&quot;{quote}&quot;</p>
            <footer>
                <figure>
                    {photo?.asset?.url && (
                        <div className={styles.cite__photo}>
                            {linkedinUrl ? (
                                <a
                                    href={linkedinUrl}
                                    target="_blank"
                                    rel="author noopener noreferrer"
                                    aria-label={`Visit ${name}'s LinkedIn profile`}
                                >
                                    <Image
                                        src={photo.asset.url}
                                        alt={`${name}'s photo`}
                                        width={100}
                                        height={100}
                                    />
                                </a>
                            ) : (
                                <Image
                                    src={photo.asset.url}
                                    alt={`${name}'s photo`}
                                    width={100}
                                    height={100}
                                />
                            )}
                        </div>
                    )}
                    <figcaption>
                        <cite className={styles.cite__name} itemProp="author">
                            {linkedinUrl ? (
                                <a
                                    href={linkedinUrl}
                                    target="_blank"
                                    rel="author noopener noreferrer"
                                    aria-label={`Visit ${name}'s LinkedIn profile`}
                                >
                                    {name}
                                </a>
                            ) : (
                                name
                            )}
                        </cite>
                        {jobTitle && <div className={styles.cite__jobTitle}>{jobTitle}</div>}
                        {companyName && (
                            <div className={styles.cite__companyName}>
                                {companyUrl ? (
                                    <a
                                        href={companyUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Visit ${companyName}'s website`}
                                    >
                                        {companyName}
                                    </a>
                                ) : (
                                    companyName
                                )}
                            </div>
                        )}
                    </figcaption>
                </figure>
            </footer>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Review",
                    author: name,
                    reviewBody: quote,
                    publisher:
                        companyName && {
                            "@type": "Organization",
                            name: companyName,
                            url: companyUrl || undefined,
                        },
                    itemReviewed:
                        jobTitle && {
                            "@type": "CreativeWork",
                            name: jobTitle,
                        },
                })}
            </script>
        </blockquote>
    );
};

export default BlockQuote;
