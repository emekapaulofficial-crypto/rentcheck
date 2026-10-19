/* Paste your Supabase Project URL and ANON (public) key. Never put the service_role key here. */
const RC = { url: "https://holnihsidzrezgoiwerc.supabase.co", key: "sb_publishable_3mm4oBhqP9Dmu13sUcgjMw_CHMETNJE" };
const STATES = ["Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT Abuja","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"];
const configured = () => !RC.url.startsWith("YOUR_");
const sb = configured() ? supabase.createClient(RC.url, RC.key) : null;
const $ = id => document.getElementById(id);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&", "<": "<", ">": ">", '"': """, "'": "'" }[c]));
function say(text, ok) { const e = $("msg"); e.textContent = text || ""; e.className = ok ? "ok" : "err"; }
function show(id) { document.querySelectorAll(".view").forEach(v => v.hidden = v.id !== id); }
function stateOptions() { return STATES.map(s => <option>${esc(s)}</option>).join(""); }
function naira(n) { return n == null || n === "" ? "—" : "₦" + Number(n).toLocaleString("en-NG"); }
const STYLE = *{box-sizing:border-box}body{font-family:system-ui,sans-serif;margin:0;background:#f4f6f5;color:#14211b} header{background:#0f3d2e;color:#fff;padding:14px 16px;display:flex;justify-content:space-between;align-items:center} header a{color:#c8f169;text-decoration:none;font-size:14px}main{max-width:760px;margin:0 auto;padding:16px} .card{background:#fff;border-radius:12px;padding:16px;margin:0 0 14px;box-shadow:0 1px 3px #0001} label{display:block;font-size:13px;font-weight:600;margin:10px 0 4px}input,select,textarea{width:100%;padding:10px;border:1px solid #c5cec9;border-radius:8px;font:inherit} button{background:#0f3d2e;color:#fff;border:0;border-radius:8px;padding:10px 14px;font:inherit;cursor:pointer;margin:8px 6px 0 0} button.alt{background:#fff;color:#0f3d2e;border:1px solid #0f3d2e}button.bad{background:#b3261e} .pill{display:inline-block;padding:2px 9px;border-radius:99px;background:#e6efe9;font-size:12px} #msg{padding:0 16px;max-width:760px;margin:8px auto;font-size:14px}.ok{color:#146c2e}.err{color:#b3261e} .row{display:grid;grid-template-columns:1fr 1fr;gap:10px}small{color:#51615a};
if(!window.RC_NO_STYLE)document.head.insertAdjacentHTML("beforeend", <style>${STYLE}</style>);
i dont think the key is here
