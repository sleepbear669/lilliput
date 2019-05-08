import React, {PureComponent} from "react";
import "./App.scss";
import {
    AppBar, Tabs, Tab, Table, TableBody, TableCell, TableHead, TableRow, Paper
} from "@material-ui/core";
import {withStyles, Theme, WithStyles, createStyles} from "@material-ui/core/styles";


const styles = ({palette, spacing}: Theme) => createStyles({
    app: {
        height: "100vh",
        "backgroundColor": "#eeeeee",
    },
    tabContainer: {
        "margin": spacing.unit,
        "overflowY" : "auto"
    },
});

type Props = { classes: any } | WithStyles<typeof styles>;
type State = {
    value: string
};

class App extends PureComponent<Props, State> {
    state = {
        value: "assets",
    };
    handleChange = (event: any, value: any) => {
        this.setState({value});
    };

    render() {
        const {classes} = this.props;
        const {value} = this.state;

        return (
            <div className={classes.app}>
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab label="자산" value={"assets"}/>
                        <Tab label="주신" value={"share"}/>
                    </Tabs>
                </AppBar>
                <Paper className={classes.tabContainer}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Player</TableCell>
                                <TableCell align="right">Calories</TableCell>
                                <TableCell align="right">Fat (g)</TableCell>
                                <TableCell align="right">Carbs (g)</TableCell>
                                <TableCell align="right">Protein (g)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(App);
