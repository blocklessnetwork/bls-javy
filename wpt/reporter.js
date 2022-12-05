export function result_reporter(test) {
  // No logging on success;
  if (test.status == 0) return;
  let ignoredTests = (globalThis.ignoredTests ?? []).map((matcher) => {
    if (matcher.startsWith("/")) {
      return new RegExp(matcher.slice(1).slice(0, -1));
    }
    return matcher;
  });
  const shouldSkipTest = ignoredTests.some((matcher) => {
    if (matcher instanceof RegExp) return matcher.test(test.name);
    return matcher == test.name;
  });
  if (shouldSkipTest) return;
  console.log("[FAIL]", test.name);
  console.log(test.message);
  console.log(test.stack);
}
