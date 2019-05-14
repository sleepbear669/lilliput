import React, {Component, Fragment} from 'react';
import './App.scss';
import {
    AppBar, Tabs, Tab, Table, TableBody, TableCell, TableHead, TableRow, Paper, TextField, Input, Button
} from '@material-ui/core';
import {withStyles, Theme, WithStyles, createStyles, MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import Account, {AccountLog} from './../model/Account';
import ShareValueStore from './../stores/ShareValueStore';

import {observer} from 'mobx-react';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            ...lightBlue,
            contrastText: '#ffffff',
        }
    }
});

const styles = ({palette, spacing}: Theme) => createStyles({
    app: {
        height: '100vh',
        backgroundColor: '#eeeeee',
    },
    tabContainer: {
        margin: spacing.unit,
        overflowY: 'auto'
    },
    indicator: {
        backgroundColor: 'white'
    },
    revenueValueContainer: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    revenueValueBox: {
        width: 100,
        textAlign: 'center',
        padding: '10px 0',
        margin: '10px auto',
        fontSize: 20
    },
    contentsBox: {
        padding: 10,
        fontSize: 20
    }
});


type Props = { classes: any } | WithStyles<typeof styles>;

type Assets = {
    private: Account
    first: Account
    second: Account
}

type State = {
    mainTab: string
    assetsTab: keyof Assets,
    assets: Assets
};

const lineValue = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200];

const shareValueStore = new ShareValueStore();

@observer
class App extends Component<Props, State> {
    state = {
        mainTab: 'assets',
        assetsTab: 'private' as keyof Assets,
        assets: {
            private: new Account('private', 30),
            first: new Account('first', 500),
            second: new Account('second', 0)
        }
    };

    handelTabChange = (name: 'mainTab' | 'assetsTab') => (event: any, value: any) => {
        this.setState({[name]: value} as Pick<State, any>);
    };

    renderLogRow = (accountLog: AccountLog) => {
        return <TableRow key={accountLog.id}>
            <TableCell align="left" padding="dense">
                <Input value={accountLog.import}
                       type="number"
                       onChange={this.onChange(accountLog, 'import')}
                       fullWidth
                />
            </TableCell>
            <TableCell align="left" padding="dense">
                <Input value={accountLog.export}
                       type="number"
                       onChange={this.onChange(accountLog, 'export')}
                       fullWidth
                />
            </TableCell>
            <TableCell align="left" padding="dense">
                {accountLog.balance}
            </TableCell>
        </TableRow>;
    };

    onChange = <T, V extends keyof T>(ref: T, key: V) => {
        return (e: any) => {
            ref[key] = e.target.value;
        };
    };

    render() {
        const {mainTab, assetsTab, assets} = this.state;
        const {classes} = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.app}>
                    <AppBar position="static">
                        <Tabs value={mainTab} classes={{indicator: classes.indicator}}
                              onChange={this.handelTabChange('mainTab')}>
                            <Tab label="자산" value={'assets'}/>
                            <Tab label="주식" value={'share'}/>
                        </Tabs>
                    </AppBar>
                    {
                        mainTab === 'assets' &&
                        <Paper className={classes.tabContainer}>

                            <Tabs value={assetsTab}
                                  indicatorColor="primary"
                                  textColor="primary"
                                  onChange={this.handelTabChange('assetsTab')}
                            >
                                <Tab label="Private" value={'private'}/>
                                <Tab label="First" value={'first'}/>
                                <Tab label="Second" value={'second'}/>
                            </Tabs>
                            <TextField
                                value={assets[assetsTab].seed}
                                label="초기자본"
                                margin="normal"
                                variant="outlined"
                                onChange={this.onChange(assets[assetsTab], 'seed')}
                            />
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left" padding="dense">수입</TableCell>
                                        <TableCell align="left" padding="dense">지출</TableCell>
                                        <TableCell align="left" padding="dense">잔액</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        assets[assetsTab].accountLogs
                                            .map(this.renderLogRow)
                                    }
                                </TableBody>
                            </Table>
                        </Paper>
                    }
                    {
                        mainTab === 'share' &&
                        <Paper className={classes.tabContainer}>
                            <div className={classes.contentsBox}>
                                Result :
                                {shareValueStore.shareValues
                                    .reduce((a, b) => a + b.value, 0)
                                }
                            </div>
                            <div className={classes.revenueValueContainer}>
                                {
                                    lineValue.map(v => {
                                        return <Button key={v}
                                                       variant="contained"
                                                       color="primary"
                                                       onClick={() => shareValueStore.addShareValue(v)}
                                                       className={classes.revenueValueBox}>+ {v}</Button>;
                                    })
                                }
                            </div>
                            <div className={classes.contentsBox}>
                                Calc :
                                {
                                    shareValueStore.shareValues
                                        .map((shaverValue, i) => {
                                            return <Fragment key={shaverValue.id}>
                                                {
                                                    i !== 0 &&
                                                    <span>+</span>
                                                }
                                                <Button
                                                    onClick={() => shareValueStore.removeShareValue(shaverValue)}
                                                >
                                                    {shaverValue.value}
                                                </Button>
                                            </Fragment>;
                                        })
                                }
                            </div>
                        </Paper>
                    }

                </div>
            </MuiThemeProvider>

        );
    }
}

export default withStyles(styles)(App);
