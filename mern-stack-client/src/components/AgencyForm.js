import React, { useEffect, useState } from "react";
import { TextField, withStyles, Button } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/Agency";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@material-ui/icons";

const initialFieldValues = {
    nom: "",
    address: "",
    wilaya: "",
    commune: "",
    phone: ""
}

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1)
        },
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    postBtn: {
        width: "50%"
    }
})

const AgencyForm = ({ classes, ...props }) => {

    useEffect(() => {
        if (props.currentId != 0){
            setValues({
                ...props.AgencyList.find(x => x._id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    const validate = () => {
        let temp = { ...errors }
        temp.title   = values.title ? "" : "This field is required."
        temp.commune = values.commune ? "" : "This field is required."
        temp.wilaya  = values.wilaya ? "" : "This field is required."
        temp.address = values.address ? "" : "This field is required."
        temp.phone   = values.phone ? "" : "This field is required."
        temp.nom     = values.nom ? "" : "This field is required."
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x == "")
    }

    var {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues,props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault()
        if (props.currentId == 0){
            props.createAgency(values)
            resetForm()
        }else{
            props.updateAgency(props.currentId, values)
        }

    }

    return (
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
            onSubmit={handleSubmit}>
            <TextField
                name="nom"
                variant="outlined"
                label="Name"
                fullWidth
                value={values.nom}
                onChange={handleInputChange}
                {...(errors.nom && { error: true, helperText: errors.nom })}
            />
            <TextField
                name="address"
                variant="outlined"
                label="Address "
                fullWidth
                multiline
                rows={4}
                value={values.address}
                onChange={handleInputChange}
                {...(errors.address && { error: true, helperText: errors.address })}
            />


            <TextField
                name="wilaya"
                variant="outlined"
                label="wilaya "
                fullWidth
                multiline
                rows={4}
                value={values.wilaya}
                onChange={handleInputChange}
                {...(errors.wilaya && { error: true, helperText: errors.wilaya })}
            />



            <TextField
                name="phone"
                variant="outlined"
                label="phone "
                fullWidth
                multiline
                rows={4}
                value={values.phone}
                onChange={handleInputChange}
                {...(errors.phone && { error: true, helperText: errors.phone })}
            />

            <TextField
                name="commune"
                variant="outlined"
                label="commune "
                fullWidth
                multiline
                rows={4}
                value={values.commune}
                onChange={handleInputChange}
                {...(errors.commune && { error: true, helperText: errors.commune })}
            />

            <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                className={classes.postBtn}
            >Submit</Button>
        </form>
    );
}


const mapStateToProps = state => ({
    AgencyList: []
})

const mapActionToProps = {
    createAgency: actions.create,
    updateAgency: actions.update
}


export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(AgencyForm));