import { useState } from "react";
import { Calendar } from "../../../../../../components/Calendar";
import { Container, TimePicker, TimePickerHeader, TimePickerList, TimePickerItem } from "./styles";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { api } from "../../../../../../lib/axios";
import { useQuery } from "@tanstack/react-query";

interface Availability {
  possibleTimes: number[];
  availableTimes: number[];
}

interface CalendarStepProps {
  onSelectDateTime: (date: Date) => void;
}

export function CalendarStep({
  onSelectDateTime
}: CalendarStepProps) {
  const router = useRouter();
  const username = String(router.query?.username);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const isDateSelected = !!selectedDate;

  const dayjsSelectedDate = dayjs(selectedDate);
  const weekDay = selectedDate ? dayjsSelectedDate.format("dddd") : null;
  const describedDate = selectedDate ? dayjsSelectedDate.format("DD[ de ]MMMM") : null;

  const selectedDateWithoutTime = selectedDate? dayjs(selectedDate).format("YYYY-MM-DD") : null;

  const {
    data: availability
  } = useQuery<Availability>(["availability", username, selectedDateWithoutTime], async() => {
    const response = await api.get<Availability>(`/users/${username}/availability`, {
      params: {
        date: selectedDateWithoutTime
      }
    });

    return response.data;
  }, {
    enabled: !!selectedDate
  });

  function handleSelectTime(hour: number) {
    const dateWithTime = dayjs(selectedDate)
      .set("hour", hour)
      .startOf("hour")
      .toDate();
      
    onSelectDateTime(dateWithTime);
  }

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar 
        selectedDate={selectedDate}
        onDateSelected={setSelectedDate}
      />

      {isDateSelected &&
        <TimePicker tabIndex={-1}>
          <TimePickerHeader>
            {weekDay} - <span>{describedDate}</span>
          </TimePickerHeader>

          <TimePickerList>
            {availability?.possibleTimes.map((hour) => {
              const disabled = !availability?.availableTimes.includes(hour);
              
              return (
                <TimePickerItem key={hour} disabled={disabled} onClick={() => handleSelectTime(hour)}>
                  {String(hour).padStart(2, "0")}:00h
                </TimePickerItem>
              );
            })}
          </TimePickerList>
        </TimePicker>
      }
    </Container>
  );
}