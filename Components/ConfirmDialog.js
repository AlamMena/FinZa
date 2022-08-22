import { Button, Dialog } from "@mui/material";

export default function ConfirmDialog(props) {
  const { title, description, type, open, onConfirm, onCancel } = props;

  return (
    <Dialog open={open}>
      <div className="p-6 flex flex-col space-y-2">
        <span className="text-center">{title}</span>
        <span className="text-center">{description}</span>
        <div className="flex ">
          <Button className="text-purple-600" onClick={onConfirm}>
            Ok
          </Button>
          <Button className="text-red-600" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
