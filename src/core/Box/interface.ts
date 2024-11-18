import type { ElementType, ReactElement } from "react";
import type { DataAttributes } from "../utils";

export type As<Props = ReactElement> = ElementType<Props>;

export type UiProps = { is?: ElementType; data?: DataAttributes };

export type RightJoinProps<SourceProps, OverrideProps> = Omit<
    SourceProps,
    keyof OverrideProps
> &
    OverrideProps;

export type MergeProps<ComponentProps, Props, UiProps> = RightJoinProps<
    ComponentProps,
    Props
> &
    RightJoinProps<UiProps, Props>;

export type CreateUiProps<Component extends As, Props> = MergeProps<
    Omit<React.ComponentProps<Component>, keyof UiProps>,
    Props,
    UiProps
>;

export type BoxProps = CreateUiProps<"div", { name: string }>;
