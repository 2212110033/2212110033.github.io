const API = "https://quiz-answer-api.2212110033v.workers.dev";

const CODE = "NO1";

const KEYS = [
  "a1",
  "a2_plain","a2_shift","a2_direction","a2_encrypted",
  "a3","quiz_image","quiz_image_name","quiz_image_type","quiz_image_size"
];

async function cloudLoad() {
  const r = await fetch(`${API}?code=${encodeURIComponent(CODE)}`, { cache: "no-store" });
  const d = await r.json();
  for (const k of KEYS) if (typeof d[k] === "string") localStorage.setItem(k, d[k]);
  alert(`クラウド読込OK（${CODE}）※編集内容は上書きされる`);
}

async function cloudSave() {
  const payload = {};
  for (const k of KEYS) payload[k] = localStorage.getItem(k) || "";
  await fetch(`${API}?code=${encodeURIComponent(CODE)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  alert(`クラウド保存OK（${CODE}）`);
}

// HTMLから呼べるように
window.cloudLoad = cloudLoad;
window.cloudSave = cloudSave;
