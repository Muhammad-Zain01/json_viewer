import { useMemo } from "react";
import useData from "../hooks/useData";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

const JsonBreadCrumb = () => {
  const data = useData();
  const breadItems = useMemo(() => {
    const seenIds = new Set();
    const UniqueKeys =
      Array.isArray(data?.openKeys) &&
      data.openKeys.filter((item) => {
        if (!seenIds.has(item.id)) {
          seenIds.add(item.id);
          return true;
        }
        return false;
      });

    // @ts-ignore
    const FinalKeys = UniqueKeys.sort((a, b) => {
      const item1 = a?.id?.split("-")[1];
      const item2 = b?.id?.split("-")[1];
      return Number(item1) - Number(item2);
    });

    return ["root", ...FinalKeys.map((item) => item.label)] ?? ["root"];
    // @ts-ignore
  }, [data.openKeys]);

  return (
    <div className="tw-mb-3 tw-text-xs tw-m-1">
      <Breadcrumb>
        <BreadcrumbList>
          {breadItems.map((item, idx) => {
            return (
              <>
                <BreadcrumbItem key={idx}>
                  <BreadcrumbPage className="tw-text-xs tw-cursor-pointer">
                    {item}
                  </BreadcrumbPage>
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      asdf
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem>Documentation</DropdownMenuItem>
                      <DropdownMenuItem>Themes</DropdownMenuItem>
                      <DropdownMenuItem>GitHub</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BreadcrumbItem>
                {!(idx == breadItems.length - 1) && <BreadcrumbSeparator />}
              </>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
export default JsonBreadCrumb;
