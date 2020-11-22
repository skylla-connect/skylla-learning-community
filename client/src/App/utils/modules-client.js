import dbcon from "../../firebase";

function search(query) {
  return dbcon.doSearch(query);
}

function read(moduleId) {
  return dbcon.doGetModule(moduleId);
}

export {search, read}
