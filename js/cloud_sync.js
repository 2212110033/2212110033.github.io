const API = "https://quiz-answer-api.2212110033v.workers.dev";

function detectCode() {
  const parts = location.pathname.split("/").filter(Boolean);
  const noFolder = parts.find(p => /^No\.\d+$/.test(p));
  if (noFolder) return noFolder.replace("No.", "NO");
  return "NO1";
}
const CODE = detectCode();

const KEYS = [
  "a1",
  "a2_plain","a2_shift","a2_direction","a2_encrypted",
  "a3","quiz_image","quiz_image_name","quiz_image_type","quiz_image_size"
];

async function cloudPull() {
  try {
    const r = await fetch(`${API}?code=${encodeURIComponent(CODE)}`, { cache: "no-store" });
    const d = await r.json();

    for (const k of KEYS) {
      if (typeof d[k] === "string") localStorage.setItem(k, d[k]);
    }

    const a1El = document.getElementById("a1");
    if (a1El) a1El.textContent = localStorage.getItem("a1") || "xxx";

  } catch (e) {
    console.warn("cloud pull failed", e);
  }
}

cloudPull();
