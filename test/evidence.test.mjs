import assert from "node:assert/strict";
import test from "node:test";
import {readFile} from "node:fs/promises";
import {studies, groups, countWindow, readSelection, selectionURL, findingText} from "../evidence.mjs";
import {evidenceCSV} from "../tools/export.mjs";

const geno = studies.find(s => s.id === "genoctc");
const eblis = studies.find(s => s.id === "eblis");

test("all six cohorts have distinct primary sources, an assay family and an endpoint", () => {
  assert.equal(studies.length,6);
  assert.equal(new Set(studies.map(s => s.paper)).size,6);
  for (const s of studies) {
    assert.ok(groups[s.group]);
    assert.match(s.paper,/^https:\/\/doi\.org\//);
    assert.ok(s.endpoint && s.scan && s.cohort && s.design && s.locator);
    if (s.bars) assert.ok(s.bars.every(b => b.part >= 0 && b.total >= b.part && b.total > 0));
  }
});

test("two GenoCTC intervals are clinical confirmations; changing the threshold never changes the denominator", () => {
  assert.deepEqual(geno.days,[43,69]);
  assert.deepEqual(geno.windows.map(d => countWindow(geno,d).reached),[2,1,0]);
  assert.equal(countWindow(geno,90).total,2);
});

test("EBLIS Table 3 thresholds include all relapses, same-day, missing-date and undetected", () => {
  assert.equal(eblis.days.length,29);
  assert.equal(eblis.days.filter(d => d === 0).length,1);
  assert.deepEqual(eblis.windows.map(d => countWindow(eblis,d).reached),[28,28,26,22,13]);
  for (const d of eblis.windows) {
    const r = countWindow(eblis,d);
    assert.equal(r.reached + r.shorter + r.unknown + r.undetected,34);
    assert.equal(r.unknown,1);
    assert.equal(r.undetected,4);
  }
});

test("window count includes an interval exactly on the boundary", () => {
  const fixture = {...geno,days:[60,61]};
  assert.equal(countWindow(fixture,60).reached,2);
});

test("studies with no reported individual intervals cannot produce a threshold result", () => {
  assert.throws(() => countWindow(studies.find(s => s.id === "e5103"),60),RangeError);
  assert.throws(() => countWindow(geno,35),RangeError);
  assert.throws(() => countWindow(geno,NaN),RangeError);
});

test("each bookmark reproduces both study and threshold without carrying an old method anchor", () => {
  for (const study of studies) {
    for (const days of study.windows ?? [undefined]) {
      const url = selectionURL(study,days,"https://example.org/project/?days=365#methods");
      assert.equal(url.hash,"");
      assert.deepEqual(readSelection(url.search),{study,days});
    }
  }
  assert.deepEqual(readSelection("?study=misspelt&days=10000"),{study:geno,days:60});
  assert.deepEqual(readSelection("?study=genoctc&days=365"),{study:geno,days:60});
});

test("copy-ready text preserves endpoint, limitations, current count and citation", () => {
  const c = findingText(eblis,180);
  assert.match(c,/34 observed relapses, 22/);
  assert.match(c,/unknown timing/);
  assert.ok(c.includes(eblis.paper) && c.includes(eblis.extra.url));
  assert.match(findingText(geno,60),/scheduled imaging is unknown/);
});

test("downloadable extraction sheet is current and includes every study", async () => {
  const csv = await readFile(new URL("../study-evidence.csv", import.meta.url),"utf8");
  assert.equal(csv,evidenceCSV());
  assert.equal(csv.trimEnd().split("\r\n").length,7);
  for(const s of studies) assert.ok(csv.includes(s.paper) && csv.includes(s.endpoint));
});
