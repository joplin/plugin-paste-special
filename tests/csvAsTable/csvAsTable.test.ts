import csvAsTable from '../../src/utils/csvAsTable/csvAsTable';

test('check if default export returns expected output #0', async () => {
  let testCase = "";
  const result = await csvAsTable(testCase);
  expect(result).toBe("|     | \n| --- | ");
});

test('check if default export returns expected output #1', async () => {
  let testCase = 'abc,bcd,cde';
  const result = await csvAsTable(testCase);
  expect(result).toBe("| abc | bcd | cde | \n| --- | --- | --- | ");
});

test('check if default export returns expected output #2', async () => {
  let testCase = "a,";
  const result = await csvAsTable(testCase);
  expect(result).toBe("| a |  | \n| --- | --- | ");
});

test('check if default export returns expected output #3', async () => {
  let testCase = "a, b";
  const result = await csvAsTable(testCase);
  expect(result).toBe("| a |  b | \n| --- | --- | ");
});

test('check if default export returns expected output #4', async () => {
  let testCase = ",\nb,c";
  const result = await csvAsTable(testCase);
  expect(result).toBe("|  |  | \n| --- | --- | \n| b | c | ");
});

test('check if default export returns expected output #5', async () => {
  let testCase = "a, b,\nb, c, d\nc,\nc, d";
  const result = await csvAsTable(testCase);
  expect(result).toBe("| a |  b |  | \n| --- | --- | --- | \n| b |  c |  d | \n| c |  | \n| c |  d | ");
});

test('check if default export returns expected output #6', async () => {
  let testCase = "A,b,c\nCod,e|f,f\nde|\ f, g";
  const result = await csvAsTable(testCase);
  expect(result).toBe("| A | b | c | \n| --- | --- | --- | \n| Cod | ef | f | \n| de f |  g | ");
});

test('check if default export returns expected output #7', async () => {
  let testCase = "a;b;c;long value\nd;e;f";
  const result = await csvAsTable(testCase);
  expect(result).toBe("| a | b | c | long value | \n| --- | --- | --- | --- | \n| d | e | f | ");
});

test('check if default export returns expected output #8', async () => {
  let testCase = '"a|b|c|d",e\\f\\g';
  const result = await csvAsTable(testCase);
  expect(result).toBe("| abcd | efg | \n| --- | --- | ");
});

