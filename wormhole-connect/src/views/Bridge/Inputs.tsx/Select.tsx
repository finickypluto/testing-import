import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { Icon } from '../../../config/types';
import TokenIcon from '../../../icons/TokenIcons';
import Input from './Input';

const useStyles = makeStyles()((theme) => ({
  select: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
}));

type Selected = {
  icon: Icon;
  text: string;
};

type Props = {
  label: string;
  selected: Selected | undefined;
  error?: boolean;
  editable?: boolean;
  onClick?: any;
};

function Select(props: Props) {
  const { classes } = useStyles();

  return (
    <Input
      label={props.label}
      error={props.error}
      editable={props.editable}
      onClick={props.onClick}
    >
      {props.selected ? (
        <div className={classes.select}>
          <TokenIcon name={props.selected.icon} height={24} />
          {props.selected.text}
        </div>
      ) : (
        <div className={classes.select}>
          <TokenIcon height={24} />
          Select
        </div>
      )}
    </Input>
  );
}

export default Select;