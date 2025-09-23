import { atom } from "jotai"
import { WidgetScreen } from "../types"

// basic widget state atoms
export const screenAtoms = atom<WidgetScreen>("auth");