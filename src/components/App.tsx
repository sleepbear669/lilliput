import React, {PureComponent} from "react";
import "./App.scss";
import {
    AppBar, Tabs, Tab, Table, TableBody, TableCell, TableHead, TableRow, Paper, TextField
} from "@material-ui/core";
import {withStyles, Theme, WithStyles, createStyles, MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import lightBlue from "@material-ui/core/colors/lightBlue";

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            ...lightBlue,
            contrastText: "#ffffff",
        }
    },
});

const styles = ({palette, spacing}: Theme) => createStyles({
    app: {
        height: "100vh",
        "backgroundColor": "#eeeeee",
    },
    tabContainer: {
        "margin": spacing.unit,
        "overflowY": "auto"
    },
    indicator: {
        "backgroundColor": "white"
    }
});

class AccountLog {
    _import: number = undefined;
    _export: number = undefined;
    _balance: number = undefined;

    get import() {
        return this._import;
    }

    set import(value: number) {
        this._import = value;
    }

    get export() {
        return this._import;
    }

    set export(value: number) {
        this._export = value;
    }

    get balance() {
        return this._export === undefined && this._import === undefined ? undefined : this._balance;
    }
}

class Account {
    private _seed: number;
    private _accountLogs: AccountLog[] = new Array<AccountLog>(10);

    constructor(seed: number) {
        this._seed = seed;
    }
}

type Props = { classes: any } | WithStyles<typeof styles>;
type State = {
    mainTab: string
    assetsTab: string
};

class App extends PureComponent<Props, State> {
    state = {
        mainTab: "assets",
        assetsTab: "player",
    };

    handelTabChange = (name: "mainTab" | "assetsTab") => (event: any, value: any) => {
        this.setState({[name]: value} as Pick<State, any>);
    };

    renderLogRow = (accountLog: AccountLog) => {
        return <TableRow>
            <TableCell align="left" padding={"dense"}>
                <TextField value={accountLog.import}
                           fullWidth
                />
            </TableCell>
            <TableCell align="left" padding={"dense"}>
                <TextField value={accountLog.export}
                           fullWidth
                />
            </TableCell>
            <TableCell align="left" padding={"dense"}>
                <TextField value={accountLog.balance}
                           fullWidth
                />
            </TableCell>
        </TableRow>;
    };

    render() {
        const {mainTab, assetsTab} = this.state;
        const {classes} = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.app}>
                    <AppBar position="static">
                        <Tabs value={mainTab} classes={{indicator: classes.indicator}}
                              onChange={this.handelTabChange("mainTab")}>
                            <Tab label="자산" value={"assets"}/>
                            <Tab label="주식" value={"share"}/>
                        </Tabs>
                    </AppBar>
                    <Paper className={classes.tabContainer}>
                        <Tabs value={assetsTab}
                              indicatorColor="primary"
                              textColor="primary"
                              onChange={this.handelTabChange("assetsTab")}
                        >
                            <Tab label="Player" value={"player"}/>
                            <Tab label="First" value={"first"}/>
                            <Tab label="Second" value={"second"}/>
                        </Tabs>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" padding={"dense"}>수입</TableCell>
                                    <TableCell align="left" padding={"dense"}>지출</TableCell>
                                    <TableCell align="left" padding={"dense"}>합계</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="left" padding={"dense"}>
                                        <TextField value={0}
                                                   fullWidth
                                        />
                                    </TableCell>
                                    <TableCell align="left" padding={"dense"}>
                                        <TextField value={undefined}
                                                   fullWidth
                                        />
                                    </TableCell>
                                    <TableCell align="left" padding={"dense"}>
                                        <TextField value={0}
                                                   fullWidth
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            </MuiThemeProvider>

        );
    }
}

export default withStyles(styles)(App);
