
//#region node_modules/.pnpm/@tempad-dev+plugins@0.1.0/node_modules/@tempad-dev/plugins/dist/index.js
function definePlugin(plugin) {
	return plugin;
}

//#endregion
//#region node_modules/.pnpm/transform-to-tailwindcss-core@0.0.19/node_modules/transform-to-tailwindcss-core/dist/index.mjs
var Lt$1 = /^(?:calc|clamp|min|max)\s*\(.*\)/, _t$1 = /^-?[0-9\.]+(px|rem|em|%|vw|vh|vmin|vmax|deg)$/, I$1 = [
	"top",
	"right",
	"bottom",
	"left",
	"center"
];
function L(t) {
	return t.startsWith("calc(");
}
function f(t) {
	return t.split("-")[0];
}
function u(t) {
	let o = t.split("-");
	return o[o.length - 1];
}
function Ft$1(t) {
	return t.startsWith("url(");
}
function E$1(t) {
	return t.endsWith("%");
}
function zt$1(t) {
	return /^#[0-9A-Fa-f]{2,}$/.test(t);
}
function w$1(t) {
	return t.startsWith("rgb");
}
function Tt$1(t) {
	return t.startsWith("hsl");
}
function Ct$1(t) {
	return t.startsWith("linear-gradient") || t.startsWith("radial-gradient") || t.startsWith("conic-gradient");
}
function _$1(t) {
	return Ft$1(t) || Rt$1(t) || R$1(t) || Ct$1(t) || j$1(t) || L(t);
}
function s(t, o, r = "") {
	return _$1(t) ? `-[${r}${Mt$1(o ? o(t) : t, "all").replace(/['"]/g, "")}]` : `-${o ? o(t) : t}`;
}
function v$1(t) {
	if (t.endsWith("%") || t.endsWith("deg") || t === "0") return t;
	let o = +t * 100;
	return Number.isNaN(o) ? `${o}` : `${o}%`;
}
function W$1(t) {
	return t.replace(/\s+/, " ").split(" ").join("-");
}
function d(t) {
	return t.replace(/\s+/, " ").split(" ").join("_");
}
function Mt$1(t, o = "around") {
	return o === "pre" ? t.replace(/(^\s*)/g, "") : o === "post" ? t.replace(/(\s*$)/g, "") : o === "all" ? t.replace(/\s+/g, "") : o === "around" ? t.replace(/(^\s*)|(\s*$)/g, "") : t;
}
function i(t) {
	return t = t.replace(/\s+/, " ").replace(/\s*,\s*/g, ",").replace(/\s*\/\s*/, "/"), /rgb/.test(t) && (t = t.replace(/rgba?\(([^\)]+)\)/g, (o, r) => {
		let n = r.trim().split(" ");
		return o.replace(r, n.map((e$1, a$1) => e$1.endsWith(",") ? e$1 : e$1 + (n.length - 1 === a$1 ? "" : ",")).join(""));
	})), /hsl/.test(t) && (t = t.replace(/hsla?\(([^\)]+)\)/g, (o, r) => {
		let n = r.trim().split(" ");
		return o.replace(r, n.map((e$1, a$1) => e$1.endsWith(",") ? e$1 : e$1 + (n.length - 1 === a$1 ? "" : ",")).join(""));
	})), /var\([^\)]+\)/.test(t) && (t = t.replace(/var\(([^\)]+)\)/g, (o, r) => {
		let n = r.trim().split(" ");
		return o.replace(r, n.map((e$1, a$1) => e$1.endsWith(",") ? e$1 : e$1 + (n.length - 1 === a$1 ? "" : ",")).join(""));
	})), t.endsWith("!important") ? [t.replace(/\s*\!important/, "").trim(), "!"] : [t.trim(), ""];
}
function G$1(t) {
	return t.replace(/\(\s*/g, "(").replace(/\s*\)/g, ")").replace(/\s*,\s*/g, ",");
}
function j$1(t) {
	return t.startsWith("var(--");
}
function R$1(t) {
	return Lt$1.test(t) || _t$1.test(t) || I$1.includes(t);
}
function Rt$1(t) {
	return zt$1(t) || w$1(t) || Tt$1(t);
}
function z$1(t, o) {
	let [r, n] = i(o);
	return `${n}${t[0]}${s(r, _$1(r) ? void 0 : f)}`;
}
var Pt$1 = [
	"background-color",
	"background-attachment",
	"background-image"
], St$1 = /linear-gradient\(\s*to([\w\s]+),?([\w\(\)#%\s\.]+)?,([\w\(\)#%\s\.]+)?,?([\w#%\s\.]+)?\)$/, Ut$1 = /(radial|conic)-gradient\(([\w\(\)#%\s\.]+)?,([\w\(\)#%\s\.]+)?,?([\w#%\s\.]+)?\)$/, F = "__comma__";
function U$1(t, o) {
	let [r, n] = i(o);
	if (t === "background-size") return `${n}bg${s(r, S$1, "length:")}`;
	if (t === "background-position") return `${n}bg${s(r, (e$1) => _$1(r) ? d(e$1) : `[${d(e$1)}]`)}`;
	if (Pt$1.includes(t)) return `${n}bg${s(r, d)}`;
	if (t === "background") {
		if (R$1(r)) return `bg${s(r, S$1, "position:")}${n}`;
		if (/^(linear)-gradient/.test(r)) {
			let p = r.replace(/rgba?\(([^\)]+)\)/g, (h$1, N$1) => h$1.replace(N$1, N$1.replace(/\s*,\s*/g, F))).match(St$1);
			if (!p) return;
			let [l$1, $$1, c, g] = p.slice(1);
			return l$1 = l$1.split(" ").map((h$1) => h$1[0]).join(""), l$1 ? `bg-gradient-to-${l$1}${P$1($$1, c, g)}` : P$1($$1, c, g);
		} else if (/^(radial|conic)-gradient/.test(r)) {
			let p = r.replace(/rgba?\(([^\)]+)\)/g, (h$1, N$1) => h$1.replace(N$1, N$1.replace(/\s*,\s*/g, F))).match(Ut$1);
			if (!p) return;
			let l$1 = p[1], [$$1, c, g] = p.slice(2);
			return `bg-gradient-${l$1}${P$1($$1, c, g)}`;
		}
		let e$1 = r.match(/^rgba?\([^)]+\)$/);
		if (e$1) {
			let m = e$1[0];
			r = r.replace(m, `[${m}]`);
		}
		let a$1 = r.match(/^url\(["'\s\.\-_\w\/]*\)$/);
		if (a$1 && (r = r.replace(a$1[0], `[${a$1[0].replace(/['"]/g, "")}]`)), r.includes(" ")) {
			let m = r.split(" ").map(($$1) => U$1(t, `${$$1}${n ? " !important" : ""}`)).join(" "), p = /bg-\[position:([^\]]*)\]/g, l$1 = m.match(p);
			if (l$1 && l$1.length > 1) {
				let $$1 = `bg-[position:${l$1.map((c) => c.replace(p, "$1")).join("_")}]`;
				m = `${m.replace(p, "").replace(/\s+/g, " ").split(" ").filter(Boolean).concat([$$1]).join(" ")}`;
			}
			return m;
		}
		return r.split(" ").map((m) => `${n}bg${s(m)}`).join(" ");
	} else if (t === "background-blend-mode") return `${n}bg-blend-${r}`;
	return `${n}${At$1(t, r)}-${Bt$1(r)}`;
}
function At$1(t, o) {
	return o.endsWith("repeat") ? "bg" : t.replace("background", "bg");
}
function Bt$1(t) {
	return /(border)|(content)|(padding)-box/.test(t) ? t.replace("-box", "") : t.startsWith("repeat-") ? t.replace("repeat-", "") : S$1(t);
}
function S$1(t) {
	return t.replace(/\s+/, " ").replace(" ", "-");
}
function P$1(t, o, r) {
	let n = "";
	if (o && !r && (r = o, o = ""), t) {
		t = t.replaceAll(F, ",");
		let [e$1, a$1] = t.split(" ");
		a$1 ? n += ` from-${w$1(e$1) ? `[${e$1}]` : e$1} from-${a$1}` : e$1 && (n += ` from-${w$1(e$1) ? `[${e$1}]` : e$1}`);
	}
	if (o) {
		o = o.replaceAll(F, ",");
		let [e$1, a$1] = o.split(" ");
		a$1 ? n += ` via-${w$1(e$1) ? `[${e$1}]` : e$1} via-${a$1}` : e$1 && (n += ` via-${w$1(e$1) ? `[${e$1}]` : e$1}`);
	}
	if (r) {
		r = r.replaceAll(F, ",");
		let [e$1, a$1] = r.split(" ");
		a$1 ? n += ` to-${w$1(e$1) ? `[${e$1}]` : e$1} to-${a$1}` : e$1 && (n += ` to-${w$1(e$1) ? `[${e$1}]` : e$1}`);
	}
	return n;
}
function A$1(t, o) {
	let [r, n] = i(o), e$1 = t.split("-"), a$1 = L(r) || j$1(r) ? s(r) : s(f(r));
	return `${n}${e$1[0]}-${e$1[1][0]}${a$1}`;
}
function Z$1(t, o) {
	let [r, n] = i(o);
	if (t === "font-size") return `${n}text${s(r)}`;
	if (t === "font-weight") return `${n}font-${r}`;
	if (t === "font-family") {
		let e$1 = r.match(/ui-(\w{0,4})/);
		if (!e$1) return `${n}font-${o}`;
		let [a$1, m] = e$1;
		return `${n}font-${m}`;
	}
	return t === "font-style" ? r === "normal" ? `${n}font-not-italic` : `${n}font-${r}` : t === "font-variant-numeric" ? r === "normal" ? `${n}normal-nums` : `${n}${r}` : Ht$1(r, n);
}
function Ht$1(t, o) {
	return t.split(" ").map((r) => /^[0-9]/.test(r) ? `${o}text-[${r}]` : `${o}font-${r}`).join(" ");
}
function q$1(t, o) {
	let [r, n] = i(o);
	return `${n}${t}${s(r)}`;
}
var Dt$1 = {
	"margin-left": "ml",
	"margin-right": "mr",
	"margin-top": "mt",
	"margin-bottom": "mb",
	"padding-left": "pl",
	"padding-right": "pr",
	"padding-top": "pt",
	"padding-bottom": "pb"
};
function B$1(t, o) {
	let [r, n] = i(o), e$1 = Dt$1[t];
	if (e$1) return `${n}${e$1}${s(r)}`;
	let a$1 = r.split(" "), m = a$1.length;
	return m === 1 ? `${n}${t[0]}${s(a$1[0])}` : m === 2 ? `${n}${t[0]}x${s(a$1[1])} ${n}${t[0]}y${s(a$1[0])}` : m === 3 ? `${n}${t[0]}x${s(a$1[1])} ${n}${t[0]}t${s(a$1[0])} ${n}${t[0]}b${s(a$1[2])}` : `${n}${t[0]}t${s(a$1[0])} ${n}${t[0]}b${s(a$1[2])} ${n}${t[0]}l${s(a$1[3])} ${n}${t[0]}r${s(a$1[1])}`;
}
function J$1(t, o) {
	let [r, n] = i(o);
	return E$1(o) ? `${n}op-${r.replace("%", "")}` : `${n}op-${+r * 100}`;
}
function K$1(t, o) {
	let [r, n] = i(o);
	return `${n}text${s(r)}`;
}
function O$1(t, o) {
	let [r, n] = i(o);
	return I$1.includes(r) ? `${n}text-${r}` : t === "text-decoration-line" ? r === "none" ? `${n}no-underline` : `${n}${r}` : t === "text-transform" ? r === "none" ? `${n}normal-case` : `${n}${r}` : t.startsWith("text-decoration") || t === "text-indent" ? `${n}${t.split("-")[1]}${s(r)}` : t === "text-underline-offset" ? `${n}underline-offset-${r}` : `${n}text${s(r)}`;
}
function Q$1(t, o) {
	let [r, n] = i(o);
	return `${n}v-${r}`;
}
var X$1 = {
	1: "none",
	1.25: "tight",
	1.375: "snug",
	1.5: "normal",
	1.625: "relaxed",
	2: "loose"
};
function Y$1(t, o) {
	let [r, n] = i(o);
	return X$1[r] ? `${n}leading-${X$1[r]}` : `${n}leading${s(r)}`;
}
var y$1 = [
	"border-left",
	"border-top",
	"border-right",
	"border-bottom"
];
function k$1(t, o) {
	let [r, n] = i(o);
	return t === "border-spacing" ? `${n}${t}-[${d(r)}]` : t === "border-color" ? `${n}border${s(r)}` : t === "border-radius" ? L(r) ? `${n}rounded${s(r)}` : `${n}rounded-[${d(r)}]` : y$1.some((e$1) => t.startsWith(e$1)) ? r.split(" ").map((e$1) => `border-${t.split("-")[1][0]}${s(e$1)}${n}`).join(" ") : t === "border-inline-end-width" ? `${n}border-e${s(r)}` : t === "border-inline-start-width" ? `${n}border-s${s(r)}` : t.startsWith("border-image") ? "" : t === "border-width" && r.includes(" ") ? r.split(" ").map((e$1, a$1) => `border-${y$1[a$1].split("-")[1][0]}${s(e$1)}${n}`).join(" ") : /^\d[%|(px)|(rem)]$/.test(r) || t === "border-collapse" ? `${n}border-${r}` : t === "border-width" || t === "border-style" ? `${n}border${s(r)}` : t === "border-color" ? r === "currentColor" ? `${n}border-current` : `${n}border${s(r)}` : r.split(" ").map((e$1) => r === "currentColor" ? `${n}border-current` : `${n}border${s(e$1)}`).join(" ");
}
function T$1(t, o) {
	let [r, n] = i(o);
	return r === "none" ? `${n}hidden` : r === "hidden" ? `${n}invisible` : `${n}${r}`;
}
function x$1(t, o) {
	let [r, n] = i(o);
	return I$1.includes(r) ? `${n}${t}-${r}` : `${n}${t}${s(r)}`;
}
function V$1(t, o) {
	let [r, n] = i(o);
	return `${n}${t}${s(r)}`;
}
function b$1(t, o) {
	let [r, n] = i(o);
	return I$1.includes(r) ? `${n}${f(t)}-${r}` : `${n}${f(t)}${s(r)}`;
}
function C$1(t, o) {
	let [r, n] = i(o);
	return t.startsWith("box-decoration") ? `${n}box-decoration-${r}` : t === "box-sizing" ? `${n}box-${f(r)}` : `${n}shadow-[${r.split(" ").join("_")}]`;
}
var Et$1 = [
	"contrast",
	"brightness",
	"saturate"
], Gt$1 = [
	"grayscale",
	"invert",
	"sepia"
];
function M$1(t, o) {
	let [r, n] = i(o), [e$1, a$1, m] = r.match(/([\w-]+)\((.*)\)/);
	return Et$1.includes(a$1) ? `${n}${a$1}${s(v$1(m))}` : a$1 === "drop-shadow" ? `${n}drop-${C$1(a$1, m)}` : Gt$1.includes(a$1) ? `${n}${a$1}${s(v$1(m))}` : a$1 === "hue-rotate" ? `${n}${a$1}${s(m.slice(0, -3))}` : `${n}${a$1}${s(m)}`;
}
function tt$1(t, o) {
	let [r, n] = i(o);
	return `${n}backdrop-${M$1(t, r)}`;
}
function rt$1(t, o) {
	let [r, n] = i(o);
	return t === "transform-origin" ? `${n}origin-${W$1(r)}` : t === "transform-style" ? `${n}transform-${r}` : G$1(r).split(" ").map((e$1) => {
		let a$1 = e$1.match(/([a-z]+)([A-Z])?\((.*)\)/);
		if (!a$1) return;
		let [m, p, l$1, $$1] = a$1;
		if (l$1) {
			let c = $$1.replace(/,(?![^()]*\))/g, " ").split(" ");
			return c.length > 1 ? `${n}${p}-[${l$1.toLowerCase()}-${c.map((g) => j$1(g) ? g : s(p === "scale" ? v$1(g) : g)).join("_")}]` : `${n}${p}-${l$1.toLowerCase()}${j$1(c[0]) ? `-[${c[0]}]` : s(p === "scale" ? v$1(c[0]) : c[0])}`;
		} else {
			let c = $$1.replace(/,(?![^()]*\))/g, " ").split(" ");
			if (p === "scale") return c.length > 1 ? `${n}${p}-[${c.join("_")}]` : `${n}${p}${j$1($$1) ? `-[${$$1}]` : s(p === "scale" ? v$1($$1) : $$1)}`;
			let [g, h$1] = c;
			return `${n}${p}-x${s(g)} ${n}${p}-y${s(h$1 != null ? h$1 : g)}`;
		}
	}).filter(Boolean).join(" ");
}
var Zt$1 = ["transition-delay", "transition-duration"];
function nt$1(t, o) {
	let [r, n] = i(o);
	if (t === "transition-timing-function") return r === "linear" ? `${n}ease-${r}` : `${n}ease-[${r}]`;
	if (t === "transition") return qt$1(r, n);
	if (t === "transition-property") return r.includes("color") ? `${n}transition-color` : r === "box-shadow" ? `${n}transition-shadow` : `${n}transition-${r}`;
	if (Zt$1.includes(t)) return `${t.split("-")[1]}-${r.slice(0, -2)}`;
}
function qt$1(t, o = "") {
	let r = !1;
	return t.split(" ").map((n) => {
		if (/^[0-9]/.test(n) || /^\.[0-9]/.test(n)) {
			let e$1 = n.endsWith("s") ? 1e3 * +n.slice(0, -1) : n.slice(0, -3);
			return r ? `${o}delay-${e$1}` : (r = !0, `${o}duration-${e$1}`);
		}
		return n.startsWith("background") ? `${o}transition-colors` : n === "linear" ? `${o}ease-linear` : /^(cubic-bezier)|(ease)/.test(n) ? `${o}${n}` : `${o}transition-${n}`;
	}).join(" ");
}
function ot$1(t, o) {
	let [r, n] = i(o);
	return t === "justify-content" ? `${n}justify-${u(r)}` : `${n}${t}-${u(r)}`;
}
function it$1(t, o) {
	let [r, n] = i(o);
	return `${u(t)}-${u(r)}${n}`;
}
var Jt$1 = [
	"flex-basis",
	"flex-grow",
	"flex-shrink"
];
function et$1(t, o) {
	let [r, n] = i(o);
	if (t === "flex-shrink" && r === "1") return `${n}shrink`;
	if (Jt$1.includes(t)) return `${n}${u(t)}-${r}`;
	if (r === "1") return `${n}flex-1`;
	let e$1 = r[0];
	return t === "flex" && (e$1 === "0" || e$1 === "1") ? `${n}flex-[${d(r)}]` : `${n}${f(t)}-${r.replace("column", "col")}`;
}
function st$1(t, o) {
	let [r, n] = i(o);
	return r === "auto" ? `${f(t)}-${r}` : `${n}${f(t)}-[${r}]`;
}
function at$1(t, o) {
	let [r, n] = i(o);
	return t === "column-gap" ? `${n}gap-x${s(r)}` : `${n}${t}${s(r)}`;
}
function mt$1(t, o) {
	let [r, n] = i(o);
	return o === "isolate" ? `${n}${r}` : `${n}${t}-${r}`;
}
function pt$1(t, o) {
	let [r, n] = i(o);
	return t === "object-position" ? `${n}${f(t)}-${W$1(r)}` : `${n}${f(t)}-${r}`;
}
function ft$1(t, o) {
	let [r, n] = i(o), [e$1, a$1, m] = t.split("-");
	return m ? `${n}${e$1}-${m}-${r}` : `${n}${e$1}-${r}`;
}
function ct$1(t, o) {
	let [r, n] = i(o);
	if (t.startsWith("grid-template")) {
		let a$1 = r.match(/repeat\s*\(\s*([0-9]+)/);
		return a$1 ? `${n}grid-${u(t) === "rows" ? "rows" : "cols"}-${a$1[1]}` : `${n}grid-${u(t) === "rows" ? "rows" : "cols"}-${r.includes(" ") ? `[${d(r)}]` : r}`;
	}
	if (t === "grid-auto-flow") return `${n}grid-flow-${W$1(r).replace("column", "col")}`;
	if (t.startsWith("grid-auto")) {
		let a$1 = r.match(/minmax\s*\(\s*0\s*,\s*1fr/);
		return `${n}auto-${u(t) === "rows" ? "rows" : "cols"}-${a$1 ? "fr" : f(r)}`;
	}
	let e$1 = r.match(/span\s+([0-9])/);
	return e$1 ? `${n}${t.slice(5).replace("column", "col")}-span-${e$1[1]}` : r === "1/-1" ? `${n}${t.slice(5).replace("column", "col")}-span-full` : `${n}${t.slice(5).replace("column", "col")}-${r}`;
}
function ut$1(t, o) {
	let [r, n] = i(o);
	return `${n}gap-y${s(r)}`;
}
function lt$1(t, o) {
	let [r, n] = i(o);
	return `${n}${t}-${u(r)}`;
}
function $t$1(t, o) {
	let [r, n] = i(o);
	return `${n}tracking-${r}`;
}
function gt$1(t, o) {
	let [r, n] = i(o);
	return `${n}whitespace-${r}`;
}
function dt$1(t, o) {
	let [r, n] = i(o);
	return t.startsWith("word-spacing") ? `${n}word-spacing${s(o)}` : r === "keep-all" ? `${n}break-keep` : `${n}break-${u(r)}`;
}
function xt$1(t, o) {
	let [r, n] = i(o);
	return t === "outline-offset" ? `${n}${t}-${r}` : `${n}${f(t)}-${r}`;
}
function bt$1(t, o) {
	let [r, n] = i(o);
	return `${n}mix-blend-${r}`;
}
var Kt$1 = {
	vertical: "y",
	horizontal: "x"
};
function ht$1(t, o) {
	let [r, n] = i(o);
	return r === "both" ? `${n}${t}` : `${n}${t}-${Kt$1[r] || r}`;
}
function wt$1(t, o) {
	let [r, n] = i(o);
	if (t.startsWith("scroll-snap")) return `${n}snap-${r}`;
	if (t === "scroll-behavior") return `${n}scroll-${r}`;
	let [e$1, a$1, m] = t.match(/scroll-(margin|padding)-?([\w]+)?/);
	return m ? `${n}scroll-${a$1[0]}${m[0]}-${r}` : `${n}scroll-${a$1[0]}-${r}`;
}
function It$1(t, o) {
	let [r, n] = i(o);
	return `${n}${u(t)}-${r}`;
}
function vt$1(t, o) {
	let [r, n] = i(o);
	return `${n}${t}-${f(r)}`;
}
function jt$1(t, o) {
	let [r, n] = i(o);
	return t === "animation-delay" ? `${n}animate${s(r)}` : t === "animation" ? `${n}animate-${r.split(" ")[0]}` : `${n}animate-${r}`;
}
function Wt$1(t, o) {
	let [r, n] = i(o);
	return r === "\" \"" || r === "' '" ? `${n}content-['_']` : `${n}content-[${r}]`;
}
var Ot$1 = {
	show: "visible",
	hide: "hidden"
};
function Vt$1(t, o) {
	var e$1;
	let [r, n] = i(o);
	return `${n}table-empty-cells-${(e$1 = Ot$1[r]) != null ? e$1 : r}`;
}
function Nt$1(t, o) {
	return o === "horizontal-tb" ? "write-normal" : `write-${o.replace("-rl", "-right").replace("-lr", "-left")}`;
}
var H$1 = {
	animation: jt$1,
	aspect: st$1,
	backface: b$1,
	caption: b$1,
	column: at$1,
	columns: x$1,
	break: x$1,
	empty: Vt$1,
	box: C$1,
	writing: Nt$1,
	display: T$1,
	float: x$1,
	clear: x$1,
	isolation: mt$1,
	object: pt$1,
	overflow: x$1,
	overscroll: ft$1,
	position: T$1,
	top: V$1,
	left: V$1,
	right: V$1,
	bottom: V$1,
	visibility: T$1,
	z: z$1,
	flex: et$1,
	order: x$1,
	grid: ct$1,
	gap: V$1,
	justify: ot$1,
	align: it$1,
	place: lt$1,
	padding: B$1,
	perspective: x$1,
	margin: B$1,
	width: z$1,
	min: A$1,
	max: A$1,
	height: z$1,
	font: Z$1,
	letter: $t$1,
	line: Y$1,
	list: b$1,
	text: O$1,
	vertical: Q$1,
	white: gt$1,
	word: dt$1,
	content: Wt$1,
	background: U$1,
	border: k$1,
	outline: xt$1,
	opacity: J$1,
	mix: bt$1,
	filter: M$1,
	backdrop: tt$1,
	table: b$1,
	transition: nt$1,
	transform: rt$1,
	accent: b$1,
	appearance: b$1,
	cursor: q$1,
	caret: b$1,
	pointer: x$1,
	resize: ht$1,
	scroll: wt$1,
	touch: b$1,
	user: It$1,
	will: vt$1,
	fill: x$1,
	stroke: b$1,
	color: K$1,
	row: ut$1
}, Qt$1 = /([\w-]+)\s*:\s*([.\w\(\)-\s%+'",#\/!@]+)/;
function D$1(t, o) {
	var l$1;
	let r = t.match(Qt$1);
	if (!r) return;
	let [n, e$1, a$1] = r, m = f(e$1), p = (l$1 = H$1[m]) == null ? void 0 : l$1.call(H$1, e$1, a$1);
	return p && o ? p.replace(/-\[([0-9\.]+)px\]/, ($$1, c) => `-[${+c / 16}rem]`) : p;
}

//#endregion
//#region node_modules/.pnpm/transform-to-unocss-core@0.0.31/node_modules/transform-to-unocss-core/dist/index.mjs
var or = ".__unocss_transfer__", q = /^(?:calc|clamp|min|max)\s*\(.*\)/, Ut = /^-?[0-9\.]+(px|rem|em|%|vw|vh|vmin|vmax|deg)$/;
function V(t) {
	return q.test(t);
}
function l(t) {
	return t.split("-")[0];
}
function $(t) {
	let o = t.split("-");
	return o[o.length - 1];
}
function At(t) {
	return t.startsWith("url(");
}
function P(t) {
	return t.endsWith("%");
}
function R(t) {
	return /^#[0-9A-Fa-f]{2,}$/.test(t);
}
function b(t) {
	return t.startsWith("rgb");
}
function z(t) {
	return t.startsWith("hsl");
}
function a(t, o, r, n = "") {
	return V(t) || At(t) || R(t) || b(t) || z(t) || P(t) || I(t) ? r ? `-[${n}${Z(t, "all").replace(/['"]/g, "")}]` : `="[${n}${Z(t, "all").replace(/['"]/g, "")}]"` : n ? `-[${n}${o ? o(t) : t}]` : `-${o ? o(t) : t}`;
}
function w(t) {
	return typeof t == "string" && t.endsWith("%") ? t.slice(0, -1) : +t * 100;
}
function W(t) {
	return t.replace(/\s+/, " ").split(" ").join("-");
}
function j(t) {
	return t.replace(/\s+/, " ").split(" ").join("_");
}
var Mt = [
	"top",
	"right",
	"bottom",
	"left",
	"center"
];
function Z(t, o = "around") {
	return o === "pre" ? t.replace(/(^\s*)/g, "") : o === "post" ? t.replace(/(\s*$)/g, "") : o === "all" ? t.replace(/\s+/g, "") : o === "around" ? t.replace(/(^\s*)|(\s*$)/g, "") : t;
}
function e(t) {
	return t = t.replace(/\s+/, " ").replace(/\s*,\s*/g, ",").replace(/\s*\/\s*/, "/"), /rgb/.test(t) && (t = t.replace(/rgba?\(([^\)]+)\)/g, (o, r) => {
		let n = r.trim().split(" ");
		return o.replace(r, n.map((i$1, s$1) => i$1.endsWith(",") ? i$1 : i$1 + (n.length - 1 === s$1 ? "" : ",")).join(""));
	})), /hsl/.test(t) && (t = t.replace(/hsla?\(([^\)]+)\)/g, (o, r) => {
		let n = r.trim().split(" ");
		return o.replace(r, n.map((i$1, s$1) => i$1.endsWith(",") ? i$1 : i$1 + (n.length - 1 === s$1 ? "" : ",")).join(""));
	})), /var\([^\)]+\)/.test(t) && (t = t.replace(/var\(([^\)]+)\)/g, (o, r) => {
		let n = r.trim().split(" ");
		return o.replace(r, n.map((i$1, s$1) => i$1.endsWith(",") ? i$1 : i$1 + (n.length - 1 === s$1 ? "" : ",")).join(""));
	})), t.endsWith("!important") ? [t.replace(/\s*\!important/, "").trim(), "!"] : [t.trim(), ""];
}
function J(t) {
	return t.replace(/\(\s*/g, "(").replace(/\s*\)/g, ")").replace(/\s*,\s*/g, ",");
}
function I(t) {
	return t.startsWith("var(--");
}
function Q(t) {
	return q.test(t) || Ut.test(t) || Mt.includes(t);
}
var S = /-webkit-|-moz-|-ms-|-o-/g;
function C(t, o) {
	let [r, n] = e(o);
	return `${t[0]}${a(r, l)}${n}`;
}
var Pt = [
	"background-color",
	"background-attachment",
	"background-position"
], Ht = /linear-gradient\(\s*to([\w\s]+),?([\w\(\)#%\s\.]+)?,([\w\(\)#%\s\.]+)?,?([\w#%\s\.]+)?\)$/, Bt = /linear-gradient\(\s*([^,]*),?([\w\(\)#%\s\.]+)?,([\w\(\)#%\s\.]+)?,?([\w#%\s\.]+)?\)$/, Et = /(radial|conic)-gradient\(([\w\(\)#%\s\.]+)?,([\w\(\)#%\s\.]+)?,?([\w#%\s\.]+)?\)$/, _ = "__comma__";
function B(t, o) {
	let [r, n] = e(o);
	if (t === "background-size") return `bg${a(r, N, !1, "length:")}${n}`;
	if (Pt.includes(t)) return `bg${a(r, N)}${n}`;
	if (["background", "background-image"].includes(t)) {
		if (Q(r)) return `bg${a(r, N, !1, "position:")}${n}`;
		let i$1 = r.replace(/rgba?\([^)]+\)/g, "temp");
		if (/\)\s*,/.test(i$1)) return `bg="[${Dt(r)}]"`;
		if (/^(linear)-gradient/.test(r)) {
			let m = r.replace(/rgba?\(([^)]+)\)/g, (f$1, c) => f$1.replace(c, c.replace(/\s*,\s*/g, _))), g = m.match(Ht);
			if (g) {
				let [f$1, c, d$1, L$1] = g.slice(1);
				return f$1 = f$1.split(" ").map((F$1) => F$1[0]).join(""), f$1 ? `bg-gradient-to-${f$1}${H(c, d$1, L$1)}` : H(c, d$1, L$1);
			}
			let u$1 = m.match(Bt);
			return u$1 ? `bg-gradient-linear bg-gradient-[${u$1[1]},${u$1[2].replace(/\s+/, "_").replaceAll(_, ",")},${u$1[3].replace(/\s+/, "_").replaceAll(_, ",")}]` : void 0;
		} else if (/^(radial|conic)-gradient/.test(r)) {
			let g = r.replace(/rgba?\(([^)]+)\)/g, (L$1, F$1) => L$1.replace(F$1, F$1.replace(/\s*,\s*/g, _))).match(Et);
			if (!g) return;
			let u$1 = g[1], [f$1, c, d$1] = g.slice(2);
			return `bg-gradient-${u$1}${H(f$1, c, d$1)}`;
		}
		let s$1 = r.match(/^rgba?\([^)]+\)$/);
		if (s$1) {
			let m = s$1[0];
			return `bg="${r.replace(m, `[${m}]`)}${n}"`;
		}
		let p = r.match(/^url\(["'\s\.\-_\w\/@]*\)$/);
		if (p) return `bg="${r.replace(p[0], `[${p[0].replace(/['"]/g, "")}]${n}`)}"`;
		if (r.includes(" ")) {
			let m = r.split(" ").map((f$1) => B(t, `${f$1}${n ? " !important" : ""}`)).join(" "), g = /bg-\[position:([^\]]*)\]/g, u$1 = m.match(g);
			if (u$1 && u$1.length > 1) {
				let f$1 = `bg-[position:${u$1.map((c) => c.replace(g, "$1")).join("_")}]`;
				m = `${m.replace(g, "").replace(/\s+/g, " ").split(" ").filter(Boolean).concat([f$1]).join(" ")}`;
			}
			return m;
		}
		return `bg${a(r, N)}${n}`;
	}
	return t === "background-blend-mode" ? `bg-blend-${r}${n}` : `${Gt(t, r)}-${Ot(r)}${n}`;
}
function Gt(t, o) {
	return o.endsWith("repeat") ? "bg" : t.replace("background", "bg");
}
function Ot(t) {
	return /(border)|(content)|(padding)-box/.test(t) ? t.replace("-box", "") : t.startsWith("repeat-") ? t.replace("repeat-", "") : N(t);
}
function N(t) {
	return t.replace(/\s+/, " ").replace(" ", "-");
}
function H(t, o, r) {
	let n = "";
	if (o && !r && (r = o, o = ""), t) {
		t = t.replaceAll(_, ",");
		let [i$1, s$1] = t.split(" ");
		s$1 ? n += ` from="${b(i$1) ? `[${i$1}]` : i$1} ${s$1}"` : i$1 && (n += ` from="${b(i$1) ? `[${i$1}]` : i$1}"`);
	}
	if (o) {
		o = o.replaceAll(_, ",");
		let [i$1, s$1] = o.split(" ");
		s$1 ? n += ` via="${b(i$1) ? `[${i$1}]` : i$1} ${s$1}"` : i$1 && (n += ` via="${b(i$1) ? `[${i$1}]` : i$1}"`);
	}
	if (r) {
		r = r.replaceAll(_, ",");
		let [i$1, s$1] = r.split(" ");
		s$1 ? n += ` to="${b(i$1) ? `[${i$1}]` : i$1} ${s$1}"` : i$1 && (n += ` to="${b(i$1) ? `[${i$1}]` : i$1}"`);
	}
	return n;
}
var X = "__transform_to_unocss__";
function Dt(t) {
	let o = {}, r = 0;
	return t = t.replace(/(rgba?|hsla?|lab|lch|hwb|color)\([\)]*\)/, (n) => (o[r++] = n, `${X}${r}}`)), t = t.split(/\)\s*,/).map((n) => `${n.replace(/\s*,\s*/g, ",").replace(/\s+/g, "_")}`).join("),"), Object.keys(o).forEach((n) => {
		t = t.replace(`${X}${n}}`, o[n]);
	}), t;
}
function E(t, o) {
	let [r, n] = e(o), i$1 = t.split("-"), s$1 = V(r) || I(r) ? a(r) : a(l(r));
	return `${i$1[0]}-${i$1[1][0]}${s$1}${n}`;
}
function Y(t, o) {
	let [r, n] = e(o);
	if (t === "font-size") return `text-${r}${n}`;
	if (t === "font-weight") return `font-${r}${n}`;
	if (t === "font-family") {
		let i$1 = r.match(/ui-(\w{0,4})/);
		if (!i$1) return `font-${o}${n}`;
		let [s$1, p] = i$1;
		return `font-${p}${n}`;
	}
	return t === "font-style" ? r === "normal" ? `font-not-italic${n}` : `font-${r}${n}` : t === "font-variant-numeric" ? r === "normal" ? `normal-nums${n}` : `${r}${n}` : `font="${Kt(r)}${n}"`;
}
function Kt(t) {
	return t.split(" ").map((o) => /^[0-9]/.test(o) ? `text-${o}` : o).join(" ");
}
function y(t, o) {
	let [r, n] = e(o);
	return `${t}${a(r)}${n}`;
}
var Zt = {
	"margin-left": "ml",
	"margin-right": "mr",
	"margin-top": "mt",
	"margin-bottom": "mb",
	"margin-inline-start": "ms",
	"margin-inline-end": "me",
	"padding-left": "pl",
	"padding-right": "pr",
	"padding-top": "pt",
	"padding-bottom": "pb",
	"padding-inline-start": "ps",
	"padding-inline-end": "pe"
};
function G(t, o) {
	let [r, n] = e(o), i$1 = Zt[t];
	if (i$1) return `${i$1}${a(r)}${n}`;
	let s$1 = r.split(" "), p = s$1.length;
	return p === 1 ? `${t[0]}${a(s$1[0])}${n}` : p === 2 ? `${t[0]}x${a(s$1[1])}${n} ${t[0]}y${a(s$1[0])}${n}` : p === 3 ? `${t[0]}x${a(s$1[1])}${n} ${t[0]}t${a(s$1[0])}${n} ${t[0]}b${a(s$1[2])}${n}` : `${t[0]}t${a(s$1[0])}${n} ${t[0]}b${a(s$1[2])}${n} ${t[0]}l${a(s$1[3])}${n} ${t[0]}r${a(s$1[1])}${n}`;
}
function k(t, o) {
	let [r, n] = e(o);
	return P(o) ? `op-${r.replace("%", "")}${n}` : `op-${+r * 100}${n}`;
}
function tt(t, o) {
	let [r, n] = e(o);
	return `text${a(r)}${n}`;
}
function rt(t, o) {
	let [r, n] = e(o);
	return t === "text-decoration-line" ? r === "none" ? `no-underline${n}` : `${r}${n}` : t === "text-transform" ? r === "none" ? `normal-case${n}` : `${r}${n}` : t.startsWith("text-decoration") || t === "text-indent" ? `${t.split("-")[1]}${a(r)}${n}` : t === "text-underline-offset" ? `underline-offset-${r}${n}` : `text-${r}${n}`;
}
function nt(t, o) {
	let [r, n] = e(o);
	return `v-${r}${n}`;
}
var ot = {
	1: "none",
	1.25: "tight",
	1.375: "snug",
	1.5: "normal",
	1.625: "relaxed",
	2: "loose"
};
function et(t, o) {
	let [r, n] = e(o);
	return r in ot ? `lh-${ot[r]}${n}` : `lh${a(r)}${n}`;
}
var it = [
	"border-top",
	"border-right",
	"border-bottom",
	"border-left"
];
function st(t, o) {
	let [r, n] = e(o);
	if (t === "border-spacing") return `${t}="[${j(r)}]${n}"`;
	if (t === "border-color") {
		if (r.includes(" ")) {
			let i$1 = r.split(" ").length, s$1 = r.split(" ").map((f$1) => R(f$1) || b(f$1) || z(f$1) ? `-[${f$1}]` : `-${f$1}`), [p, m, g, u$1] = s$1;
			switch (i$1) {
				case 2: return `border-y${p}${n} border-x${m}${n}`;
				case 3: return `border-t${p}${n} border-b${g}${n} border-x${m}${n}`;
				case 4: return `border-t${p}${n} border-b${g}${n} border-r${m}${n} border-l${u$1}${n}`;
			}
		}
		return `border${a(r)}${n}`;
	}
	return t === "border-radius" ? V(r) || !r.includes(" ") ? `border-rd${a(r)}${n}` : `border-rd="[${j(r)}]${n}"` : it.some((i$1) => t.startsWith(i$1)) ? r.split(" ").map((i$1) => `border-${t.split("-")[1][0]}${a(i$1)}${n}`).join(" ") : t === "border-inline-end-width" ? `border-e${a(r)}${n}` : t === "border-inline-start-width" ? `border-s${a(r)}${n}` : t.startsWith("border-image") ? "" : t === "border-width" && r.includes(" ") ? r.split(" ").map((i$1, s$1) => `border-${it[s$1].split("-")[1][0]}${a(i$1)}${n}`).join(" ") : /^\d[%|(px)|(rem)]$/.test(r) || t === "border-collapse" ? `border-${r}${n}` : t === "border-width" || t === "border-style" ? `border${a(r)}${n}` : t === "border-color" ? r === "currentColor" ? `border-current${n}` : `border${a(r)}${n}` : r.split(" ").map((i$1) => r === "currentColor" ? `border-current${n}` : `border${a(i$1)}${n}`).join(" ");
}
function T(t, o) {
	let [r, n] = e(o);
	return r === "none" ? `hidden${n}` : r === "hidden" ? `invisible${n}` : `${r}${n}`;
}
function x(t, o) {
	let [r, n] = e(o);
	return `${t}-${r}${n}`;
}
function v(t, o) {
	let [r, n] = e(o);
	return `${t}${a(r)}${n}`;
}
function h(t, o) {
	let [r, n] = e(o);
	return `${l(t)}${a(r)}${n}`;
}
var qt = ["box-shadow", "drop-shadow"];
function U(t, o) {
	let [r, n] = e(o);
	if (t.startsWith("box-decoration")) return `box-decoration-${r}${n}`;
	if (t === "box-sizing") return `box-${l(r)}${n}`;
	if (qt.includes(t)) return `shadow="[${r.split(" ").join("_")}]${n}"`;
}
var Jt = [
	"contrast",
	"brightness",
	"saturate"
], Qt = [
	"grayscale",
	"invert",
	"sepia"
];
function A(t, o) {
	let [r, n] = e(o), [i$1, s$1, p] = r.match(/([\w-]+)\((.*)\)/);
	return Jt.includes(s$1) ? `${s$1}-${w(p)}${n}` : s$1 === "drop-shadow" ? `drop-${U(s$1, p)}${n}` : Qt.includes(s$1) ? `${s$1}-${p.endsWith("%") ? p.slice(0, -1) : w(p)}${n}` : s$1 === "hue-rotate" ? `${s$1}-${p.slice(0, -3)}${n}` : `${s$1}-${p}${n}`;
}
function at(t, o) {
	let [r, n] = e(o);
	return `backdrop-${A(t, r)}${n}`;
}
function mt(t, o) {
	let [r, n] = e(o);
	return t === "transform-origin" ? `origin-${W(r)}${n}` : t === "transform-style" ? `transform-${r}` : J(r).split(" ").map((i$1) => {
		let s$1 = i$1.match(/([a-z]+)(3d)?([A-Z])?\((.*)\)/);
		if (!s$1) return;
		let [p, m, g, u$1, f$1] = s$1;
		if (u$1) {
			let c = f$1.replace(/,(?![^()]*\))/g, " ").split(" ");
			return c.length > 1 ? `${m}-${u$1.toLowerCase()}="${c.map((d$1) => I(d$1) ? `[${d$1}]` : m === "scale" ? w(d$1) : M(d$1)).join(" ")}${n}"` : `${m}="${u$1.toLowerCase()}-${I(c[0]) ? `[${c[0]}]` : m === "scale" ? w(c[0]) : M(c[0])}${n}"`;
		} else {
			let c = f$1.replace(/,(?![^()]*\))/g, " ").split(" ");
			return c.length > 1 ? m === "translate" ? `${m}="[${c.join(",")}]"` : `${m}="${c.map((d$1) => I(d$1) ? `[${d$1}]` : m === "scale" ? w(d$1) : M(d$1)).join(" ")}${n}"` : `${m}="${I(c[0]) ? `[${c[0]}]` : m === "scale" ? w(c[0]) : M(c[0])}${n}"`;
		}
	}).filter(Boolean).join(" ");
}
function M(t) {
	return t.endsWith("deg") ? t.slice(0, -3) : t;
}
var Xt = ["transition-delay", "transition-duration"];
function pt(t, o) {
	let [r, n] = e(o);
	if (t === "transition-timing-function") return r === "linear" ? `ease-${r}${n}` : `ease="[${r}]${n}"`;
	if (t === "transition") return `transition="${Yt(r)}"`;
	if (t === "transition-property") return r.includes("color") ? `transition-color${n}` : r === "box-shadow" ? `transition-shadow${n}` : `transition-${r}${n}`;
	if (Xt.includes(t)) return `${t.split("-")[1]}-${r.slice(0, -2)}`;
}
function Yt(t) {
	let o = !1;
	return t.split(" ").map((r) => /^[0-9]/.test(r) || /^\.[0-9]/.test(r) ? o ? `delay${a(r, void 0, !0)}` : (o = !0, `duration${a(r, void 0, !0)}`) : r === "background-color" ? "colors" : r).join(" ");
}
function ct(t, o) {
	let [r, n] = e(o);
	return t === "justify-content" ? `justify-${$(r)}${n}` : `${t}-${$(r)}${n}`;
}
function ft(t, o) {
	let [r, n] = e(o);
	return `${$(t)}-${$(r)}${n}`;
}
var yt = [
	"flex-basis",
	"flex-grow",
	"flex-shrink"
];
function lt(t, o) {
	let [r, n] = e(o);
	if (yt.includes(t)) return `${$(t)}-${r}${n}`;
	if (r === "1") return `flex-1${n}`;
	let i$1 = r[0];
	return t === "flex" && (i$1 === "0" || i$1 === "1") ? `flex="[${j(r)}]${n}"` : `${l(t)}-${r.replace("column", "col")}${n}`;
}
function ut(t, o) {
	let [r, n] = e(o);
	return r === "auto" ? `${l(t)}-${r}` : `${l(t)}="[${r}]${n}"`;
}
function $t(t, o) {
	let [r, n] = e(o);
	return t === "column-gap" ? `gap-x-${r}${n}` : `${t}-${r}${n}`;
}
function gt(t, o) {
	let [r, n] = e(o);
	return o === "isolate" ? `${r}${n}` : `${t}-${r}${n}`;
}
function dt(t, o) {
	let [r, n] = e(o);
	return t === "object-position" ? `${l(t)}-${W(r)}${n}` : `${l(t)}-${r}${n}`;
}
function bt(t, o) {
	let [r, n] = e(o), [i$1, s$1, p] = t.split("-");
	return p ? `${i$1}-${p}-${r}${n}` : `${i$1}-${r}${n}`;
}
function xt(t, o) {
	let [r, n] = e(o);
	if (t.startsWith("grid-template")) {
		let s$1 = r.match(/repeat\s*\(\s*([0-9]+)/);
		return s$1 ? `grid-${$(t) === "rows" ? "rows" : "cols"}-${s$1[1]}${n}` : `grid-${$(t) === "rows" ? "rows" : "cols"}-${r.includes(" ") ? `[${j(r)}]` : r}${n}`;
	}
	if (t === "grid-auto-flow") return `grid-flow-${W(r).replace("column", "col")}${n}`;
	if (t.startsWith("grid-auto")) {
		let s$1 = r.match(/minmax\s*\(\s*0\s*,\s*1fr/);
		return `auto-${$(t) === "rows" ? "rows" : "cols"}-${s$1 ? "fr" : l(r)}${n}`;
	}
	let i$1 = r.match(/span\s+([0-9])/);
	return i$1 ? `${t.slice(5).replace("column", "col")}-span-${i$1[1]}${n}` : r === "1/-1" ? `${t.slice(5).replace("column", "col")}-span-full${n}` : `${t.slice(5).replace("column", "col")}-${r}${n}`;
}
function ht(t, o) {
	let [r, n] = e(o);
	return `gap-y-${r}${n}`;
}
function wt(t, o) {
	let [r, n] = e(o);
	return `${t}-${$(r)}${n}`;
}
function It(t, o) {
	let [r, n] = e(o);
	return `tracking-${r}${n}`;
}
function jt(t, o) {
	let [r, n] = e(o);
	return `whitespace-${r}${n}`;
}
function _t(t, o) {
	let [r, n] = e(o);
	return t.startsWith("word-spacing") ? `word-spacing${a(o)}` : r === "keep-all" ? `break-keep${n}` : `break-${$(r)}${n}`;
}
function Wt(t, o) {
	let [r, n] = e(o);
	return t === "outline-offset" ? `${t}-${r}${n}` : `${l(t)}-${r}${n}`;
}
function vt(t, o) {
	let [r, n] = e(o);
	return `mix-blend-${r}${n}`;
}
var kt = {
	vertical: "y",
	horizontal: "x"
};
function Vt(t, o) {
	let [r, n] = e(o);
	return r === "both" ? `${t}${n}` : `${t}-${kt[r] || r}${n}`;
}
function Nt(t, o) {
	let [r, n] = e(o);
	if (t.startsWith("scroll-snap")) return `snap-${r}${n}`;
	if (t === "scroll-behavior") return `scroll-${r}${n}`;
	let [i$1, s$1, p, m] = t.match(/scroll-(margin|padding)-?([\w]+)?-?([\w]+)?/);
	return p === "inline" && m ? `scroll-${s$1[0]}${m[0]}-${r}${n}` : p ? `scroll-${s$1[0]}${p[0]}-${r}${n}` : `scroll-${s$1[0]}-${r}${n}`;
}
function Lt(t, o) {
	let [r, n] = e(o);
	return `${$(t)}-${r}${n}`;
}
function Ft(t, o) {
	let [r, n] = e(o);
	return `${t}-${l(r)}${n}`;
}
function Rt(t, o) {
	let [r, n] = e(o);
	return t === "animation-delay" ? `animate${a(r)}${n}` : t === "animation" ? `animate-${r.split(" ")[0]}${n}` : `animate-${r}${n}`;
}
function zt(t, o) {
	let [r, n] = e(o);
	return r === "\" \"" || r === "' '" ? `content-['_']${n}` : `content-[${r.replace(/"/g, "'")}]${n}`;
}
var tr = {
	show: "visible",
	hide: "hidden"
};
function St(t, o) {
	var i$1;
	let [r, n] = e(o);
	return `table-empty-cells-${(i$1 = tr[r]) != null ? i$1 : r}${n}`;
}
function Ct(t, o) {
	return o === "horizontal-tb" ? "write-normal" : `write-${o.replace("-rl", "-right").replace("-lr", "-left")}`;
}
function Tt(t, o) {
	let [r, n] = e(o);
	if (t === "inset-inline-start") return `start${a(r)}${n}`;
	if (t === "inset-inline-end") return `end${a(r)}${n}`;
}
var O = {
	animation: Rt,
	aspect: ut,
	backface: h,
	caption: h,
	column: $t,
	columns: x,
	break: x,
	empty: St,
	box: U,
	writing: Ct,
	display: T,
	float: x,
	clear: x,
	isolation: gt,
	object: dt,
	overflow: x,
	overscroll: bt,
	position: T,
	top: v,
	left: v,
	right: v,
	bottom: v,
	visibility: T,
	z: C,
	flex: lt,
	order: x,
	grid: xt,
	gap: v,
	justify: ct,
	align: ft,
	place: wt,
	padding: G,
	perspective: x,
	margin: G,
	width: C,
	min: E,
	max: E,
	height: C,
	font: Y,
	letter: It,
	line: et,
	list: h,
	text: rt,
	vertical: nt,
	white: jt,
	word: _t,
	content: zt,
	background: B,
	border: st,
	outline: Wt,
	opacity: k,
	mix: vt,
	filter: A,
	backdrop: at,
	table: h,
	transition: pt,
	transform: mt,
	accent: h,
	appearance: h,
	cursor: y,
	caret: h,
	pointer: x,
	resize: Vt,
	scroll: Nt,
	inset: Tt,
	touch: h,
	user: Lt,
	will: Ft,
	fill: x,
	stroke: h,
	color: tt,
	row: ht
}, rr = /([\w-]+)\s*:\s*([.\w\(\)-\s%+'",#\/!@]+)/;
function D(t, o = !1) {
	var g;
	t = t.replace(S, "");
	let r = t.match(rr);
	if (!r) return;
	let [n, i$1, s$1] = r, p = l(i$1), m = (g = O[p]) == null ? void 0 : g.call(O, i$1, s$1);
	return m && o ? m.replace(/-([0-9\.]+)px/, (u$1, f$1) => `-${+f$1 / 4}`).replace(/\[[^\]]+\]/g, (u$1) => u$1.replace(/([0-9\.]+)px/g, (f$1, c) => `${+c / 16}rem`)) : m;
}
function K(t, o) {
	let r = [], n = new Set();
	return [t.split(";").filter(Boolean).reduce((i$1, s$1) => {
		let p = s$1.replaceAll(S, "").trim();
		if (n.has(p)) return i$1;
		n.add(p);
		let m = D(s$1, o) || "";
		return m || r.push(s$1), i$1 += `${m} `;
	}, "").trim().replace(/\s+/g, " "), r];
}
function nr(t, o = !1) {
	let [r, n] = K(t, o);
	return [r ? r.replace(/([^\s\=]+)="([^"]+)"/g, (i$1, s$1, p) => p.split(" ").map((m) => `${s$1}-${m}`).join(" ")) : "", n];
}

//#endregion
//#region core/index.ts
const transformToAtomic = (style, options) => {
	const { engine = "unocss", isRem = false, prefix = "" } = options;
	const raw = Object.entries(style);
	const cssCode = raw.map(([key, value]) => `${key}: ${value.replace(/\/\*.*\*\//g, "").trim()};`).join("\n");
	const uno = raw.map(([key, value]) => `${key}: ${value.replace(/\/\*.*\*\//g, "").replace(/var\(--[\w-]*,\s*(.*)\)/g, (_$2, $1) => $1).trim()}`).map((i$1) => engine === "unocss" ? nr(i$1, isRem)[0] : D$1(i$1, isRem)).map((i$1) => `${prefix}${i$1}`).join(" ").replace(/border-(\d+\.\d+|\d+)/g, (_$2, $1) => `border-${Number($1) * 4}`).replace(/(border-[xylrtb]-)(\d+\.\d+|\d+)/g, (_$2, $1, $2) => `${$1}${Number($2) * 4}`).replace(/(p[xylrtb])-(\d+\.\d+|\d+)px/g, (_$2, $1, $2) => `${$1}-${$2 / 4}`);
	const unoMini = raw.filter(([key]) => [
		"font-feature-settings",
		"font-family",
		"text-transform"
	].every((item) => !key?.startsWith(item))).map(([key, value]) => `${key}: ${value.replace(/\/\*.*\*\//g, "").replace(/var\(--[\w-]*,\s*(.*)\)/g, (_$2, $1) => $1).trim()}`).map((i$1) => engine === "unocss" ? nr(i$1, isRem)[0] : D$1(i$1, isRem)).filter((i$1) => [
		"lh-normal",
		"font-not-italic",
		"bg-[url(]"
	].every((item) => !i$1?.startsWith(item))).map((i$1) => `${prefix}${i$1}`).join(" ").replace(/border-(\d+\.\d+|\d+)/g, (_$2, $1) => `border-${Number($1) * 4}`).replace(/(border-[xylrtb]-)(\d+\.\d+|\d+)/g, (_$2, $1, $2) => `${$1}${Number($2) * 4}`).replace(/(p[xylrtb])-(\d+\.\d+|\d+)px/g, (_$2, $1, $2) => `${$1}-${$2 / 4}`);
	return {
		cssCode,
		uno,
		unoMini
	};
};

//#endregion
//#region plugin/index.ts
var plugin_default = definePlugin({
	name: "@fubukicss/unocss",
	code: {
		css: {
			title: "UnoCSS",
			lang: "text",
			transform({ style, options: { useRem } }) {
				return transformToAtomic(style, {
					engine: "unocss",
					isRem: useRem,
					prefix: ""
				}).uno;
			}
		},
		js: false
	}
});

//#endregion
export { plugin_default as default };