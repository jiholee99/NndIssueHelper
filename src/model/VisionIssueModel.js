import TextToUnicodeConverter from "../util/TextToUnicodeConverter";

class VisionIssueModel {
    constructor({lotId, start_time, end_time, issue, issue_location, issue_reason, solution}) {
        this.lotId = lotId;
        this.start_time = start_time;
        this.end_time = end_time;
        this.issue = issue;
        this.issue_location = issue_location;
        this.issue_reason = issue_reason;
        this.solution = solution;
    }

    getFormattedIssue() {
        const title = TextToUnicodeConverter.titleConverter("LGESMI ISSUE");
        const lotId = TextToUnicodeConverter.issueConverter(this.lotId);
        const start_time = TextToUnicodeConverter.issueConverter(this.start_time);
        const end_time = TextToUnicodeConverter.issueConverter(this.end_time);
        const issue = TextToUnicodeConverter.issueConverter(this.issue);
        const txt = `${title}\nLot ID: ${lotId}\nStart Time: ${start_time}\nEnd Time: ${end_time}\nIssue: ${issue}`;
        return txt;

    }
}

export default VisionIssueModel;

