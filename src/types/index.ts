import { ReactNode } from "react";

export type Pokemon = {
  id: number;
  name: {
    french: string;
  };
  type: string[];
  base: {
    HP: number;
    Attack: number;
    Defense: number;
    "Sp. Attack": number;
    "Sp. Defense": number;
    Speed: number;
  };
};

export type DataType = {
  id: number;
  name: string;
  type: string[];
  Attack: number;
  Defense: number;
  Speed: number;
  SpAttack: number;
  SpDefense: number;
  HP: number;
  visible: boolean;
};

export type DataTypes = DataType[];

export type HasName = {
  name: string;
};

export type KeyOfDataType = keyof DataType;

export type KeyOf<P> = keyof P;

export type SortsKeys = KeyOfDataType[];

export type checkedFams =
  | {
      type: string;
      isChecked: boolean;
    }[]
  | undefined;

export interface TableProps {
  heading?: string;
  data: DataTypes;
  children?: ReactNode;
  sorts: SortsKeys;
  isAsc?: boolean;
  colors?: string[];
}

// QUICK TYPES
//

export interface Data {
  id: number;
  name: Name;
  type: Fams[];
  base: Base;
}

export interface Base {
  HP: number;
  Attack: number;
  Defense: number;
  "Sp. Attack": number;
  "Sp. Defense": number;
  Speed: number;
}

export interface Name {
  english: string;
  japanese: string;
  chinese: string;
  french: string;
}
export type Fams =
  | "Bug"
  | "Dark"
  | "Dragon"
  | "Electric"
  | "Fairy"
  | "Fighting"
  | "Fire"
  | "Flying"
  | "Ghost"
  | "Grass"
  | "Ground"
  | "Ice"
  | "Normal"
  | "Poison"
  | "Psychic"
  | "Rock"
  | "Steel"
  | "Water";
