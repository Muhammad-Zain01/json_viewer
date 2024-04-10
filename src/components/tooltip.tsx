import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  TooltipContent,
  TooltipTrigger,
  Tooltip as STooltip,
} from "./ui/tooltip";

type ComponentProps = {
  children: React.ReactNode;
  text: React.ReactNode | string;
};
const Tooltip: React.FC<ComponentProps> = ({ children, text }) => {
  return (
    <TooltipProvider>
      <STooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>{text}</TooltipContent>
      </STooltip>
    </TooltipProvider>
  );
};

export default Tooltip;
