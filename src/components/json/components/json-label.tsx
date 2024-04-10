"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/context/app-context";
import useData from "@/hooks/useData";
import { SetValue, getValueType } from "@/lib/utils";
import { Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type ComponentProps = {
  value: any;
  id: string;
};

const JsonValue: React.FC<ComponentProps> = ({ value, id }): JSX.Element => {
  const [isFieldEditalbe, setIsFieldEditable] = useState<boolean>(false);
  // @ts-ignore
  const { jsonObject } = useData();
  const { setJsonObject } = useApp();
  const form = useForm();
  const FieldType = getValueType(value);

  const onFieldClick = () => {
    setIsFieldEditable(true);
  };

  // @ts-ignore
  const onSubmit = (value) => {
    setJsonObject(SetValue(jsonObject, id, value?.Value));
    setIsFieldEditable(false);
  };

  // @ts-ignore
  const render = (fieldValue) => {
    console.log(fieldValue?.type);
    switch (fieldValue?.type.toLocaleLowerCase()) {
      case "string":
        const lenghtOfValue = fieldValue?.default?.length;
        if (lenghtOfValue < 50) {
          return (
            <FormField
              control={form.control}
              name={fieldValue.name}
              defaultValue={fieldValue.default}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input className="w-full" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          );
        } else {
          return (
            <FormField
              control={form.control}
              name={fieldValue.name}
              defaultValue={fieldValue.default}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Textarea className="w-[600px]" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          );
        }

      case "number":
        return (
          <FormField
            control={form.control}
            name={fieldValue.name}
            defaultValue={fieldValue.default}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        );

      case "boolean":
        return (
          <FormField
            control={form.control}
            name={fieldValue.name}
            defaultValue={fieldValue.default}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        );

      case "color":
        return (
          <FormField
            control={form.control}
            name={fieldValue.name}
            defaultValue={fieldValue.default}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input type="color" className="w-[80px]" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        );

      case "date":
        return (
          <FormField
            control={form.control}
            name={fieldValue.name}
            defaultValue={fieldValue.default}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input type="date" className="w-[150px]" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        );

      case "datetime":
        return (
          <FormField
            control={form.control}
            name={fieldValue.name}
            defaultValue={fieldValue.default}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input type="datetime-local" className="w-[230px]" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        );

      default:
        return (
          <FormField
            control={form.control}
            name={fieldValue.name}
            defaultValue={fieldValue.default}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input className="w-full" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        );
    }
  };

  const formData = {
    type: FieldType,
    name: "Value",
    default: value,
  };

  return (
    <>
      {!isFieldEditalbe ? (
        <span
          className="p-[3px] rounded px-[6px] cursor-pointer border border-white hover:border-gray-300"
          onClick={onFieldClick}
        >
          {String(value)}
        </span>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center">
              {render(formData)}
              <Button
                type="submit"
                variant={"ghost"}
                className="p-1 m-0 ml-2 hover:bg-transparent"
              >
                <Save size={16} type="submit" />
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
};

export default JsonValue;
