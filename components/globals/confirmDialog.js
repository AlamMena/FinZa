import { Button, Dialog } from "@mui/material";

export default function ConfirmDialog(props) {
  const { title, description, type, open, onConfirm, onCancel } = props;

  return (
    <Dialog open={open}>
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col px-6 pt-8">
          <span className="text-center flex items-center">
            {" "}
            {/* <BsExclamationDiamondFill className="text-gray-800 mr-1" /> */}
            {title}
          </span>
          <span className="text-center">{description}</span>
        </div>
        <div className="flex w-full justify-end space-x-2 p-6">
          <Button className="text-black" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={onConfirm}
            className="bg-purple-600 capitalize rounded-2xl hover:bg-black"
          >
            Delete
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
