import { CaretLeft, CaretRight } from "phosphor-react";
import { CalendarActions, CalendarContainer, CalendarHeader, CalendarTitle, CalendarBody, CalendarDay } from "./styles";
import { getWeekDays } from "../../utils/getWeekDays";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { useRouter } from "next/router";


interface BlockedDates {
  blockedWeekDays: number[];
  blockedDates: number[];
}

interface CalendarWeek {
  week: number;
  days: Array<{
    date: dayjs.Dayjs,
    disabled: boolean
  }>
}

type CalendarWeeks = CalendarWeek[];

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelected: (date: Date | null) => void
}

export function Calendar({
  selectedDate,
  onDateSelected
}: CalendarProps) {
  const router = useRouter();
  const username = String(router.query?.username);

  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set("date", 1);
  });

  const shortWeekDays = getWeekDays({ short: true });
  const currentMonthName = currentDate.format("MMMM");
  const currentYearName = currentDate.format("YYYY");

  const currentYear = currentDate.get("year");
  const currentMonth = currentDate.get("month");

  const {
    data: blockedDates
  } = useQuery<BlockedDates>(["blocked-dates", username, currentYear, currentMonth + 1], async() => {
    const response = await api.get<BlockedDates>(`/users/${username}/blocked-dates`, {
      params: {
        year: currentYear,
        month: currentMonth + 1
      }
    });

    return response.data;
  });

  const calendarWeeks = useMemo(() => {
    if(!blockedDates) {
      return [];
    }

    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth()
    }).map((_, i) => {
      const date = currentDate.set("date", i + 1);
      const disabled = date.endOf("day").isBefore(new Date())
        || blockedDates.blockedWeekDays.includes(date.get("day"))
        || blockedDates.blockedDates.includes(date.get("date"));

      return {
        date,
        disabled
      };
    });

    const firstWeekDay = currentDate.get("day");

    const previousMonthFillArray = Array.from({
      length: firstWeekDay
    }).map((_, i) => {
      return {
        date: currentDate.subtract(i + 1, "day"),
        disabled: true
      };
    }).reverse();

    const lastDayInCurrentMonth = currentDate.set("date", 
      currentDate.daysInMonth()
    );

    const lastWeekDay = lastDayInCurrentMonth.get("day");

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1)
    }).map((_, i) => {
      return {
        date: lastDayInCurrentMonth.add(i + 1, "day"),
        disabled: true
      };
    });

    const calendarDays = [
      ...previousMonthFillArray,
      ...daysInMonthArray,
      ...nextMonthFillArray
    ];

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, days) => {
        const isNewWeek = (i % 7) === 0;
        
        if(isNewWeek) {
          weeks.push({
            week: ((i / 7) + 1),
            days: days.slice(i, i + 7)
          });
        }

        return weeks;
      }, []
    );

    return calendarWeeks;
  }, [currentDate, blockedDates]);

  function handlePreviousMonth() {
    const previosMonthDate = currentDate.subtract(1, "month");
    setCurrentDate(previosMonthDate);
  }

  function handleNextMonth() {
    const nextMonthDate = currentDate.add(1, "month");
    setCurrentDate(nextMonthDate);
  }

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonthName}{" - "}<span>{currentYearName}</span>
        </CalendarTitle>

        <CalendarActions>
          <button onClick={handlePreviousMonth} title="Mês Anterior">
            <CaretLeft/>
          </button>
          <button onClick={handleNextMonth} title="Mês Seguinte">
            <CaretRight/>
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => {
              return (
                <th key={weekDay}>{weekDay}.</th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {calendarWeeks.map((week) => {
            return (
              <tr key={week.week}>
                {week.days.map(({ date, disabled }, i) => {
                  const isSelectedDate = dayjs(selectedDate).diff(date, "date") === 0;

                  function handleOnDateSelected() {
                    onDateSelected(isSelectedDate? null:date.toDate());
                  }

                  return (
                    <td key={`${week.week} - ${i}`}>
                      <CalendarDay 
                        isSelected={isSelectedDate}
                        onClick={handleOnDateSelected} 
                        disabled={disabled}
                      >
                        {date.get("date")}
                      </CalendarDay>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  );
}