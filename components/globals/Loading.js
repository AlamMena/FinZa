import { Backdrop, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Backdrop
      sx={{ color: "#0000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <CircularProgress className="text-blue-100" />
    </Backdrop>
  );
}
