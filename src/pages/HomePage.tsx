import { Button } from "@mui/material";
import { loadList } from "../loaders/mainLoader";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useListData } from "../misc/contexts/listDataContext";
import { useTranslation } from "react-i18next";

const hiddenStyle = {
  clipPath: "rect(0 0 0 0)",
  height: 1,
  width: 1,
};

export const HomePage = () => {
  const [isLoading, setLoading] = useState(false);
  const [, setListData] = useListData();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const loadProcedure = async (file?: File) => {
    setLoading(true);
    const result = await loadList(file);
    if (result.success) {
      setListData(result.result);
      navigate("/list");
    } else {
      // todo show message on error
    }
  };

  return isLoading ? (
    <>Loading</>
  ) : (
    <div>
      <Button onClick={async () => loadProcedure()}>{t("home.new")}</Button>
      <Button component="label">
        {t("home.upload")}
        <input
          style={hiddenStyle}
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
    </div>
  );
};
