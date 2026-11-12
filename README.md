# Signal to Scan

[Open the interactive tool](https://rounakdas07.github.io/signal-to-scan/)

Which breast cancer studies found a positive blood result before confirmed recurrence? Which actually compared it with imaging? Explore six primary studies, switch between intact circulating tumour cells and circulating tumour DNA, and trace each finding back to its paper.

Built by Rounak Das as an independent research project for a conversation with Frontier Diagnostics. Sentinel qCTC is investigational. The studies below evaluated other assays. This tool describes published research and estimates no individual patient's risk.

## Try it

- [Whole cells](https://rounakdas07.github.io/signal-to-scan/?study=genoctc&days=60) shows two documented intervals, 43 and 69 days, after a positive test prompted further checks.
- [Blood versus imaging](https://rounakdas07.github.io/signal-to-scan/?study=aanestad) shows why 17 early detections can be reported against either 35 systemic relapses or the 19 people who were positive around relapse.
- [Count a minimum interval in EBLIS](https://rounakdas07.github.io/signal-to-scan/?study=eblis&days=90). Every one of the 34 confirmed relapses stays in the denominator. The published day-level data document 26 intervals of at least 90 days.
- “Copy finding” includes the paper and the current threshold when applicable. The URL preserves the chosen study and threshold.

## Source papers

| Study | Blood marker | What the study timed or counted |
| --- | --- | --- |
| [Chelakkot et al., 2026](https://doi.org/10.3389/fonc.2026.1903915) | GenoCTC, whole cells | Two positive-test-to-confirmation intervals after triggered work-up |
| [Sparano et al., 2018](https://doi.org/10.1001/jamaoncol.2018.2574) | CellSearch, whole cells | Single blinded draw and subsequent clinical recurrence in the hormone receptor–positive E5103 subgroup |
| [Pachmann & Schuster, 2018](https://doi.org/10.3390/cancers10110407) | maintrac, circulating epithelial tumour cells | Relapse by count trajectory and a separately illustrated patient timeline |
| [Aanestad et al., 2026 issue](https://doi.org/10.1002/1878-0261.70170) | Oncomine, ctDNA | Retrospective blood-to-imaging comparison in selected systemic relapses |
| [Shaw et al., 2024](https://doi.org/10.1200/PO.23.00456) | Signatera, ctDNA | [Individual intervals](https://pmc.ncbi.nlm.nih.gov/articles/PMC11161241/table/tbl3/) before recorded clinical or radiological relapse |
| [Turner et al., 2023](https://doi.org/10.1016/j.annonc.2022.11.005) | Mutation-tracking digital PCR, ctDNA | Staging appearances at a positive blood test in the c-TRAK TN intervention group |

## Scope and calculations

This curated selection covers follow-up after breast cancer treatment. It includes primary studies that report confirmed recurrence with a blood result, or staging after a blood-test alert. It excludes progression during treatment for known metastatic disease. No pooled estimates or cross-assay performance rankings are calculated. A longer observed interval does not establish a survival benefit.

The two day-count explorers use individual published intervals. The numerator counts known intervals greater than or equal to the chosen number of days. The denominator includes every confirmed recurrence in that study's analysis. Undetected signals and unknown timing stay distinct from short or same-day intervals. EBLIS has 29 known intervals including one zero, one positive case with unknown timing, and four undetected cases. Source figures and reported medians retain their original units. Evidence reviewed 12 November 2026.

[Download the extracted summaries](./study-evidence.csv) · [Frontier’s surveillance research question](https://frontierdiagnostics.net/blood-tests-for-cancer-recurrence-how-ctc-monitoring-could-support-follow-up-care/) · [Frontier’s published development status](https://frontierdiagnostics.net/the-big-picture-on-breast-cancer/)

## Run locally

The site is static HTML, CSS and JavaScript, with locally hosted typefaces and no external service or patient-data input. Start a static server in this folder (for example, `python3 -m http.server 8000`) and visit `http://localhost:8000`.

```sh
node tools/export.mjs
node --test test/evidence.test.mjs
```

The extraction records and source locations live in [evidence.mjs](./evidence.mjs). The tests check the source-based thresholds, denominators, bookmark handling, copy text and CSV consistency. DM Sans and Instrument Serif are distributed under the SIL Open Font License, included in [fonts](./fonts/).
