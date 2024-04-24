// src/index.js
var src_default = {
  async fetch(request, env, ctx) {
    console.log("Logging: " + request.url)
    return new Response("Hello Worker!");
  }
};
export {
  src_default as default
};
//# sourceMappingURL=index.js.map
