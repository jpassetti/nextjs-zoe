import React from "react";
import Image from "next/image";
import styles from "./cite.module.scss"; // Assuming you have a CSS module for styling

interface CiteProps {
    name?: string;
    linkedinUrl?: string;
    jobTitle?: string;
    companyName?: string;
    companyUrl?: string;
    className?: string;
    photo: {
        asset?: {
            url?: string;
            metadata?: {
                dimensions?: {
                    width?: number; // Make width optional
                    height?: number; // Make height optional
                };
            };
        };
    };
}

const Cite: React.FC<CiteProps> = ({ name, photo, linkedinUrl, jobTitle, companyName, companyUrl }) => {
    return (
        <cite className={styles.cite}>
            {photo?.asset?.url && (
                <div className={styles.cite__photo}>
                    {linkedinUrl ? (
                        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                            <Image
                                src={photo.asset.url}
                                alt={name ? `${name}'s photo` : "Testimonial photo"}
                                width={100}
                                height={100}
                                className="photo"
                            />
                        </a>
                    ) : (
                        <Image
                            src={photo.asset.url}
                            alt={name ? `${name}'s photo` : "Testimonial photo"}
                            width={100}
                            height={100}
                            className="photo"
                        />
                    )}
                </div>
            )}
            <span className={styles.cite__name}>
                {linkedinUrl ? (
                    <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                        {name}
                    </a>
                ) : name
                }
            </span><br />
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
    );
};

export default Cite;
