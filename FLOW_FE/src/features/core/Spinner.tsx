import { CircularProgress, Box } from "@mui/material";

const Spinner = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            width="100%"
        >
            <CircularProgress />
        </Box>
    );
};

export default Spinner;
