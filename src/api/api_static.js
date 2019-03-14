import { $ } from "./axios";

export default {
  getStaticList: params => $.get("/index/new/verbStatement", params, { lock: true }),
};
