import React from 'react';
import { Column } from './Column';
import { Row } from './Row';
import { ViewStyle } from 'react-native';

type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift';
type FixedLengthArray<T, L extends number, TObj = [T, ...Array<T>]> = Pick<
  TObj,
  Exclude<keyof TObj, ArrayLengthMutationKeys>
> & {
  readonly length: L;
  [I: number]: T;
  [Symbol.iterator]: () => IterableIterator<T>;
};

export type TableUIType<Rows extends number, Columns extends number> = {
  attributes: {
    weigth?: FixedLengthArray<number, Rows>;
    rowStyle?: ViewStyle;
    columnStyle?: ViewStyle;
    nthColumnStyle?: FixedLengthArray<ViewStyle | null, Columns>;
  };
  content: FixedLengthArray<
    FixedLengthArray<React.FC | React.ReactNode | React.ReactNodeArray, Rows>,
    Columns
  >;
};

export const Table: React.FC<{ data: TableUIType<number, number> }> = ({ data }) => (
  <>
    {data.content.map((row, i) => (
      <Row key={i} style={[data.attributes?.rowStyle]}>
        {row.map((rowItem, o) => (
          <Column
            key={o}
            style={[
              data.attributes?.columnStyle,
              data.attributes?.nthColumnStyle && data.attributes?.nthColumnStyle[i],
              {
                flex: (data.attributes && data.attributes.weigth && data.attributes.weigth[o]) || 1,
              },
            ]}
          >
            {rowItem}
          </Column>
        ))}
      </Row>
    ))}
  </>
);
