import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/Agency";
import { Grid, Paper, withStyles, List, ListItem, ListItemText, Typography, Divider, Button } from "@material-ui/core";
import AgencyForm from "./AgencyForm";
import ButterToast, { Cinnamon } from "butter-toast";
import { DeleteSweep } from "@material-ui/icons";

const styles = theme => ({
    paper: {
        margin: theme.spacing(3),
        padding: theme.spacing(2)
    },
    smMargin: { 
        margin: theme.spacing(1)
    },
    actionDiv: {
        textAlign: "center"
    }
})

const Agency = ({ classes, ...props }) => {
    //const {classes, ...props} = props
    const [currentId, setCurrentId] = useState(0)
    useEffect(() => {
        props.fetchAllAgencies()
    }, [])//DidMount

    const onDelete = id => {
        const onSuccess = () => {
            ButterToast.raise({
                content: <Cinnamon.Crisp title="Post Box"
                    content="Deleted successfully"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<DeleteSweep />}
                />
            })
        }
        if (window.confirm('Are you sure to delete this record?'))
            props.deletePostMessage(id,onSuccess)
    }


    return (
        <Grid container>
            <Grid item xs={5}>
                <Paper className={classes.paper}>
                    <AgencyForm {...{ currentId, setCurrentId }} />
                </Paper>
            </Grid>
            <Grid item xs={7}>
                <Paper className={classes.paper}>
                    <List>
                        {
                            props.AgencyList.map((record, index) => {
                                return (
                                    <Fragment key={index}>
                                        <ListItem>
                                            <ListItemText>
                                                <Typography variant="h5">
                                                {record.address}
                                                </Typography>
                                                <div>
                                                {record.wilaya} - {record.commune}
                                                </div>
                                                <div className={classes.actionDiv}>
                                                    <Button variant="contained" color="primary" size="small"
                                                        className={classes.smMargin}
                                                        onClick={() => setCurrentId(record._id)}>
                                                        Edit
                                                    </Button>
                                                    <Button variant="contained" color="secondary" size="small"
                                                        className={classes.smMargin}
                                                        onClick={() => onDelete(record._id)}>
                                                        Delete
                                                    </Button>
                                                </div>
                                            </ListItemText>
                                        </ListItem>
                                        <Divider component="li" />
                                    </Fragment>
                                )
                            })
                        }
                    </List>
                </Paper>
            </Grid>
        </Grid>
    );
}

const mapStateToProps = state => ({
    AgencyList: state.agency.list
})

const mapActionToProps = {
    fetchAllAgencies: actions.fetchAll,
    deletePostMessage: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Agency));
