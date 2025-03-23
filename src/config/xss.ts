import { FilterXSS } from "xss";

export default new FilterXSS({
  whiteList: {}, // no tags allowed
  stripIgnoreTag: true,
  stripIgnoreTagBody: ["script"],
});
