const visionIssueSchema = {
    title: "[설비 부동 내역 보고]",
    submitLabel: "Submit",
    fields: [
        // Vision Equipment Selection
        { id: "equipment", label : "호기", type: "select", options: [
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
        ], required: true, placeholder: "호기를 선택해주세요" },
        // Issue Type Selection
        { id: "issue_type", label: "부동 분류", type: "select", options: [
            { value: "비전", label: "비전" },
            { value: "설비", label: "설비" }
        ], required: true, placeholder: "부동 분류를 선택해주세요" },
        // Date and Time Fields
        { id: "start_time", label: "시작시간", type: "datetime", required: true },
        { id: "end_time", label: "종료시간", type: "datetime", required: true },

        // Text Fields
        { id: "hmi_alarm_name", label: "HMI 알람명", type: "text", required: false, placeholder: "알람명을 기입해주세요" },
        { id: "issue", label: "현상", type: "textarea", required: true, placeholder: "현상을 기입해주세요" },

        { id: "solution", label: "조치내용", type: "textarea", required: true, placeholder: "조치내용을 기입해주세요" },

        { id: "lotid", label: "Lot ID", type: "text", required: false, placeholder: "Lot ID를 기입해주세요" },
        
    
        
    ]
};

export default visionIssueSchema;