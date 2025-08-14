import React from 'react';
import VisionIssueModel from "../../model/VisionIssueModel";

const IssueBox = ({issue}) => {
    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <pre>{issue && issue.getFormattedIssue()}</pre>
        </div>
    );
}

export default IssueBox;