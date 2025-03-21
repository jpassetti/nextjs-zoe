import { ReactNode } from "react";
import styles from "./table.module.scss";

// Shared props for all table components
interface TableProps {
 children: ReactNode;
}

// Table root component
const Table = ({ children }: TableProps) => {
 return <table className={styles.table}>{children}</table>;
};

// Subcomponents with proper typing
const THead = ({ children }: TableProps) => {
 return <thead className={styles.table__head}>{children}</thead>;
};

const TBody = ({ children }: TableProps) => {
 return <tbody className={styles.table__body}>{children}</tbody>;
};

const TFoot = ({ children }: TableProps) => {
 return <tfoot className={styles.table__foot}>{children}</tfoot>;
};

const TR = ({ children }: TableProps) => {
 return <tr className={styles.table__row}>{children}</tr>;
};

const TH = ({ children }: TableProps) => {
 return <th className={styles.table__header}>{children}</th>;
};

const TD = ({ children }: TableProps) => {
 return <td className={styles.table__data}>{children}</td>;
};

// Attach subcomponents to Table
Table.THead = THead;
Table.TBody = TBody;
Table.TFoot = TFoot;
Table.TR = TR;
Table.TH = TH;
Table.TD = TD;

export default Table;
