import VisionIssueModel from "../../model/VisionIssueModel";
import IssueBox from "./IssueBox";
import TextToUnicodeConverter from "../../util/TextToUnicodeConverter";
import React, { useState } from 'react';
import IssueForm from "./IssueForm";
import PopupExample from "../popup";
import { DynamicForm } from "../../components/DynamicForm";
import visionIssueSchema from "../../model/VisionIssueSchema";

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
        stringList.push("⚠️ 설비 부동 내용 보고 ⚠️\n");
        
        // Add Equipment
        const equipment = data.equipment || "N/A";
        stringList.push(`설비명: ${TextToUnicodeConverter.issueConverter(equipment)}`);

        // Add Issue Type
        const issueType = data.issue_type || "N/A";
        stringList.push(`발생 구분: ${TextToUnicodeConverter.issueConverter(issueType)}`);


        // Add Lot ID
        const lotId = data.lotid || "N/A";
        stringList.push(`LOT ID: ${TextToUnicodeConverter.issueConverter(lotId)}`);

        // Add time range
        const start = formatDateTime(data.start_time);
            const end = formatDateTime(data.end_time);
            stringList.push(`시간 ${TextToUnicodeConverter.issueConverter(start + " ~ " + end)}`);
        
        // Add HMI Alarm Name
        const hmiAlarmName = data.hmi_alarm_name || "N/A";
        stringList.push(`HMI 알람명: ${TextToUnicodeConverter.issueConverter(hmiAlarmName)}`);

        // Add Issue
        const issueText = data.issue || "N/A";
        stringList.push(`현상: ${TextToUnicodeConverter.issueConverter(issueText)}`);

        // Add Solution
        const solutionText = data.solution || "N/A";
        stringList.push(`조치내용: ${TextToUnicodeConverter.issueConverter(solutionText)}`);

        return stringList.join("\n");
    }

    const handleFormSubmit = (data) => {
        setPopupText(dataToText(data));
        setPopupOpen(true);
    };

    return (
        <div className="p-4">
            <div className="w-full flex flex-row gap-4 mb-4 items-center justify-center">
                <DynamicForm schema={visionIssueSchema} onSubmit={handleFormSubmit} />
            </div>
            
            <PopupExample isOpen={popupOpen} setIsOpen={setPopupOpen} textToCopy={popupText} />
        </div>
    );
};

export default IssueTemplate;
