import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("tw-p-3", className)}
      classNames={{
        months: "tw-flex tw-flex-col sm:tw-flex-row tw-space-y-4 sm:tw-space-x-4 sm:tw-space-y-0",
        month: "tw-space-y-4",
        caption: "tw-flex tw-justify-center tw-pt-1 tw-relative tw-items-center",
        caption_label: "tw-text-sm tw-font-medium",
        nav: "tw-space-x-1 tw-flex tw-items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "tw-h-7 tw-w-7 tw-bg-transparent tw-p-0 tw-opacity-50 hover:tw-opacity-100"
        ),
        nav_button_previous: "tw-absolute tw-left-1",
        nav_button_next: "tw-absolute tw-right-1",
        table: "tw-w-full tw-border-collapse tw-space-y-1",
        head_row: "tw-flex",
        head_cell:
          "tw-text-muted-foreground tw-rounded-md tw-w-9 tw-font-normal tw-text-[0.8rem]",
        row: "tw-flex tw-w-full tw-mt-2",
        cell: "tw-h-9 tw-w-9 tw-text-center tw-text-sm tw-p-0 tw-relative [&:has([aria-selected].day-range-end)]:tw-rounded-r-md [&:has([aria-selected].day-outside)]:tw-bg-accent/50 [&:has([aria-selected])]:tw-bg-accent first:[&:has([aria-selected])]:tw-rounded-l-md last:[&:has([aria-selected])]:tw-rounded-r-md focus-within:tw-relative focus-within:tw-z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "tw-h-9 tw-w-9 tw-p-0 tw-font-normal aria-selected:tw-opacity-100"
        ),
        day_range_end: "tw-day-range-end",
        day_selected:
          "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary hover:tw-text-primary-foreground focus:tw-bg-primary focus:tw-text-primary-foreground",
        day_today: "tw-bg-accent tw-text-accent-foreground",
        day_outside:
          "tw-day-outside tw-text-muted-foreground tw-opacity-50 aria-selected:tw-bg-accent/50 aria-selected:tw-text-muted-foreground aria-selected:tw-opacity-30",
        day_disabled: "tw-text-muted-foreground tw-opacity-50",
        day_range_middle:
          "aria-selected:tw-bg-accent aria-selected:tw-text-accent-foreground",
        day_hidden: "tw-invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="tw-h-4 tw-w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="tw-h-4 tw-w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
