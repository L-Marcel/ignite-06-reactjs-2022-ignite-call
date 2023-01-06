import { CalendarStep } from "./CalendarStep";
import { ConfirmStep } from "./ConfirmStep";
import { useState } from "react";

export function ScheduleForm() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);

  function handleOnClearSelectedDateTime() {
    setSelectedDateTime(null);
  }

  if(selectedDateTime) {
    return (
      <ConfirmStep
        schedulingDate={selectedDateTime}
        onCancelOrFinishScheduling={handleOnClearSelectedDateTime}
      />
    );
  }

  return (
    <CalendarStep
      onSelectDateTime={setSelectedDateTime}
    />
  );
}