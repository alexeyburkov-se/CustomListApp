import { Button } from "@mui/material";
import { loadList } from "../loaders/loaders";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadProcedure = async (file: File | null) => {
    setLoading(true);
    const result = await loadList(file);
    if (result.success) {
      navigate(`/lists/${result.result}`);
    } else {
      // todo show message on error
    }
  };

  return isLoading ? (
    <>Loading</>
  ) : (
    <>
      <Button onClick={async () => loadProcedure(null)}>New</Button>
      <Button component="label">
        Load
        <input
          type="file"
          onChange={async (event) => {
            if (!event.target.files || event.target.files.length == 0) {
              return;
              // todo show message
            }
            return loadProcedure(event.target.files[0]);
          }}
        />
      </Button>
    </>
  );
};
