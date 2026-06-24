const entries = window.VEGO_DICTIONARY || [];

const state = {
  category: "全部",
  query: "",
  selectedId: 0,
};

const categoryList = document.querySelector("#categoryList");
const termList = document.querySelector("#termList");
const searchInput = document.querySelector("#searchInput");
const resultCount = document.querySelector("#resultCount");
const clearButton = document.querySelector("#clearButton");

const detailCategory = document.querySelector("#detailCategory");
const detailTerm = document.querySelector("#detailTerm");
const detailPronunciation = document.querySelector("#detailPronunciation");
const detailMeaning = document.querySelector("#detailMeaning");
const detailUsage = document.querySelector("#detailUsage");
const detailExample = document.querySelector("#detailExample");
const speakButton = document.querySelector("#speakButton");
const readControls = document.querySelector(".read-controls");

let availableVoices = [];
let speakingToken = 0;

const preferredEnglishVoiceNames = [
  "Samantha",
  "Flo",
  "Sandy",
  "Shelley",
  "Kathy",
  "Karen",
  "Moira",
];

const noveltyVoiceNames = [
  "Bad News",
  "Bahh",
  "Bells",
  "Boing",
  "Bubbles",
  "Cellos",
  "Good News",
  "Jester",
  "Junior",
  "Organ",
  "Superstar",
  "Trinoids",
  "Whisper",
  "Wobble",
  "Zarvox",
];

const normalizedEntries = entries.map((entry, index) => ({
  ...entry,
  id: index,
  search: [entry.term, entry.pronunciation, entry.meaning, entry.usage, entry.example, entry.keywords]
    .join(" ")
    .toLowerCase(),
}));

function categories() {
  const counts = new Map();
  counts.set("全部", normalizedEntries.length);
  for (const entry of normalizedEntries) {
    counts.set(entry.category, (counts.get(entry.category) || 0) + 1);
  }
  return [...counts.entries()];
}

function filteredEntries() {
  const query = state.query.trim().toLowerCase();
  return normalizedEntries.filter((entry) => {
    const categoryMatch = state.category === "全部" || entry.category === state.category;
    const queryMatch = !query || entry.search.includes(query);
    return categoryMatch && queryMatch;
  });
}

function renderCategories() {
  categoryList.innerHTML = "";
  for (const [name, count] of categories()) {
    const button = document.createElement("button");
    button.className = "category-button";
    button.type = "button";
    button.setAttribute("aria-current", String(state.category === name));
    button.innerHTML = `<span>${name}</span><span>${count}</span>`;
    button.addEventListener("click", () => {
      state.category = name;
      const first = filteredEntries()[0];
      if (first) state.selectedId = first.id;
      render();
    });
    categoryList.appendChild(button);
  }
}

function renderList() {
  const results = filteredEntries();
  resultCount.textContent = `${results.length} terms`;
  termList.innerHTML = "";

  if (!results.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "没有找到匹配词条";
    termList.appendChild(empty);
    return;
  }

  if (!results.some((entry) => entry.id === state.selectedId)) {
    state.selectedId = results[0].id;
  }

  for (const entry of results) {
    const button = document.createElement("button");
    button.className = "term-item";
    button.type = "button";
    button.setAttribute("aria-selected", String(entry.id === state.selectedId));
    button.innerHTML = `
      <span class="term-category">${entry.category}</span>
      <span class="term-title">${escapeHtml(entry.term)}</span>
      <span class="term-subtitle">${escapeHtml(entry.pronunciation || entry.meaning)}</span>
    `;
    button.addEventListener("click", () => {
      state.selectedId = entry.id;
      render();
    });
    termList.appendChild(button);
  }
}

function selectedEntry() {
  return normalizedEntries.find((entry) => entry.id === state.selectedId) || filteredEntries()[0] || normalizedEntries[0];
}

function renderDetail() {
  const entry = selectedEntry();
  if (!entry) return;

  detailCategory.textContent = entry.category;
  detailTerm.textContent = entry.term;
  detailPronunciation.textContent = `朗读: ${spokenTerm(entry.term)}`;
  detailMeaning.textContent = entry.meaning || "暂无解释";
  detailUsage.textContent = entry.usage || "暂无场景";
  detailExample.textContent = entry.example || `Use ${entry.term} in the correct VEGO context.`;
}

function render() {
  renderCategories();
  renderList();
  renderDetail();
}

function refreshVoices() {
  if (!("speechSynthesis" in window)) return;
  availableVoices = window.speechSynthesis.getVoices();
}

function northAmericanFemaleVoices() {
  const candidates = availableVoices.filter((voice) => voice.lang === "en-US" || voice.lang === "en-CA");
  const preferred = candidates.filter((voice) =>
    preferredEnglishVoiceNames.some((name) => voice.name.includes(name)),
  );
  const clean = preferred.length ? preferred : candidates.filter((voice) => !isNoveltyVoice(voice));
  return clean.sort((a, b) => voiceRank(a) - voiceRank(b));
}

function voiceRank(voice) {
  const index = preferredEnglishVoiceNames.findIndex((name) => voice.name.includes(name));
  if (index >= 0) return index;
  if (voice.lang === "en-US") return 100;
  return 200;
}

function isNoveltyVoice(voice) {
  return noveltyVoiceNames.some((name) => voice.name.includes(name));
}

function preferredVoice(lang) {
  if (lang === "en-US") {
    const candidates = northAmericanFemaleVoices();
    return candidates[0] || null;
  }

  const prefix = lang.split("-")[0];
  const candidates = availableVoices.filter((voice) => voice.lang === lang || voice.lang.startsWith(prefix));
  return candidates.find((voice) => voice.default) || candidates[0] || null;
}

function spokenTerm(term) {
  const overrides = {
    CTA: "C T A",
    PDP: "P D P",
    PLP: "P L P",
    OOS: "O O S",
    DS: "D S",
    VEGO: "Vego",
  };

  if (overrides[term]) return overrides[term];

  return term
    .replace(/\//g, " slash ")
    .replace(/-/g, " ")
    .replace(/\b[A-Z]{2,}\b/g, (match) => overrides[match] || match.split("").join(" "))
    .replace(/\s+/g, " ")
    .trim();
}

function speakSegment(text, lang = "zh-CN", onend = () => {}) {
  if (!("speechSynthesis" in window)) {
    alert("当前浏览器不支持朗读功能。");
    setSpeaking(false);
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.voice = preferredVoice(lang) || null;
  utterance.rate = lang === "en-US" ? 0.92 : 0.9;
  utterance.pitch = 1;
  utterance.onerror = onend;
  utterance.onend = onend;
  window.speechSynthesis.speak(utterance);
}

function setSpeaking(isSpeaking) {
  if (!speakButton) return;
  speakButton.classList.toggle("is-speaking", isSpeaking);
  speakButton.setAttribute("aria-pressed", String(isSpeaking));
}

function speakSegments(segments) {
  const queue = segments.filter((segment) => segment.text && segment.text.trim());
  if (!queue.length) return;
  const token = ++speakingToken;
  window.speechSynthesis.cancel();
  setSpeaking(true);

  const speakNext = () => {
    if (token !== speakingToken) return;
    const segment = queue.shift();
    if (!segment) {
      setSpeaking(false);
      return;
    }
    speakSegment(segment.text, segment.lang, speakNext);
  };

  speakNext();
}

function readText(type) {
  const entry = selectedEntry();
  if (!entry) return;
  if (type === "term") {
    speakSegments([{ text: spokenTerm(entry.term), lang: "en-US" }]);
    return;
  }
  if (type === "example") {
    speakSegments([{ text: entry.example, lang: "en-US" }]);
    return;
  }
  speakSegments([
    { text: spokenTerm(entry.term), lang: "en-US" },
    { text: `${entry.meaning}。VEGO 场景：${entry.usage}`, lang: "zh-CN" },
  ]);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  const first = filteredEntries()[0];
  if (first) state.selectedId = first.id;
  render();
});

clearButton.addEventListener("click", () => {
  state.query = "";
  state.category = "全部";
  searchInput.value = "";
  state.selectedId = 0;
  render();
});

speakButton.addEventListener("click", () => {
  const entry = selectedEntry();
  if (!entry) return;
  speakSegments([{ text: spokenTerm(entry.term), lang: "en-US" }]);
});

readControls.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-read]");
  if (!button) return;
  readText(button.dataset.read);
});

refreshVoices();
if ("speechSynthesis" in window) {
  if (typeof window.speechSynthesis.addEventListener === "function") {
    window.speechSynthesis.addEventListener("voiceschanged", refreshVoices);
  } else {
    window.speechSynthesis.onvoiceschanged = refreshVoices;
  }
}

render();
