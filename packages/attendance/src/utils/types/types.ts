import { Moment } from "moment";
import { Dispatch, SetStateAction } from "react";

// Moment Related
export type MomentType = Moment;
export type MomentUnionType = Moment | Moment[] | Moment[][];

// General
export type UseStateFunction<T> = Dispatch<SetStateAction<T>>;
