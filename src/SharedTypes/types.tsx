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
};

export type DataTypes = DataType[];


export type HasName = {
    name: string
}

export type KeyOfDataType = keyof DataType;

export type KeyOf<P> = keyof P;

export type SortsTypes = KeyOfDataType[];


// QUICK TYPES 
//

export interface Data {
  id:   number;
  name: Name;
  type: Type[];
  base: Base;
}

export interface Base {
  HP:            number;
  Attack:        number;
  Defense:       number;
  "Sp. Attack":  number;
  "Sp. Defense": number;
  Speed:         number;
}

export interface Name {
  english:  string;
  japanese: string;
  chinese:  string;
  french:   string;
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
