import { log } from "console";

export default (str: any, del: string) => {
  log(del + " " + del + " " + del + " " + del + " ");
  log(str);
  log(del + " " + del + " " + del + " " + del + " ");
};
