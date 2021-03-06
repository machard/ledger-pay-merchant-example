import React from 'react';
import {
  createMuiTheme,
  createStyles,
  ThemeProvider,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Placeholder from "./modals/Placeholder";
import ModalsProvider, { setModal } from "./providers/modals";
import { Button } from '@material-ui/core';
import LedgerPay from './modals/LedgerPay';

let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#18202c',
      },
    },
    MuiButton: {
      label: {
        textTransform: 'none',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        margin: '0 16px',
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854',
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
};

const drawerWidth = 256;

const styles = createStyles({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginTop: 200,
    alignItems: 'center'
  },
});

export interface PaperbaseProps extends WithStyles<typeof styles> {}

function Paperbase(props: PaperbaseProps) {
  const { classes } = props;

  const Providers = [
    {
      Provider: ThemeProvider,
      args: { theme }
    },
    {
      Provider: ModalsProvider,
      args: {}
    }
  ].reduce((Provider, provider) => ({ children }) => (
    Provider({
      children: [
        // @ts-ignore
        provider.Provider({ ...provider.args,  children})
      ]
    })
  ), ({ children }: any) => children);

  return (
    <Providers>
      <div className={classes.root}>
        <CssBaseline />
        <div className={classes.app}>
          <Button variant="contained" color="primary" onClick={() => {
            setModal(LedgerPay, {
              amount: 0.01,
              dest: process.env.REACT_APP_DEST_ADDRESS
            })
          }}>
            PAY 0.01 ETH with Ledger Pay
          </Button>
        </div>
      </div>
      <Placeholder />
    </Providers>
  );
}

export default withStyles(styles)(Paperbase);
