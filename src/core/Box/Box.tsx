import type { BoxProps } from "./interface";
import type { Ref } from "react";

import { createElement, forwardRef } from "react";
import { clsx } from "clsx";

import { generateDataAttributes } from "../../core/utils";

import styles from "./box.module.css";

const Box = forwardRef<Ref<Element>, BoxProps>((_props, ref) => {
    const { is = "div", data, ...restProps } = _props;
    const dataProps = generateDataAttributes({ ...data });

    const getProps = () => {
        const props = { ...restProps, ...dataProps, ref };
        const className = clsx(styles.root, props.className);
        props.className = className;
        return props;
    };

    return createElement(is, getProps());
});

Box.displayName = "Box";

export default Box;
