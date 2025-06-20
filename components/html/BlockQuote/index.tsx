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
        <blockquote className={styles.blockquote}>
            <p className={styles.quote}>&quot;{quote}&quot;</p>

            <footer>
                <cite className={styles.cite}>
                    {photo?.asset?.url && (
                        <div className={styles.cite__photo}>
                            {linkedinUrl ? (
                                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                                    <Image
                                        src={photo.asset.url}
                                        alt={`${name}'s photo`}
                                        width={100}
                                        height={100}
                                        className={styles.cite__photo}
                                    />
                                </a>
                            ) : (
                                <Image
                                    src={photo.asset.url}
                                    alt={`${name}'s photo`}
                                    width={100}
                                    height={100}
                                    className={styles.cite__photo}
                                />
                            )}
                        </div>
                    )}
                    <span className={styles.cite__name}>{linkedinUrl ? (
                        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                            {name}
                        </a>
                    ) : (
                        name
                    )}</span><br />
                    {jobTitle && <><span className={styles.cite__jobTitle}>{jobTitle}</span><br /></>}
                    {companyName && (
                        <span className={styles.cite__companyName}>
                            {companyUrl ? (
                                <a href={companyUrl} target="_blank" rel="noopener noreferrer">
                                    {companyName}
                                </a>
                            ) : (
                                companyName
                            )}
                        </span>
                    )}
                </cite>

            </footer>
        </blockquote>
    );
};

export default BlockQuote;
