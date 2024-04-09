import { Edit, Trash, ViewIcon } from "lucide-react";
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
  const { setSelectedRow, selectedRow, setActionModal } = useApp();

  const ContextObj = [
    {
      label: "View",
      icon: <ViewIcon size={13} className="mx-1 mr-2" />,
      action: () => setActionModal({ type: "view", show: true, id }),
    },
    {
      label: "Edit",
      icon: <Edit size={13} className="mx-1 mr-2" />,
      action: () => setActionModal({ type: "edit", show: true, id }),
    },
    {
      label: "Delete",
      icon: <Trash size={13} className="mx-1 mr-2" />,
      action: () =>
        setActionModal({ type: "delete", show: true, id: selectedRow }),
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
