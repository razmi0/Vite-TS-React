import { ReactNode } from "react";

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

export type SortsTypes = KeyOfDataType[];

export type CheckedTypes =
  | {
      type: string;
      isChecked: boolean;
    }[]
  | undefined;

export interface TableProps {
  heading?: string;
  data: DataTypes;
  children?: ReactNode;
  sorts: SortsTypes;
  isAsc?: boolean;
  colors?: string[];
}

// QUICK TYPES
//

export interface Data {
  id: number;
  name: Name;
  type: Type[];
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

export enum Type {
  Bug = "Bug",
  Dark = "Dark",
  Dragon = "Dragon",
  Electric = "Electric",
  Fairy = "Fairy",
  Fighting = "Fighting",
  Fire = "Fire",
  Flying = "Flying",
  Ghost = "Ghost",
  Grass = "Grass",
  Ground = "Ground",
  Ice = "Ice",
  Normal = "Normal",
  Poison = "Poison",
  Psychic = "Psychic",
  Rock = "Rock",
  Steel = "Steel",
  Water = "Water",
}
