import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <div className="w-full flex justify-center py-16">
      <CircularProgress />
    </div>
  );
}
