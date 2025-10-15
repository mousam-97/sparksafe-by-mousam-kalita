import React from "react";
import styles from "./Grid.module.css";
import cx from "classnames";
type SpaceSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10;

type RowProps = {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties; // consumers can still override, but we avoid generating inline styles here
    columnDirection?: boolean;
    gap?: SpaceSize;
    align?: "start" | "center" | "end" | "stretch";
    justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
    wrap?: boolean;
};

export function Row({
    children,
    className,
    style,
    columnDirection = false,
    gap,
    align,
    justify,
    wrap = false,
}: RowProps) {
    const classNames = cx(
        styles.row,
        {
            [styles["row--direction-column"]]: columnDirection,
            [styles["row--direction-row"]]: !columnDirection,
            [styles["row--wrap"]]: wrap,
            [styles["row--nowrap"]]: !wrap,
        },
        align && {
            [styles["row--align-start"]]: align === "start",
            [styles["row--align-center"]]: align === "center",
            [styles["row--align-end"]]: align === "end",
            [styles["row--align-stretch"]]: align === "stretch",
        },
        justify && {
            [styles["row--justify-start"]]: justify === "start",
            [styles["row--justify-center"]]: justify === "center",
            [styles["row--justify-end"]]: justify === "end",
            [styles["row--justify-between"]]: justify === "between",
            [styles["row--justify-around"]]: justify === "around",
            [styles["row--justify-evenly"]]: justify === "evenly",
        },
        typeof gap !== "undefined" && { [(styles as any)[`row--gap-${gap}`]]: true },
        className
    );

    return (
        <div className={classNames} style={style}>
            {children}
        </div>
    );
}

type SpaceProps = {
    vertical?: boolean; // if true, adds vertical margins; otherwise left margin
    size?: SpaceSize; // token-based spacing size
    className?: string;
    style?: React.CSSProperties;
};

export function Space({ vertical = false, size = 3, className, style }: SpaceProps) {
    const classNames = cx(
        styles["row__spaceInline"],
        {
            [(styles as any)[`row--my-${size}`]]: vertical,
            [(styles as any)[`row--ml-${size}`]]: !vertical,
        },
        className
    );
    return <span className={classNames} style={style} />;
}

export default Row;


