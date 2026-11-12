// Independent extractions. Each record keeps the outcome, population and original source together.
export const groups = {
  cells: { label: "Whole tumour cells", short: "CTC", first: "genoctc" },
  dna: { label: "Tumour DNA", short: "ctDNA", first: "aanestad" },
};

export const studies = [
  {
    id: "genoctc", group: "cells", name: "GenoCTC", by: "Chelakkot et al.", year: "2026",
    nav: "Two cases with exact dates", journal: "Frontiers in Oncology",
    title: "Longitudinal monitoring of circulating tumor cell phenotypic conversion as a predictor of late recurrence in breast cancer",
    paper: "https://doi.org/10.3389/fonc.2026.1903915",
    locator: "Results, correlation between CTC burden and late recurrence",
    result: "43 and 69", unit: "days",
    summary: "Time from a positive whole-cell test to confirmed recurrence in the two people who relapsed.",
    cohort: "Of 25 breast cancer survivors tested 4–13 years after surgery, six tested positive. Two of those six had a confirmed distant recurrence.",
    scan: "The positive tests prompted further checks. The study timed those checks through to diagnosis. It did not measure a head start over a scheduled scan.",
    design: "Feasibility study using GenoCTC at a follow-up visit. The published case intervals cover the two confirmed recurrences. Four other people tested positive at baseline without a confirmed recurrence at that analysis.",
    endpoint: "Clinical confirmation after a test-triggered work-up",
    visual: "timeline", days: [43, 69], missingTime: 0, undetected: 0, relapses: 2,
    windows: [30, 60, 90], defaultDays: 60,
    citation: "Chelakkot et al. (2026), Results. Among 25 breast cancer survivors, six tested positive with GenoCTC. The two confirmed recurrences were diagnosed 43 and 69 days after a positive result. Positivity prompted work-up, so the lead over scheduled imaging is unknown."
  },
  {
    id: "e5103", group: "cells", name: "CellSearch", by: "Sparano et al.", year: "2018",
    nav: "One blood draw in 353 survivors", journal: "JAMA Oncology",
    title: "Association of circulating tumor cells with late recurrence of estrogen receptor–positive breast cancer",
    paper: "https://doi.org/10.1001/jamaoncol.2018.2574", locator: "Results, CTCs and recurrence in hormone receptor–positive disease",
    result: "2.8", unit: "years",
    summary: "Median time to clinical recurrence among seven people who had a positive blood test and later relapsed.",
    cohort: "In the 353-person hormone receptor–positive subgroup, 23 people relapsed. Seven had tested positive and 16 had tested negative at their single study draw.",
    scan: "Clinicians were blinded to the results. The study recorded clinical recurrence without scheduling a scan to compare with the blood draw.",
    design: "E5103 secondary analysis of stage II–III, HER2-negative survivors. Blood was drawn once, 4.5–7.5 years after diagnosis. Of the 18 people with a positive result in this subgroup, 11 had no recorded recurrence during follow-up.",
    endpoint: "Clinical recurrence after a single blinded blood draw",
    visual: "bars", chartTitle: "Earlier blood result among the 23 who relapsed",
    bars: [{label:"Positive result", part:7, total:23},{label:"Negative result",part:16,total:23,muted:true}],
    citation: "Sparano et al. (2018), E5103. Of 353 hormone receptor–positive survivors, 23 later relapsed. A single CellSearch draw was positive in seven of the 23. Their reported median interval to clinical recurrence was 2.8 years. The study did not time a comparison with scheduled imaging."
  },
  {
    id: "maintrac", group: "cells", name: "maintrac", by: "Pachmann & Schuster", year: "2018",
    nav: "Cell counts after endocrine therapy", journal: "Cancers",
    title: "The value of monitoring the behavior of circulating tumor cells at the end of endocrine therapy in breast cancer patients",
    paper: "https://doi.org/10.3390/cancers10110407", locator: "Results, Figures 2 and 4b",
    result: "10", unit: "months",
    summary: "Time from a rising cell count to confirmed relapse in one published case. The paper gives no median interval for the cohort.",
    cohort: "Researchers followed 36 people with oestrogen receptor–positive breast cancer after endocrine therapy. Eight of 12 with rising counts relapsed, as did two of 24 with stable or falling counts.",
    scan: "The case had a clear examination when the count rose. The authors did not give a paired negative scan date or a cohort-wide scan interval.",
    design: "Serial maintrac counts tracked circulating epithelial tumour cells. Figure 2 gives outcomes by count trajectory. Figure 4b illustrates one case. Treatment changed during follow-up for some participants.",
    endpoint: "Recurrence after a rise in cell count, one case timed",
    visual: "bars", chartTitle: "People who relapsed in each group",
    bars: [{label:"Rising cell counts",part:8,total:12},{label:"Stable or falling counts",part:2,total:24,muted:true}],
    citation: "Pachmann & Schuster (2018), Figures 2 and 4b. After endocrine therapy, 8 of 12 with rising cell counts and 2 of 24 with stable or falling counts relapsed. A 10-month interval was described in one person. The study did not report a cohort median or a timed comparison with scans."
  },
  {
    id: "aanestad", group: "dna", name: "Oncomine", by: "Aanestad et al.", year: "2026",
    nav: "Blood result versus imaging", journal: "Molecular Oncology",
    title: "Monitoring of circulating tumor DNA allows early detection of disease relapse in patients with operable breast cancer",
    paper: "https://doi.org/10.1002/1878-0261.70170", locator: "Results §3.2 and Figure 3b",
    extra: {url:"https://pmc.ncbi.nlm.nih.gov/articles/PMC13060637/figure/mol270170-fig-0003/",title:"Open Figure 3"},
    result: "10.3", unit: "months",
    summary: "Reported median interval between blood detection and radiological detection in the selected timing analysis.",
    cohort: "Of 35 people with systemic relapse, 19 tested positive around relapse. The researchers checked earlier samples from those 19 and found that 17 had tested positive before imaging confirmed relapse.",
    scan: "The authors compared blood and imaging dates. One blood result came after imaging, and one person lacked a postoperative sample for timing. The other 16 relapses were outside the look-back analysis.",
    design: "Norwegian matched case-control study with 35 systemic relapses and 35 relapse-free controls. Stored blood was tested retrospectively. The published median comes from the evaluable timing subset. Online in 2025, journal issue in 2026.",
    endpoint: "Radiological detection of systemic relapse",
    visual: "bars", chartTitle: "The same 17 early detections, two denominators",
    bars: [{label:"Of all systemic relapses",part:17,total:35},{label:"Of those positive around relapse",part:17,total:19}],
    citation: "Aanestad et al. (2026), results §3.2 and Figure 3b. In a matched study, 17 of 35 systemic relapses had documented ctDNA detection before radiological confirmation. Earlier samples were examined only in the 19 patients positive around relapse. The selected timing analysis reported a 10.3-month median."
  },
  {
    id: "eblis", group: "dna", name: "Signatera", by: "Shaw et al.", year: "2024",
    nav: "Individual timing for 34 relapses", journal: "JCO Precision Oncology",
    title: "Serial postoperative circulating tumor DNA assessment has strong prognostic value during long-term follow-up in patients with breast cancer",
    paper: "https://doi.org/10.1200/PO.23.00456", locator:"Tables 2 and 3",
    extra:{url:"https://pmc.ncbi.nlm.nih.gov/articles/PMC11161241/table/tbl3/",title:"Open Table 3"},
    result: "10.5", unit: "months",
    summary: "Reported median interval from first positive tumour DNA test to recorded relapse in EBLIS.",
    cohort: "Of 156 people followed, 34 relapsed. Thirty had a positive blood test by relapse. One was positive on the day of relapse and one positive case lacked a usable relapse date.",
    scan: "The study tracked clinical or radiological relapse in routine follow-up. Table 3 gives days to recorded recurrence, without a separate scheduled-scan endpoint for each case.",
    design: "Serial samples were collected roughly six-monthly and analysed retrospectively with a tumour-informed assay. Four people who relapsed had no detected ctDNA. Five of 122 who remained relapse-free had an occasional positive result during follow-up.",
    endpoint: "Recorded clinical or radiological relapse",
    visual: "dots",
    // Lead Time, Days (Table 3), sorted. Zero is a recorded same-day result.
    days: [0,68,79,114,116,133,137,188,194,199,258,259,263,263,301,323,405,408,421,512,570,596,610,611,695,721,856,973,1147],
    missingTime: 1, undetected: 4, relapses: 34, windows: [30,60,90,180,365], defaultDays: 90,
    citation: "Shaw et al. (2024), EBLIS, Tables 2 and 3. Among 156 participants there were 34 relapses. Thirty had detectable ctDNA by relapse, with a reported median interval of 10.5 months. The individual data include a same-day result and one positive case with unknown timing."
  },
  {
    id: "ctrak", group: "dna", name: "c-TRAK TN", by: "Turner et al.", year: "2023",
    nav: "What scans showed at the first alert", journal: "Annals of Oncology",
    title: "Results of the c-TRAK TN trial of ctDNA mutation tracking in moderate- and high-risk early-stage triple-negative breast cancer",
    paper: "https://doi.org/10.1016/j.annonc.2022.11.005", locator: "Results, staging of intervention participants",
    result: "23 of 32", unit: "",
    summary: "People who already had visible metastases on staging scans when a positive tumour DNA test triggered assessment.",
    cohort: "The 32 were ctDNA-positive participants allocated to intervention. In nine of them, staging showed no visible metastases at that assessment.",
    scan: "This study asked what scans could already see at the blood alert. It did not establish how many months of warning the nine scan-negative people had.",
    design: "Prospective trial in moderate- and high-risk early triple-negative breast cancer. Of 161 participants who entered surveillance, 44 had ctDNA detected within 12 months. The 32-person staging comparison is a selected subgroup.",
    endpoint: "Metastases visible on staging at a positive ctDNA alert",
    visual: "bars", chartTitle: "Staging results in 32 ctDNA-positive participants",
    bars: [{label:"Metastases visible",part:23,total:32},{label:"No visible metastases",part:9,total:32,muted:true}],
    citation: "Turner et al. (2023), c-TRAK TN. Of 32 ctDNA-positive participants allocated to intervention, 23 already had metastases on staging scans. Nine had no visible metastases at that assessment. These counts do not give a median lead time."
  },
];

export const frontier = {
  platform: "https://frontierdiagnostics.net/the-big-picture-on-breast-cancer/",
  question: "https://frontierdiagnostics.net/blood-tests-for-cancer-recurrence-how-ctc-monitoring-could-support-follow-up-care/",
};

export function countWindow(study, minimum) {
  if (!study.days || !study.windows.includes(minimum)) throw new RangeError("No published interval for this selection");
  return {
    reached: study.days.filter(days => days >= minimum).length,
    shorter: study.days.filter(days => days < minimum).length,
    unknown: study.missingTime,
    undetected: study.undetected,
    total: study.relapses,
  };
}

export function readSelection(search) {
  const query = new URLSearchParams(search);
  const study = studies.find(item => item.id === query.get("study")) ?? studies[0];
  const days = Number(query.get("days"));
  return {study, days: study.windows?.includes(days) ? days : study.defaultDays};
}

export function selectionURL(study, days, currentURL) {
  const url = new URL(currentURL);
  url.searchParams.set("study", study.id);
  if (study.windows?.includes(days)) url.searchParams.set("days", String(days));
  else url.searchParams.delete("days");
  url.hash = "";
  return url;
}

export function findingText(study, days) {
  let finding = study.citation;
  if (study.windows) {
    const counts = countWindow(study, days);
    finding += ' Of ' + counts.total + ' observed relapses, ' + counts.reached +
      ' had a documented interval of at least ' + days + ' days.';
    if (counts.unknown) finding += ' One additional positive case had unknown timing.';
  }
  return [finding, study.paper, study.extra?.url].filter(Boolean).join('\n');
}
