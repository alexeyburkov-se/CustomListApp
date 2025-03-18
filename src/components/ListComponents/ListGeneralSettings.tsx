import { KeyboardArrowUp } from "@mui/icons-material";
import { Stack, Button, Collapse, Paper } from "@mui/material";
import { useRef, useState } from "react";

export const ListGeneralSettings = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const collapseRef = useRef<HTMLElement>(null);

  const [arrowDuration, setArrowDuration] = useState("0.3s");

  const updateDuration = () => {
    setArrowDuration(collapseRef.current?.style.transitionDuration ?? "0.3s");
  };

  return (
    <Paper elevation={1}>
      <Stack>
        <Button onClick={() => setSettingsOpen((prev) => !prev)}>
          General settings{/* todo add shift so that label is centered but not with icon*/}
          <KeyboardArrowUp
            sx={[
              { transition: arrowDuration },
              settingsOpen
                ? {
                    transform: "rotate(0)",
                  }
                : {
                    transform: "rotate(-180deg)",
                    opacity: 0,
                  },
            ]}
          />
        </Button>
        <Collapse
          in={settingsOpen}
          timeout="auto"
          ref={collapseRef}
          onEntering={updateDuration}
          onExiting={updateDuration}
        >
          No settings yet
        </Collapse>
      </Stack>
    </Paper>
  );
};
