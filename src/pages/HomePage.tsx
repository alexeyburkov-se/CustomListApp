import { Button } from "@mui/material";
import { loadList } from "../loaders/mainLoader";
import { useState } from "react";
import { useNavigate } from "react-router";

export const HomePage = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadProcedure = async (file?: File) => {
    setLoading(true);
    const result = await loadList(file);
    if (result.success) {
      navigate("/list", { state: { listData: result.result } });
      // todo probably set loading false
    } else {
      // todo show message on error
    }
  };

  return isLoading ? (
    <>Loading</>
  ) : (
    <>
      <Button onClick={async () => loadProcedure()}>New</Button>
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
