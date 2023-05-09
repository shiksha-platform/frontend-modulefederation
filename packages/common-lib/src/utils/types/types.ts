import { Moment } from 'moment'
import { Dispatch, SetStateAction } from 'react'

// This file contains some of the custom types that are declared
// by the programmer in typescript

// Moment Related
export type MomentType = Moment
export type MomentUnionType = Moment | Moment[] | Moment[][]

// General
export type UseStateFunction<T> = Dispatch<SetStateAction<T>>
