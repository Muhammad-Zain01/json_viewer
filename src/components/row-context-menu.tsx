import { Edit, Trash } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { useApp } from "../context/app-context";

const RowContextMenu: React.FC<{ children: React.ReactNode; id: string }> = ({
  children,
  id,
}) => {
  const { setSelectedRow } = useApp();
  const onDelete = () => {
    console.log("dlete", id);
  };

  const ContextObj = [
    {
      label: "Delete",
      icon: <Trash size={13} className="tw-mx-1 tw-mr-2" />,
      action: onDelete,
    },
    {
      label: "Edit",
      icon: <Edit size={13} className="tw-mx-1 tw-mr-2" />,
      action: onDelete,
    },
  ];
  return (
    <ContextMenu
      onOpenChange={(e) => {
        e ? setSelectedRow(id) : setSelectedRow("");
      }}
    >
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        {ContextObj.map((item, idx) => {
          return (
            <ContextMenuItem key={idx} onClick={item.action}>
              {item.icon}
              {item.label}
            </ContextMenuItem>
          );
        })}
      </ContextMenuContent>
    </ContextMenu>
  );
};
export default RowContextMenu;
