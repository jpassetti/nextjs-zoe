import classnames from "classnames/bind";
import styles from "./list.module.scss";
import { ReactNode } from "react";

const cx = classnames.bind(styles);

type ListProps = {
 children: ReactNode;
};

export const Ul = ({ children }: ListProps) => {
 return <ul className={cx("list", "list__ul")}>{children}</ul>;
};

export const Ol = ({ children }: ListProps) => {
 return <ol className={cx("list", "list__ol")}>{children}</ol>;
};

export const Li = ({ children }: ListProps) => {
 return <li className={cx("list", "list__item")}>{children}</li>;
};
