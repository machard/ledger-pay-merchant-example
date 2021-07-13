import React, { useContext } from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { context as modalsContext } from "../providers/modals";

const styles = (theme: Theme) =>
  createStyles({});

interface Props extends WithStyles<typeof styles> {}

function Placeholder(props: Props) {
  const modals = useContext(modalsContext);

  const Modal = modals.Component;
  if (!Modal) {
    return null;
  }

  return <modals.Component {...modals.props} />
}

export default withStyles(styles)(Placeholder);
