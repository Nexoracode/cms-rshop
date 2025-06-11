"use client";

import React from "react";
import Table from "../p-admin/modules/Table";
import RowTable from "../p-admin/modules/RowTable";

type WorkingHoursType = { day: string; hours: string | null };

type WorkingHoursProps = {
    workingHours: WorkingHoursType[];
};

// Helper function to capitalize the first letter of a word
const capitalizeFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

const WorkingHours: React.FC<WorkingHoursProps> = ({ workingHours }) => {
    const daysOfWeekOrder = [
        "saturday",
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
    ];

    // Sort the working hours based on the day order without mutating the original array
    const sortedWorkingHours = [...workingHours].sort((a, b) => {
        return (
            daysOfWeekOrder.indexOf(a.day.toLowerCase()) -
            daysOfWeekOrder.indexOf(b.day.toLowerCase())
        );
    });

    return (
        <Table
            onActivePage={() => { }}
            cols={["Day", "Start Time", "End Time", "Status", "", ""]}
            hasDatas={true}
            paginationProps={[]}
            navbar={{
                headerTitle: "",
                headerIcon: "",
                btnText: "",
                onClickedBtnText: () => { },
            }}
            contentHeader={<></>}
            activeAction={false}
        >
            {sortedWorkingHours.map(({ day, hours }, index) => (
                <tr
                    key={day}
                    className="bg-[var(--background)] hover:opacity-75 transition-all duration-300 border-t border-t-gray-300"
                >
                    <RowTable title={String(index + 1)} />
                    {/* Capitalize the first letter of the day */}
                    <RowTable title={capitalizeFirstLetter(day)} />
                    {hours ? (
                        <>
                            <RowTable contentMiddle={true}>{hours.slice(0, 8)}</RowTable>
                            <RowTable contentMiddle={true}>{hours.slice(10, 19)}</RowTable>
                        </>
                    ) : (
                        <>
                            <RowTable contentMiddle={true}>
                                <p className="text-red-500">Inactive</p>
                            </RowTable>
                            <RowTable contentMiddle={true}>
                                <p className="text-red-500">Inactive</p>
                            </RowTable>
                        </>
                    )}
                    <RowTable contentMiddle={true}>
                        {hours ? (
                            (() => {
                                // Extract start and end times
                                const [startTime, endTime] = hours.split(" - ");
                                const isStartAM = startTime.includes("AM");
                                const isStartPM = startTime.includes("PM");
                                const isEndAM = endTime.includes("AM");
                                const isEndPM = endTime.includes("PM");

                                if (isStartAM && isEndAM) {
                                    // Both times are in AM
                                    return <p className="bg-sky-500 text-white px-1 rounded">AM</p>;
                                } else if (isStartPM && isEndPM) {
                                    // Both times are in PM
                                    return <p className="bg-orange-500 text-white px-1 rounded">PM</p>;
                                } else if (isStartAM && isEndPM) {
                                    // Starts in AM and ends in PM
                                    return (
                                        <p className="text-white">
                                            <span className="bg-sky-500 px-1 rounded-l">AM</span>
                                            <span className="bg-gray-500"> - </span>
                                            <span className="bg-orange-500 px-1 rounded-r">PM</span>
                                        </p>
                                    );
                                } else if (isStartPM && isEndAM) {
                                    // Starts in PM and ends in AM
                                    return (
                                        <p className="text-white">
                                            <span className="bg-orange-500 px-1 rounded-l">PM</span>
                                            <span className="bg-gray-500"> - </span>
                                            <span className="bg-sky-500 px-1 rounded-r">AM</span>
                                        </p>
                                    );
                                } else {
                                    // Default fallback for inactive or invalid data
                                    return <p className="text-red-500">Inactive</p>;
                                }
                            })()
                        ) : (
                            <p className="text-red-500">Inactive</p>
                        )}
                    </RowTable>
                    <td colSpan={0} style={{ display: "none", padding: 0, margin: 0, border: "none", width: 0, height: 0 }}></td>
                    <td colSpan={0} style={{ display: "none", padding: 0, margin: 0, border: "none", width: 0, height: 0 }}></td>
                </tr>
            ))}
        </Table>
    );
};

export default WorkingHours;