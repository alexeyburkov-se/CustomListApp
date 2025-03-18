import { Paper, styled } from "@mui/material";
import {
  DOMAttributes,
  PointerEventHandler,
  PropsWithChildren,
  useRef,
  useState,
} from "react";

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
  animationDurationMS: number;
  animationEndDurationMS: number;
}

const AnimatedCircleProgress = ({
  data,
  onAnimationEnd,
  animationDurationMS,
  animationEndDurationMS,
}: AnimatedCircleProgressProps) => {
  const whenChangeAnimation =
    (
      (100 * animationDurationMS) /
      (animationDurationMS + animationEndDurationMS)
    ).toFixed(1) + "%";

  return (
    <CircleProgress
      sx={
        data && {
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
            [whenChangeAnimation]: {
              width: `${data.w}px`,
              paddingBottom: `${data.w}px`,
              opacity: "1",
            },
            "100%": {
              width: `${data.w}px`,
              paddingBottom: `${data.w}px`,
              opacity: "0",
            },
          },
          top: data.y,
          left: data.x,
          animation: `grabbing ${animationDurationMS + animationEndDurationMS}ms linear`,
        }
      }
      onAnimationEnd={onAnimationEnd}
    />
  );
};

export type ListItemPaperProps = PropsWithChildren<{
  isDragging: boolean;
  isDragMode: boolean;
  animationDurationMS: number;
  animationEndDurationMS: number;
}>;

export const ListItemPaper = ({
  children,
  isDragging,
  isDragMode,
  ...animationDurations
}: ListItemPaperProps) => {
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

  const listeners: DOMAttributes<HTMLDivElement> | undefined = isDragMode
    ? {
        onPointerDown: handleAnimationInit,
        onMouseUp: handleAnimationEnd,
        onTouchEnd: handleAnimationEnd, //todo improve handling in case pointer leaves element while holding
      }
    : undefined;

  return (
    <Paper
      ref={paperRef}
      elevation={3}
      sx={[
        isDragging && {
          transform: "scale(1.03, 1.03)",
          transition: `transform ${animationDurations.animationEndDurationMS}ms`,
        },
        {
          position: "relative",
          overflow: "hidden",
        },
      ]}
      {...listeners}
    >
      <AnimatedCircleProgress
        {...animationDurations}
        data={animationData}
        onAnimationEnd={handleAnimationEnd}
      />
      {children}
    </Paper>
  );
};
