
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from 'react'
function DialogBarComponent(props) {
    const handleClose = () => {
        props.setOpen(false);
    };
    const handleClickOpen = () => {
        props.setOpen(true);
    };
    return (
        <>
            <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`"${props.fileName}" faylını silmək istədiyinizdən əminsinizmi`}
                </DialogTitle>
                {/* <DialogContent></DialogContent> */}
                <DialogActions>
                    <Button onClick={handleClose}>Ləğv et</Button>
                    <Button onClick={props.handleFileDelete} autoFocus>
                        Razı
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DialogBarComponent