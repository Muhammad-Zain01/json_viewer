import JsonParser from "..";
import { useRef, useEffect, useState } from "react";

type ComponentProps = {
  isOpen: boolean;
  value: any;
  level: number;
  isArray: boolean;
  row: string;
  searchTerm?: string;
  showOnlyMatches?: boolean;
};

const JsonObjectValue: React.FC<ComponentProps> = ({
  isOpen,
  value,
  level,
  isArray,
  row,
  searchTerm = "",
  showOnlyMatches = false
}) => {
  // Simple rendering without animations
  return (
    <div className="cursor-pointer">
      {isOpen ? (
        <div>
          <JsonParser
            data={value}
            isArray={Array.isArray(value)}
            level={level + 1}
            parentId={row}
            searchTerm={searchTerm}
            showOnlyMatches={showOnlyMatches}
          />
        </div>
      ) : (
        <span>
          {isArray ? "[...]" : "{...}"} 
        </span>
      )}
    </div>
  );
};

export default JsonObjectValue;
