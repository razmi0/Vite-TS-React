export type DataType = {
  id: number;
  name: string;
  type: string[];
};

export type DataTypes = DataType[];


export type HasName = {
    name: string
}

export type KeyOfDataType = keyof DataType;

export type KeyOf<P> = keyof P;
