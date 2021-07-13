import React, { useMemo } from 'react'
import LWEngine from 'ledger-web-engine-react'
import { DialogContent, DialogTitle } from '../components/Dialog'
import { Dialog } from '@material-ui/core'
import {
  createStyles,
  // eslint-disable-next-line no-unused-vars
  Theme,
  withStyles,
  // eslint-disable-next-line no-unused-vars
  WithStyles
} from '@material-ui/core/styles'
import { WindowPostMessageStream } from '@metamask/post-message-stream'
import { setModal } from '../providers/modals'

const styles = (_theme: Theme) => createStyles({
  engine: {
    borderWidth: 0,
    width: 300,
    height: 300,
  }
});

interface Props extends WithStyles<typeof styles> {
  amount: number,
  dest: string,
}

function RequireDeviceAction(props: Props) {
  const { classes, amount, dest } = props;

  const api = useMemo(() => async (stream: WindowPostMessageStream, data: any) => {
    console.log("merchant api request", data);
  
    switch (data.type + "/" + data.method) {
      case "pay/data":
        stream.write({
          id: data.id,
          res: {
            amount,
            dest
          }
        });
        break
    }
  }, [amount, dest]);
  
  return (
    <Dialog onClose={() => setModal()} aria-labelledby='customized-dialog-title' open>
      <DialogTitle id='customized-dialog-title'>
        Ledger Pay
      </DialogTitle>
      <DialogContent dividers>
        <LWEngine
          key="engine"
          app={process.env.REACT_APP_LEDGER_PAY || ''}
          extraApi={api}
          rootClass={classes.engine}
        />
      </DialogContent>
    </Dialog>
  )
}

export default withStyles(styles)(RequireDeviceAction)
