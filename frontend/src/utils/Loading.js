import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from "@mui/system";
import React from 'react'

const Loading = () => {

    const DisabledBackground = styled(Box)({
        width: "100%",
        height: "110%",
        position: "fixed",
        background: "#ccc",
        opacity: 0.5,
        zIndex: 1
    });

    const CircularLoading = () => (
        <>
            <CircularProgress
                size={70}
                sx={{
                    position: "fixed",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 2
                }}
            />
            <DisabledBackground />
        </>
    );


    return (
        <>
        <CircularLoading />
        </>
    )
}

export default Loading;