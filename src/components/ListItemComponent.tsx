import { Control, useFieldArray } from "react-hook-form";
import { ListType } from "../loaders/mainLoader";
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { PointerEventHandler, useRef, useState } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";
import { ItemPropertyComponent } from "./ItemPropertyComponent";
import { useDraggable } from "@dnd-kit/core";
import { itemDragActivationDelayMS } from "./ListGeneralComponent";
// todo add darkening of content
// todo add hover animation for collapse
// todo sync transition times

const CircleProgress = styled("span")({
  position: "absolute",
  transform: "translate(-50%, -50%)",
  width: 0,
  height: 0,
  borderRadius: "50%",
  background: "rgba(221, 0, 122, 0.73)", //todo figure out better color and according to theme
});

interface AnimationDataType {
  x: number;
  y: number;
  w: number;
}

interface AnimatedCircleProgressProps {
  data: AnimationDataType | null;
  onAnimationEnd: () => void;
}

const AnimatedCircleProgress = ({
  data,
  onAnimationEnd,
}: AnimatedCircleProgressProps) => {
  return (
    <CircleProgress
      sx={[
        {
          "@keyframes grabbing": {
            "0%": {
              width: "0",
              paddingBottom: "0",
              opacity: "1",
            },
            "15%": {
              width: "0",
              paddingBottom: "0",
              opacity: "1",
            },
            "62.5%": {
              width: `${data?.w}px`,
              paddingBottom: `${data?.w}px`,
              opacity: "1",
            },
            "100%": {
              width: `${data?.w}px`,
              paddingBottom: `${data?.w}px`,
              opacity: "0",
            },
          },
          top: data?.y,
          left: data?.x,
        },
        data && {
          animation: `grabbing ${itemDragActivationDelayMS * 1.6}ms linear`,
        },
      ]}
      onAnimationEnd={onAnimationEnd}
    />
  );
};

export interface ListItemComponentProps {
  itemIndex: number;
  control: Control<ListType>;
  zIndex: number;
}

export const ListItemComponent = ({
  itemIndex,
  control,
  zIndex,
}: ListItemComponentProps) => {
  const [expanded, setExpanded] = useState(false);
  const [animationData, setAnimationData] = useState<AnimationDataType | null>(
    null,
  );
  const paperRef = useRef<HTMLDivElement>(null);

  const handleAnimationInit: PointerEventHandler<HTMLDivElement> = (event) => {
    const localX = event.pageX - (paperRef.current?.offsetLeft ?? 0);
    const localY = event.pageY - (paperRef.current?.offsetTop ?? 0);
    const remainingX = (paperRef.current?.clientWidth ?? 0) - localX;
    const remainingY = (paperRef.current?.clientHeight ?? 0) - localY;
    setAnimationData({
      x: localX,
      y: localY,
      w: 2.05 * Math.max(localX, localY, remainingX, remainingY),
    });
  };

  const handleAnimationEnd = () => setAnimationData(null);

  const { fields } = useFieldArray({
    name: `main.${itemIndex}.properties`,
    control,
  });

  const { listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `listItem${itemIndex}`,
    data: {
      type: "listItem",
      index: itemIndex,
    },
  });

  return (
    <Box
      ref={setNodeRef}
      {...listeners}
      sx={[
        {
          touchAction: "manipulation",
          zIndex: zIndex + (isDragging ? 1 : 0),
        },
        transform && {
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        },
      ]}
    >
      <Paper
        ref={paperRef}
        elevation={3}
        sx={[
          isDragging && {
            transform: "scale(1.03, 1.03)",
            transition: "transform 300ms",
          },
          {
            position: "relative",
            overflow: "hidden",
          },
        ]}
        onPointerDown={handleAnimationInit}
        onMouseUp={handleAnimationEnd}
        onClick={() => !expanded && setExpanded(true)}
        onTouchEnd={handleAnimationEnd} //todo improve handling in case pointer leaves element while holding
      >
        <AnimatedCircleProgress
          data={animationData}
          onAnimationEnd={handleAnimationEnd}
        />
        <Collapse in={expanded} collapsedSize={"3em"}>
          <Stack spacing={1}>
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ flex: 1 }}>Title</Typography>
              <IconButton onClick={() => expanded && setExpanded(false)}>
                <KeyboardArrowDown
                  sx={[
                    {
                      transition: "0.3s",
                    },
                    expanded
                      ? {
                          transform: "rotate(180deg)",
                          opacity: 1,
                        }
                      : {
                          transform: "rotate(0)",
                          opacity: 0,
                        },
                  ]}
                />
              </IconButton>
            </Box>
            {fields.map((field, index) => (
              <ItemPropertyComponent
                key={field.id}
                name={`main.${itemIndex}.properties.${index}`}
                control={control}
              />
            ))}
          </Stack>
        </Collapse>
      </Paper>
    </Box>
  );
};
