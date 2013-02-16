util = {}

/** Helper function to splice a root path to a relative path for a given file
 *
 * E.g. var fullPath = splicePath("app/assets/gravity/gravity.json", "./images/1.jpg")
 *
 *       fullPath == "app/assets/gravity/images/1.jpg"
 *
 * @param rootFilePath The root path of the file
 * @param relativeFilePath Path relative to root path of the
 */
util.splicePaths = function (rootFilePath, relativeFilePath) {

  // Regexp to get the filename of the root file.
  //    e.g. "app/assets/gravity/gravity.json"  ->  "/gravity.json"
  var rootFilename = rootFilePath.match(/\/[^/]*$/);


  // Use the filename to get the directory of the root file:
  //    e.g. "app/assets/gravity/gravity.json"  ->  "app/assets/gravity"
  if(rootFilename) {
    rootFilePath = rootFilePath.replace( rootFilename.pop() , "");
  } else {
    rootFilePath = ".";
  }

  // Clean the '.' from the beginning of the relativeFilePath if it exists
  relativeFilePath = relativeFilePath.replace(/^\./, "");

  // Include a '/' in the returned path, if it doesn't already exist in the relativeFilePath
  var slash = "";
  if(relativeFilePath[0] != '/')
    slash = "/";

  var splicedPath = rootFilePath + slash + relativeFilePath;
  console.log("Loaded Asset: " + splicedPath);

  return splicedPath;
}