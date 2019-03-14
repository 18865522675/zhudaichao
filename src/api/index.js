import { PREFIX_URL, HOST } from "./axios";
import auth from "./api_auth";
import channel from "./api_channel";
import system from "./api_system";
import member from "./api_member";
import charge from "./api_charge";
import audit from "./api_audit";
import pressMoney from "./api_pressMoney";
import product from "./api_product";
import detail from "./api_detail";
import statics from "./api_static";
import blackAndWhite from "./api_blackAndWhite";
//模块目录
const api = {
  global: {
    url: PREFIX_URL,
    host: HOST,
    img: HOST
  },
  auth,
  channel,
  system,
  member,
  charge,
  audit,
  pressMoney,
  product,
  detail,
  statics,
  blackAndWhite
};

export default api;
