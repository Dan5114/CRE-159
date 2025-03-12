import React from 'react'
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from "dayjs/plugin/localizedFormat";
import isBetween from "dayjs/plugin/isBetween";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(isBetween);
dayjs.extend(weekday);

export default function DurationDays({ start_date, end_date }) {
    const countBusinessDays = (start, end) => {
        let count = 0;
        let current = dayjs(start);

        while (current.isBefore(end, "day") || current.isSame(end, "day")) {
            if (current.day() !== 0 && current.day() !== 6) {
                count++; // Exclude weekends
            }
            current = current.add(1, "day");
        }

        return count;
    };

    // Convert dates and check validity
    const startDate = dayjs(start_date);
    const endDate = dayjs(end_date);

    if (!start_date || !end_date || !startDate.isValid() || !endDate.isValid()) {
        return <div className="text-xs text-red-500 gap-1.5">Duration: N/A</div>;
    }

    const businessDaysCount = countBusinessDays(startDate, endDate);

    return (
        <div className="text-xs text-primary flex items-center gap-1.5">
            Duration: &nbsp;
            {businessDaysCount} {businessDaysCount === 1 ? "day" : "days"}
        </div>
    );
}
