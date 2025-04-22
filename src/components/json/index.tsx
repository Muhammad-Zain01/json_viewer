import { getValueType } from "@/lib/utils";
import KeyValueRender from "./components/key-value-render";

const JsonParser: React.FC<{
  data: any;
  isArray: boolean;
  level: number;
  parentId: number | string;
  searchTerm?: string;
  showOnlyMatches?: boolean;
}> = ({ data, isArray, level, parentId, searchTerm = "", showOnlyMatches = false }) => {
  const DataType = getValueType(data);
  
  // Helper function to check if an item or its children match the search term
  const itemMatchesSearch = (item: any, key?: string | number): boolean => {
    if (!searchTerm) return true;
    
    const searchTermLower = searchTerm.toLowerCase();
    
    // Check if the key matches
    if (key !== undefined && String(key).toLowerCase().includes(searchTermLower)) {
      return true;
    }
    
    // Check if the value matches for primitive types
    const itemType = getValueType(item);
    if (!["object", "array"].includes(itemType)) {
      return String(item).toLowerCase().includes(searchTermLower);
    }
    
    // For objects and arrays, check if any child matches
    if (itemType === "array") {
      return item.some((child: any, idx: number) => itemMatchesSearch(child, idx));
    }
    
    if (itemType === "object") {
      return Object.keys(item).some(childKey => itemMatchesSearch(item[childKey], childKey));
    }
    
    return false;
  };

  return (
    <div className="w-full">
      <span>{isArray ? "[" : "{"}</span>
      <div>
        {DataType == "array" ? (
          data.length > 0 ? (
            // @ts-ignore
            data.map((item, idx) => {
              // Skip items that don't match the search if showOnlyMatches is true
              if (showOnlyMatches && searchTerm && !itemMatchesSearch(item, idx)) {
                return null;
              }
              
              return (
                <KeyValueRender
                  indent={1}
                  key={idx}
                  label={idx}
                  value={item}
                  row={level > 0 ? `${parentId}.${idx}` : `${idx}`}
                  level={level}
                  searchTerm={searchTerm}
                  showOnlyMatches={showOnlyMatches}
                />
              );
            })
          ) : (
            <div className="w-full py-4 text-gray-400 italic">...Empty...</div>
          )
        ) : DataType == "object" && Object.keys(data).length > 0 ? (
          Object.keys(data).map((key, idx) => {
            const KeyValue = data[key];
            
            // Skip items that don't match the search if showOnlyMatches is true
            if (showOnlyMatches && searchTerm && !itemMatchesSearch(KeyValue, key)) {
              return null;
            }
            
            return (
              <KeyValueRender
                indent={1}
                key={idx}
                label={key}
                row={level > 0 ? `${parentId}.${idx}` : `${idx}`}
                value={KeyValue}
                level={level}
                searchTerm={searchTerm}
                showOnlyMatches={showOnlyMatches}
              />
            );
          })
        ) : (
          <div className="w-full py-4 text-gray-400 italic">...Empty...</div>
        )}
      </div>
      <span>{isArray ? "]" : "}"}</span>
    </div>
  );
};

export default JsonParser;
