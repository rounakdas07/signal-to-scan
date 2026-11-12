import {writeFile} from "node:fs/promises";
import {pathToFileURL} from "node:url";
import {studies, groups} from "../evidence.mjs";

export function evidenceCSV() {
  const header = ["study","authors","issue_year","analyte","finding","cohort","endpoint","imaging_context","study_design","source","source_location","figure_or_table","individual_lead_days","positive_timing_unknown","undetected_relapses"];
  const records = studies.map(s => [
    s.name,s.by,s.year,groups[s.group].label,s.citation,s.cohort,s.endpoint,s.scan,s.design,s.paper,s.locator,s.extra?.url,
    s.days?.join(" "),s.missingTime,s.undetected
  ]);
  return [header,...records].map(row => row.map(cell => '"' + String(cell ?? "").replaceAll('"','""') + '"').join(",")).join("\r\n") + "\r\n";
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await writeFile(new URL("../study-evidence.csv", import.meta.url), evidenceCSV());
}
