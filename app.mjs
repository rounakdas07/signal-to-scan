import {studies, groups, countWindow, findingText, readSelection, selectionURL} from "./evidence.mjs";

const $ = id => document.getElementById(id);
let {study: current, days: minimum} = readSelection(location.search);
let drawnGroup;
let copyVersion = 0;

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function sourceLink(text, url) {
  const a = element("a", "", text);
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener";
  return a;
}

function renderPicker() {
  document.querySelectorAll("[data-group]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.group === current.group));
  });
  if (drawnGroup !== current.group) {
    const items = studies.filter(study => study.group === current.group);
    $("study-list").replaceChildren(...items.map(study => {
      const button = element("button", "study-option");
      button.type = "button";
      button.dataset.study = study.id;
      const stack = element("span", "option-stack");
      stack.append(element("b", "", study.name), element("small", "", study.nav));
      const arrow = element("span", "option-arrow", "→");
      arrow.setAttribute("aria-hidden", "true");
      button.append(stack, arrow);
      button.addEventListener("click", () => selectStudy(study));
      return button;
    }));
    $("study-select").replaceChildren(...items.map(study => new Option(study.name + " · " + study.year, study.id)));
    drawnGroup = current.group;
  }
  document.querySelectorAll("[data-study]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.study === current.id));
  });
  $("study-select").value = current.id;
}

function windowControls() {
  const control = element("div", "window-controls");
  const label = element("p", "chart-kicker", "Minimum interval");
  label.id = "window-label";
  const switches = element("div", "window-switches");
  switches.setAttribute("role", "group");
  switches.setAttribute("aria-labelledby", label.id);
  for (const days of current.windows) {
    const button = element("button", "day", days + "d");
    button.type = "button";
    button.dataset.days = days;
    button.setAttribute("aria-label", "At least " + days + " days");
    button.addEventListener("click", () => {
      minimum = days;
      history.replaceState(null, "", selectionURL(current, minimum, location.href));
      drawWindow();
      $("announcer").textContent = $("window-result").textContent;
      clearCopy();
    });
    switches.append(button);
  }
  control.append(label, switches);
  return control;
}

function drawWindow() {
  const counts = countWindow(current, minimum);
  document.querySelectorAll("[data-days]").forEach(button => {
    button.setAttribute("aria-pressed", String(Number(button.dataset.days) === minimum));
  });
  const output = $("window-result");
  output.replaceChildren(element("strong", "", counts.reached + " of " + counts.total),
    document.createTextNode(" relapses had a documented interval of at least " + minimum + " days."));

  if (current.visual === "timeline") {
    document.querySelectorAll(".timeline-value").forEach(node => {
      node.dataset.meets = String(Number(node.dataset.value) >= minimum);
    });
    return;
  }
  const grid = $("dot-grid");
  grid.replaceChildren();
  for (const [kind, count] of Object.entries({reached:counts.reached, shorter:counts.shorter, undetected:counts.undetected, unknown:counts.unknown})) {
    for (let index=0; index<count; index++) grid.append(element("i", "dot " + kind));
  }
  const legend = $("dot-legend");
  const labels = [
    ["reached", counts.reached + " met interval"], ["shorter", counts.shorter + " below interval"],
    ["undetected", counts.undetected + " undetected"], ["unknown", counts.unknown + " timing unknown"],
  ];
  legend.replaceChildren(...labels.map(([type, label]) => {
    const line = element("span", "legend-item");
    const dot = element("i", "dot " + type);
    dot.setAttribute("aria-hidden", "true");
    line.append(dot, document.createTextNode(label));
    return line;
  }));
}

function buildTimeline() {
  const container = element("div", "timeline");
  container.setAttribute("role", "img");
  container.setAttribute("aria-label", "Two confirmed cases. From the positive blood test, 43 days to confirmation in one case and 69 in the other.");
  const plot = element("div", "plot");
  for (const days of current.days) {
    const row = element("div", "timeline-row");
    const track = element("div", "timeline-track");
    const bar = element("span", "timeline-value");
    bar.dataset.value = days;
    bar.style.width = (days / 90) * 100 + "%";
    bar.append(element("i", "line-dot"), element("b", "line-label", days + "d"));
    track.append(bar);
    row.append(track);
    plot.append(row);
  }
  const ticks = element("div", "ticks");
  for (const day of [0,30,60,90]) ticks.append(element("span", "", String(day)));
  const axisLabel = element("p", "axis-label", "Days after positive blood test");
  container.append(plot, ticks, axisLabel);
  return container;
}

function buildBars() {
  const group = element("div", "bars");
  current.bars.forEach(bar => {
    const row = element("div", "bar-row");
    const label = element("div", "bar-label");
    label.append(element("span", "", bar.label), element("b", "", bar.part + " / " + bar.total));
    const track = element("div", "bar-track");
    track.setAttribute("aria-hidden","true");
    const fill = element("div", bar.muted ? "bar-fill muted" : "bar-fill");
    fill.style.width = (100 * bar.part / bar.total) + "%";
    track.append(fill);
    row.append(label, track);
    group.append(row);
  });
  return group;
}

function renderChart() {
  const box = $("chart-box");
  box.replaceChildren();
  if (current.visual === "bars") {
    box.append(element("h3", "chart-title", current.chartTitle), buildBars());
    return;
  }
  if (current.visual === "timeline") {
    box.append(element("h3", "chart-title", "Days to confirmed recurrence"), buildTimeline());
  } else {
    box.append(element("h3", "chart-title", "One dot per confirmed relapse"));
    const grid = element("div", "dot-grid");
    grid.id = "dot-grid";
    grid.setAttribute("aria-hidden", "true");
    const legend = element("div", "dot-legend");
    legend.id = "dot-legend";
    box.append(grid,legend);
  }
  const output = element("p", "window-result");
  output.id = "window-result";
  box.append(windowControls(), output);
  drawWindow();
}

function clearCopy() {
  copyVersion++;
  $("copy-finding").classList.remove("copied");
  $("copy-finding").lastChild.textContent = "Copy finding";
  $("copy-fallback").hidden = true;
}

function renderStudy() {
  renderPicker();
  $("study-name").textContent = current.name;
  $("byline").textContent = current.by + " · " + current.year;
  const metric = $("metric");
  metric.classList.toggle("long-metric", current.id === "genoctc" || current.id === "ctrak");
  metric.replaceChildren(document.createTextNode(current.result));
  if (current.unit) metric.append(document.createTextNode(" "), element("span", "unit", current.unit));
  $("summary").textContent = current.summary;
  $("cohort").textContent = current.cohort;
  $("scan-comment").textContent = current.scan;
  $("compare-scans").hidden = current.id === "aanestad" || current.id === "ctrak";
  $("paper-link").href = current.paper;
  const design = $("design-info");
  const label = element("p", "design-label", current.journal + " · " + current.locator);
  design.replaceChildren(label,element("p", "", current.design));
  if (current.extra) design.append(sourceLink(current.extra.title + " ↗", current.extra.url));
  design.hidden = true;
  $("toggle-design").setAttribute("aria-expanded", "false");
  $("toggle-design").lastElementChild.textContent = "＋";
  clearCopy();
  renderChart();
}

function selectStudy(study, {focusCard = false} = {}) {
  if (!study || current.id === study.id) return;
  current = study;
  minimum = study.defaultDays;
  history.pushState(null, "", selectionURL(current, minimum, location.href));
  renderStudy();
  $("announcer").textContent = current.name + ". " + current.result + " " + current.unit + ". " + current.summary;
  if (focusCard) $("selected-study").focus({preventScroll:true});
}

document.querySelectorAll("[data-group]").forEach(button => button.addEventListener("click", () => {
  if (button.dataset.group !== current.group) selectStudy(studies.find(study => study.id === groups[button.dataset.group].first));
}));
$("study-select").addEventListener("change", event => selectStudy(studies.find(study => study.id === event.target.value)));
$("compare-scans").addEventListener("click", () => {
  selectStudy(studies.find(study => study.id === "aanestad"), {focusCard:true});
  $("selected-study").scrollIntoView({block:"start"});
});
$("toggle-design").addEventListener("click", () => {
  const details = $("design-info");
  details.hidden = !details.hidden;
  $("toggle-design").setAttribute("aria-expanded", String(!details.hidden));
  $("toggle-design").lastElementChild.textContent = details.hidden ? "＋" : "−";
});
$("copy-finding").addEventListener("click", async () => {
  const revision = ++copyVersion;
  const text = findingText(current, minimum);
  try {
    await navigator.clipboard.writeText(text);
    if (revision !== copyVersion) return;
    $("copy-finding").classList.add("copied");
    $("copy-finding").lastChild.textContent = "Copied";
    $("announcer").textContent = "Finding and source copied.";
  } catch {
    if (revision !== copyVersion) return;
    $("copy-fallback").hidden = false;
    $("copy-text").value = text;
    $("copy-text").focus();
    $("copy-text").select();
  }
});
document.querySelector(".method-link").addEventListener("click", () => {
  $("methods").open = true;
});
$("sources").replaceChildren(...studies.map(study => {
  const row = element("li");
  row.append(sourceLink(study.by + " (" + study.year + ") · " + study.name + " ↗", study.paper),
    element("span", "", study.locator));
  if (study.extra) row.append(sourceLink(study.extra.title + " ↗", study.extra.url));
  return row;
}));
window.addEventListener("popstate", () => {
  const selection = readSelection(location.search);
  current = selection.study;
  minimum = selection.days;
  renderStudy();
  if (location.hash === "#methods") $("methods").open = true;
});
if (location.hash === "#methods") $("methods").open = true;
renderStudy();
