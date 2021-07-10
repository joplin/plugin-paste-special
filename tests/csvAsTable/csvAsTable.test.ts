import csvAsTable from '../../src/utils/csvAsTable/csvAsTable';

test('it should return a single cell table', async () => {
  let testCase = "";
  const result = await csvAsTable(testCase);
  expect(result).toBe("|     | \n| --- | ");
});

test('it should return a table with empty line in between header and data', async () => {
  let testCase = "abc,bcd,cde\n\nabc,bcd,cde";
  const result = await csvAsTable(testCase);
  expect(result).toBe("| abc | bcd | cde | \n| --- | --- | --- | \n|  | \n| abc | bcd | cde | ");
});

test('it should return a table two empty lines in between header and data', async () => {
  let testCase = "abc,bcd,cde\n\n\nabc,bcd,cde";
  const result = await csvAsTable(testCase);
  expect(result).toBe("| abc | bcd | cde | \n| --- | --- | --- | \n|  | \n|  | \n| abc | bcd | cde | ");
});

test('it should return a correct csv table', async () => {
  let testCase = 'abc,bcd,cde';
  const result = await csvAsTable(testCase);
  expect(result).toBe("| abc | bcd | cde | \n| --- | --- | --- | ");
});

test('it should return an empty two cell header and data', async () => {
  let testCase = ",\nb,c";
  const result = await csvAsTable(testCase);
  expect(result).toBe("|  |  | \n| --- | --- | \n| b | c | ");
});

test('it should return 3 header cells', async () => {
  let testCase = "a, b,\nb, c, d\nc,\nc, d";
  const result = await csvAsTable(testCase);
  expect(result).toBe("| a |  b |  | \n| --- | --- | --- | \n| b |  c |  d | \n| c |  | \n| c |  d | ");
});

test('it should escape pipes and backslashes', async () => {
  let testCase = "A,b,c\nCod,e|f,f\nde|\ f, g";
  const result = await csvAsTable(testCase);
  expect(result).toBe("| A | b | c | \n| --- | --- | --- | \n| Cod | ef | f | \n| de f |  g | ");
});

test('it should use delimiter as `;`', async () => {
  let testCase = "a;b;c;long value\nd;e;f";
  const result = await csvAsTable(testCase);
  expect(result).toBe("| a | b | c | long value | \n| --- | --- | --- | --- | \n| d | e | f | ");
});

test('it should return expected output by removing backslashes and pipes', async () => {
  let testCase = '"a|b|c|d",e\\f\\g';
  const result = await csvAsTable(testCase);
  expect(result).toBe("| abcd | efg | \n| --- | --- | ");
});

test('it should expect to convert also empty cells', async () => {
  let testCase = 'foo,bar,baz\na#,"b",c\nd,e,\n,f,\n,,\ng,h,i';
  const result = await csvAsTable(testCase);
  expect(result).toBe("| foo | bar | baz | \n| --- | --- | --- | \n| a# | b | c | \n| d | e |  | \n|  | f |  | \n|  |  |  | \n| g | h | i | ");
});
