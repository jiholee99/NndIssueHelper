import VisionIssueModel from "../../model/VisionIssueModel";
import IssueBox from "./IssueBox";
import TextToUnicodeConverter from "../../util/TextToUnicodeConverter";
import React, { useState } from 'react';
import IssueForm from "./IssueForm";
import PopupExample from "../popup";
import { DynamicForm } from "./demo";

const exampleSchema = {
    title: "Example Issue Form",
    submitLabel: "Submit",
    fields: [
        { id: "lotid", label: "Lot ID", type: "text", required: true, placeholder: "Enter lot ID" },
        { id: "issue_type", label: "Issue Type", type: "select", options: [
            { value: "vision", label: "Vision" },
            { value: "equipment", label: "Equipment" }
        ], required: true, placeholder: "Select issue type" },
        { id: "equipment", label : "Equipment", type: "select", options: [
            { value: "1-1C", label: "MI1 1-1C" },
            { value: "1-2C", label: "MI1 1-2C" },
            { value: "2-1C", label: "MI1 2-1C" },
            { value: "2-2C", label: "MI1 2-2C" },
            { value : "3-1C", label: "MI2 3-1C" },
            { value : "3-2C", label: "MI2 3-2C" },
            { value : "3-3C", label: "MI2 3-3C" },
            { value : "4-1C", label: "MI2 4-1C" },
            { value : "4-2C", label: "MI2 4-2C" },
            { value : "4-3C", label: "MI2 4-3C" },

            { value: "1-1A", label: "MI1 1-1A" },
            { value: "1-2A", label: "MI1 1-2A" },
            { value: "2-1A", label: "MI1 2-1A" },
            { value: "2-2A", label: "MI1 2-2A" },
            { value : "3-1A", label: "MI2 3-1A" },
            { value : "3-2A", label: "MI2 3-2A" },
            { value : "3-3A", label: "MI2 3-3A" },
            { value : "4-1A", label: "MI2 4-1A" },
            { value : "4-2A", label: "MI2 4-2A" },
            { value : "4-3A", label: "MI2 4-3A" }
        ], required: true, placeholder: "Select vision equipment" },
        { id: "start_time", label: "Start Time", type: "datetime" },
        { id: "end_time", label: "End Time", type: "datetime" },
        { id: "hmi_alarm_name", label: "HMI Alarm Name", type: "text", required: true, placeholder: "Enter HMI Alarm Name" },
        { id: "issue", label: "Issue Description", type: "textarea", required: true, placeholder: "Describe the issue" },
        { id: "solution", label: "Proposed Solution", type: "textarea", required: true, placeholder: "Describe the proposed solution" },
    ]
};

const keyNameMap = {
    lotid: "LOT ID",
    issue_type: "발생 구분",
    equipment: "설비명",
    start_time: "시작 시간",
    end_time: "종료 시간",
    hmi_alarm_name: "HMI 알람명",
    issue: "이슈 내용",
    solution: "조치 내용"
};

function formatDateTime(str) {
    if (!str) return "";
    const [date, time] = str.split("T");
    if (!date || !time) return str;
    const [, month, day] = date.split("-");
    return `${month}/${day}/${time}`;
}

const IssueTemplate = () => {
    const [issue, setIssue] = useState(null);
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupText, setPopupText] = useState("");

    const dataToText = (data) => {
        let stringList = [];
        stringList.push("설비부동내용 보고\n");

        // Format time range
        if (data.start_time || data.end_time) {
            const start = formatDateTime(data.start_time);
            const end = formatDateTime(data.end_time);
            stringList.push(`time :\n-> ${start} ~ ${end}`);
        }

        // Add other fields except start_time and end_time
        for (const [key, value] of Object.entries(data)) {
            if (!value) continue;
            if (key === "start_time" || key === "end_time") continue;
            const displayKey = keyNameMap[key] || key;
            stringList.push(`${displayKey}: ${TextToUnicodeConverter.issueConverter(value)}`);
        }
        return stringList.join("\n");
    }

    const handleFormSubmit = (data) => {
        setPopupText(dataToText(data));
        setPopupOpen(true);
    };

    return (
        <div className="p-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Issue Template</h1>
            <IssueBox issue={issue} />
            <div className="text-gray-600 mb-4"></div>
            {/* <IssueForm issue={issue} setIssue={setIssue} /> */}
            <DynamicForm schema={exampleSchema} onSubmit={handleFormSubmit} />
            <PopupExample isOpen={popupOpen} setIsOpen={setPopupOpen} textToCopy={popupText} />
        </div>
    );
};

export default IssueTemplate;
