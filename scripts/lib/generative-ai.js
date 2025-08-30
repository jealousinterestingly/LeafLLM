/*
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const e = "20240115-050019", t = "https://generativelanguage.googleapis.com", s = "v1beta", i = "GoogleGenerativeAI/0.8.0";
class o extends Error {
    constructor(e) {
        super(`[GoogleGenerativeAI Error]: ${e}`);
    }
}
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class r extends o {
    constructor(e, t) {
        super(e), this.response = t;
    }
}
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function n(e) {
    const t = await e.json();
    if (t.error)
        return t;
    throw new o("Error formatting response from API");
}
function a(e, t) {
    return new r(`Error fetching from Google AI endpoint. ${t?.error?.message || ""}`, t);
}
function l(e) {
    if (e.ok)
        return e;
    const t = `[${e.status} ${e.statusText}] ${e.url}`;
    throw new o(`Request failed with status code ${t}`);
}
async function c(e, t, s, i) {
    const o = {
        method: s
    };
    void 0 !== t && (o.body = t);
    const r = i?.fetch || fetch, c = i?.headers;
    return o.headers = c || new Headers({
        "Content-Type": "application/json"
    }), r(e, o).then(l, (e => {
        throw new o(`Request failed with error ${e}`);
    })).catch((async e => {
        if (e.response)
            return e.response;
        const t = await n(e);
        throw a(e, t);
    }));
}
async function h(e, t, s, i) {
    const o = i || {};
    return c(e, JSON.stringify(t), s, o);
}
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var u;
!function(e) {
    e.GENERATE_CONTENT = "generateContent", e.STREAM_GENERATE_CONTENT = "streamGenerateContent", 
    e.COUNT_TOKENS = "countTokens", e.EMBED_CONTENT = "embedContent", e.BATCH_EMBED_CONTENTS = "batchEmbedContents";
}(u || (u = {}));
const d = "models";
class m {
    constructor(e, t) {
        this.apiKey = e, this.requestOptions = t || {};
    }
    _getEndpointUrl(e, t) {
        const i = this.requestOptions.baseUrl || t, o = this.requestOptions.apiVersion || s, r = this.requestOptions.timeout;
        let n = `${i}/${o}/${d}/${e}:${t}?key=${this.apiKey}`;
        return "number" == typeof r && (n += `&timeout=${r}`), n;
    }
    _getRequestHeaders() {
        const e = new Headers;
        return e.append("x-goog-api-client", i), e;
    }
    async _makeRequest(e, s, i, o) {
        const r = this._getEndpointUrl(e, i), n = this._getRequestHeaders();
        return (await h(r, s, o, {
            ...this.requestOptions,
            headers: n
        })).json();
    }
    async _makeStreamingRequest(e, t, s) {
        const i = this._getEndpointUrl(e, s), o = this._getRequestHeaders();
        return c(i, JSON.stringify(t), "POST", {
            ...this.requestOptions,
            headers: o
        });
    }
}
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function p(e) {
    if ("string" == typeof e)
        return {
            text: e
        };
    if (Array.isArray(e)) {
        const t = [];
        for (const s of e)
            "string" == typeof s ? t.push({
                text: s
            }) : t.push(s);
        return t;
    }
    return e;
}
function f(e) {
    const t = [];
    for (const s of e)
        t.push(s.text);
    return t.join("");
}
function g(e) {
    if (e.candidates && e.candidates.length > 0) {
        if (e.candidates.length > 1)
            console.warn(`This response contains ${e.candidates.length} candidates. Returning the first one.`);
        const t = function(e) {
            if (e?.finishReason && "SAFETY" === e.finishReason)
                return !0;
            if (e?.safetyRatings)
                for (const t of e.safetyRatings)
                    if ("BLOCKED" === t.blocked)
                        return !0;
            return !1;
        }(e.candidates[0]);
        if (t) {
            const t = {
                prompt: e.promptFeedback
            }, s = {
                response: {
                    candidates: [],
                    promptFeedback: t,
                    text: () => {
                        throw new o("Candidate was blocked due to safety concerns.");
                    }
                }
            };
            throw s.response.candidates = e.candidates, new r("Response was blocked", s);
        }
        return e.candidates[0];
    }
    if (e.promptFeedback) {
        const t = {
            response: {
                candidates: [],
                promptFeedback: e.promptFeedback,
                text: () => {
                    throw new o("Prompt was blocked without a candidate");
                }
            }
        };
        throw new r("Response was blocked", t);
    }
    return null;
}
function y(e) {
    return {
        text: () => {
            if (e)
                return f(e.content.parts);
            throw new o("Accessing response.text() when no candidate is returned.");
        },
        candidates: e ? [ e ] : [],
        promptFeedback: void 0
    };
}
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const C = {
    "Content-Type": "application/json"
};
async function S(e) {
    const t = new TextDecoder, {
        body: s,
        headers: i,
        ok: o,
        redirected: r,
        status: n,
        statusText: a,
        type: l,
        url: c
    } = e, h = {
        body: s,
        headers: i,
        ok: o,
        redirected: r,
        status: n,
        statusText: a,
        type: l,
        url: c
    }, u = s?.getReader();
    async function* d() {
        for (;;) {
            const e = await u?.read();
            if (e?.done)
                break;
            const s = t.decode(e?.value);
            yield {
                ...h,
                body: s,
                json: () => Promise.resolve(JSON.parse(s)),
                text: () => Promise.resolve(s)
            };
        }
    }
    async function* m() {
        const e = d();
        let t = "";
        for await (const s of e) {
            const {
                body: e
            } = s, i = (t + e).split("\n").filter((e => e.startsWith("data: ")));
            let o = !1;
            for (const t of i)
                if (t.includes("]")) {
                    const e = t.replace("data: ", "");
                    yield JSON.parse(e)[0], o = !0;
                } else
                    t.includes("[") ? t.includes("}") ? (yield JSON.parse(t.replace("data: ", ""))) : t.endsWith(",") ? (yield JSON.parse(t.replace("data: [", "").slice(0, -1))) : (yield JSON.parse(t.replace("data: [", ""))) : o || (t.endsWith("}") ? (yield JSON.parse(t.replace("data: ", ""))) : t.endsWith(",") && (yield JSON.parse(t.replace("data: ", "").slice(0, -1))));
            const r = (t + e).split("\n").pop() || "";
            r.startsWith("data: ") ? t = r : t = "";
        }
    }
    return {
        ...h,
        body,
        async *[Symbol.asyncIterator]() {
            for await (const e of m())
                yield {
                    response: y(g(e))
                };
        }
    };
}
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class b {
    constructor(e, t, s, i, o) {
        this.model = e, this.generationConfig = t, this.safetySettings = s, this.requestOptions = i, 
        this.tools = o;
    }
    async generateContent(e) {
        const s = p(e), i = {
            contents: [ {
                parts: s
            } ],
            generationConfig: this.generationConfig,
            safetySettings: this.safetySettings,
            tools: this.tools
        };
        return {
            response: y(g(await this.request.request(this.model, u.GENERATE_CONTENT, i)))
        };
    }
    async generateContentStream(e) {
        const t = p(e), s = {
            contents: [ {
                parts: t
            } ],
            generationConfig: this.generationConfig,
            safetySettings: this.safetySettings,
            tools: this.tools
        };
        return {
            stream: S(await this.request.request(this.model, u.STREAM_GENERATE_CONTENT, s))
        };
    }
    async countTokens(e) {
        const t = p(e);
        return await this.request.request(this.model, u.COUNT_TOKENS, {
            contents: [ {
                parts: t
            } ]
        });
    }
    async embedContent(e) {
        const t = p(e);
        return await this.request.request(this.model, u.EMBED_CONTENT, {
            content: {
                parts: t
            }
        });
    }
    async batchEmbedContents(e) {
        const t = e.map((e => {
            const t = p(e);
            return {
                parts: t
            };
        }));
        return await this.request.request(this.model, u.BATCH_EMBED_CONTENTS, {
            requests: t.map((e => ({
                content: e
            })))
        });
    }
    startChat(e) {
        return new _(this, e);
    }
}
class _ extends b {
    constructor(e, t) {
        super(e.model, e.generationConfig, e.safetySettings, e.requestOptions, e.tools), 
        this.history = t?.history || [];
    }
    async sendMessage(e) {
        const t = p(e), s = {
            contents: [ ...this.history, {
                parts: t,
                role: "user"
            } ],
            generationConfig: this.generationConfig,
            safetySettings: this.safetySettings,
            tools: this.tools
        }, i = await this.request.request(this.model, u.GENERATE_CONTENT, s), o = g(i);
        if (!o)
            throw new Error("No response candidate found.");
        return this.history.push({
            parts: t,
            role: "user"
        }), this.history.push(o.content), {
            response: y(o)
        };
    }
    async sendMessageStream(e) {
        const t = p(e), s = {
            contents: [ ...this.history, {
                parts: t,
                role: "user"
            } ],
            generationConfig: this.generationConfig,
            safetySettings: this.safetySettings,
            tools: this.tools
        }, i = await this.request.request(this.model, u.STREAM_GENERATE_CONTENT, s), o = S(i);
        this.history.push({
            parts: t,
            role: "user"
        });
        const r = [];
        for await (const e of o)
            r.push(e.response.candidates[0].content);
        return this.history.push({
            parts: f(r).split(" ").map((e => ({
                text: e
            }))),
            role: "model"
        }), {
            stream: o
        };
    }
}
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class R extends b {
    constructor(e, s) {
        super(e.model, e.generationConfig, e.safetySettings, e.requestOptions, e.tools), 
        this.request = s;
    }
}
class w {
    constructor(e, i) {
        this.apiKey = e, this.request = new m(e, i), this.model = i?.model || "gemini-pro";
    }
    getGenerativeModel(e) {
        if (!e.model)
            throw new o("Must provide a model name.");
        return new R(new b(e.model, e.generationConfig, e.safetySettings, this.requestOptions, e.tools), this.request);
    }
}
export { w as GoogleGenerativeAI, o as GoogleGenerativeAIError, r as GoogleGenerativeAIResponseError, e as PACKAGE_VERSION };
