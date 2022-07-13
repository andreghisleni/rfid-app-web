import React from 'react';

import { MdAddCircle } from 'react-icons/md';
import { IconType } from 'react-icons';

import { MdDeleteSweep, MdModeEdit } from 'react-icons/md';

import { v4 as uuid } from 'uuid';
import { Container, ButtonContent } from './styles';
import Icon from '../Icon';

interface LabelProps {
  name: string[];
  width?: number;
  operator?: boolean;
}
interface ItensProps {
  name: string[];
  type?: 'button';
  operator?: boolean;
}
interface ButtonProos {
  icon?: IconType;
  func: (id: string, data?: any) => void;
  label?: string;
  color?: string;
}
interface TableProps {
  title: string;
  label: LabelProps[];
  itens: ItensProps[];
  keyTable: string;
  buttons?: {
    edit?: (id: string, data?: any) => void;
    delete?: (id: string) => void;
    others?: {
      [key: string]: ButtonProos;
    };
  };
  type?: {
    [key: string]: 'string' | 'number' | 'image';
  };
  data: {
    [key: string]: string | number | TableProps['data'];
  }[];
  addFunction?: () => void;
}
const Table: React.FC<TableProps> = ({
  label,
  itens,
  data,
  title,
  addFunction,
  buttons,
  keyTable,
}) => {
  return (
    <Container>
      <header>
        <h1>{title}</h1>

        {addFunction && (
          <button type="button" onClick={() => addFunction()}>
            <MdAddCircle />
            Adicionar
          </button>
        )}
        {!addFunction && <div />}
      </header>
      <table>
        <thead>
          <tr>
            {label.map(l => (
              <th
                key={`${l.name}+${uuid()}`}
                style={
                  l.width
                    ? ({ width: `${l.width}px` } as React.CSSProperties)
                    : ({} as React.CSSProperties)
                }
              >
                {l.name.length === 1 && <p>{l.name[0]}</p>}
                {l.name.length !== 1 &&
                  l.name.map(name => <p key={name}>{name}</p>)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map(d => (
            <tr key={`${d[keyTable]}`}>
              {itens.map(i => (
                <td key={`${i.name}+${uuid()}`}>
                  {!i.operator && i.name.length === 1 && <p>{d[i.name[0]]}</p>}
                  {!i.operator &&
                    i.name.length !== 1 &&
                    i.name.map(name => (
                      <p key={`${d[name]}+${uuid()}`}>{d[name]}</p>
                    ))}

                  {i.operator && buttons && (
                    <ButtonContent>
                      {buttons.edit && (
                        <button
                          type="button"
                          className="edit"
                          onClick={() => {
                            buttons.edit && buttons.edit(`${d[keyTable]}`, d);
                          }}
                        >
                          <MdModeEdit />
                        </button>
                      )}
                      {buttons.delete && (
                        <button
                          type="button"
                          className="delete"
                          onClick={() => {
                            buttons.delete && buttons.delete(`${d[keyTable]}`);
                          }}
                        >
                          <MdDeleteSweep />
                        </button>
                      )}
                    </ButtonContent>
                  )}
                  {i.type === 'button' &&
                    buttons &&
                    buttons.others &&
                    buttons.others[i.name[0]] && (
                      <ButtonContent>
                        <button
                          type="button"
                          className="other"
                          style={{
                            background:
                              buttons.others[i.name[0]].color || '#6c757d',
                          }}
                          onClick={() => {
                            buttons &&
                              buttons.others &&
                              buttons.others[i.name[0]] &&
                              buttons.others[i.name[0]].func(
                                `${d[keyTable]}`,
                                d,
                              );
                          }}
                        >
                          {buttons.others[i.name[0]].icon && (
                            <Icon icon={buttons.others[i.name[0]].icon} />
                          )}
                          {buttons.others[i.name[0]].label && (
                            <p>{buttons.others[i.name[0]].label}</p>
                          )}
                        </button>
                      </ButtonContent>
                    )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default Table;
