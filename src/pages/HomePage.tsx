import { Button } from "@mui/material";
import { loadList } from "../listLoaders/listLoader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  return isLoading ? (
    <>Loading</>
  ) : (
    <>
      <Button>New</Button>
      <Button component="label">
        Load
        <input
          type="file"
          onChange={async (event) => {
            if (!event.target.files || event.target.files.length == 0) {
              return;
              // todo show message
            }
            setLoading(true);
            const result = await loadList(event.target.files[0]);
            if (result.success) {
              navigate(`/lists/${result.result}`);
            } else {
              // todo show message on error
            }
          }}
        />
      </Button>
    </>
  );
};
