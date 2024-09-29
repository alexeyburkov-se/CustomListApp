import { Button } from "@mui/material";
import { loadList } from "../listLoaders/kistLoader";

export const HomePage = () => {
  return (
    <>
      <Button>New</Button>
      <Button component="label">
        Load
        <input
          type="file"
          onChange={async (event) => {
            if (!event.target.files || event.target.files.length != 1) {
              return;
            }
            const result = await loadList(event.target.files[0]);
            // todo show error on mistake, or redirect on success
          }}
        />
      </Button>
    </>
  );
};
