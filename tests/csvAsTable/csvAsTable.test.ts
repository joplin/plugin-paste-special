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
  let testCase = "A,b,c|\nCod,e|f,f\nd|e,0.6\\,g";
  const result = await csvAsTable(testCase);
  expect(result).toBe("| A | b | c\\| | \n| --- | --- | --- | \n| Cod | e\\|f | f | \n| d\\|e | 0.6\\\\ | g | ");
});

test('it should use delimiter as `;`', async () => {
  let testCase = "a;b;c;long value\nd;e;f";
  const result = await csvAsTable(testCase);
  expect(result).toBe("| a | b | c | long value | \n| --- | --- | --- | --- | \n| d | e | f | ");
});

test('it should return expected output by removing backslashes and pipes only', async () => {
  let testCase = '"a|b|c|d",e\\f\\g';
  const result = await csvAsTable(testCase);
  expect(result).toBe("| a\\|b\\|c\\|d | e\\\\f\\\\g | \n| --- | --- | ");
});

test('it should expect to convert also empty cells', async () => {
  let testCase = 'foo,bar,baz\na#,"b",c\nd,e,\n,f,\n,,\ng,h,i';
  const result = await csvAsTable(testCase);
  expect(result).toBe("| foo | bar | baz | \n| --- | --- | --- | \n| a# | b | c | \n| d | e |  | \n|  | f |  | \n|  |  |  | \n| g | h | i | ");
});

test('it should expect to convert data properly in table', async () => {
  let testCase = 'Login email;Identifier;One-time password;Recovery code;First name;Last name;Department;Location\nrachel@example.com;9012;12se74;rb9012;Rachel;Booker;Sales;Manchester\nlaura@example.com;2070;04ap67;lg2070;Laura;Grey;Depot;London';
  const result = await csvAsTable(testCase);
  expect(result).toBe("| Login email | Identifier | One-time password | Recovery code | First name | Last name | Department | Location | \n| --- | --- | --- | --- | --- | --- | --- | --- | \n| rachel@example.com | 9012 | 12se74 | rb9012 | Rachel | Booker | Sales | Manchester | \n| laura@example.com | 2070 | 04ap67 | lg2070 | Laura | Grey | Depot | London | " );
});

test('it should return expected output by handling quotes and empty string', async () => {
  let testCase = `\n\ncolumn_a,column_b,column_c\n1,27,,"I'm too long!"\n,"I'm too short!"\n0,mixed types.... uh oh,17'`
  const result = await csvAsTable(testCase);
  expect(result).toBe("|  | \n| --- | \n|  | \n| column_a | column_b | column_c | \n| 1 | 27 |  | I'm too long! | \n|  | I'm too short! | \n| 0 | mixed types.... uh oh | 17' | ");
});

test('it should return expected output by adding blank row', async () => {
  let testCase = `a,b,c,d,e,f\n,,,,,`;
  const result = await csvAsTable(testCase);
  expect(result).toBe("| a | b | c | d | e | f | \n| --- | --- | --- | --- | --- | --- | \n|  |  |  |  |  |  | ");
});

test('it should return expected output by using blank values to table', async () => {
  let testCase = `a,b,c,d,e,f\nNA,N/A,NONE,NULL,.`;
  const result = await csvAsTable(testCase);
  expect(result).toBe("| a | b | c | d | e | f | \n| --- | --- | --- | --- | --- | --- | \n| NA | N/A | NONE | NULL | . | ");
});

test('it should return expected output of large data with all the floating point values as correct', async () => {
  let testCase = `sepal_length,sepal_width,petal_length,petal_width,species\n5.1,3.5,1.4,0.2,Iris-setosa\n4.9,3.0,1.4,0.2,Iris-setosa\n7.0,3.2,4.7,1.4,Iris-versicolor\n6.4,3.2,4.5,1.5,Iris-versicolor\n6.9,3.1,4.9,1.5,Iris-versicolor\n6.3,3.3,6.0,2.5,Iris-virginica\n5.8,2.7,5.1,1.9,Iris-virginica\n7.1,3.0,5.9,2.1,Iris-virginica\n6.3,2.9,5.6,1.8,Iris-virginica\n6.5,3.0,5.8,2.2,Iris-virginica`;
  const result = await csvAsTable(testCase);
  expect(result).toBe("| sepal_length | sepal_width | petal_length | petal_width | species | \n| --- | --- | --- | --- | --- | \n| 5.1 | 3.5 | 1.4 | 0.2 | Iris-setosa | \n| 4.9 | 3.0 | 1.4 | 0.2 | Iris-setosa | \n| 7.0 | 3.2 | 4.7 | 1.4 | Iris-versicolor | \n| 6.4 | 3.2 | 4.5 | 1.5 | Iris-versicolor | \n| 6.9 | 3.1 | 4.9 | 1.5 | Iris-versicolor | \n| 6.3 | 3.3 | 6.0 | 2.5 | Iris-virginica | \n| 5.8 | 2.7 | 5.1 | 1.9 | Iris-virginica | \n| 7.1 | 3.0 | 5.9 | 2.1 | Iris-virginica | \n| 6.3 | 2.9 | 5.6 | 1.8 | Iris-virginica | \n| 6.5 | 3.0 | 5.8 | 2.2 | Iris-virginica | ");
});

test('it should return expected output of links', async () => {
  let testCase = `species,wikipedia_url,usda_id\nIris-versicolor,http://en.wikipedia.org/wiki/Iris_versicolor,IRVE2\nIris-virginica,http://en.wikipedia.org/wiki/Iris_virginica,IRVI\nIris-setosa,,IRSE`;
  const result = await csvAsTable(testCase);
  expect(result).toBe("| species | wikipedia_url | usda_id | \n| --- | --- | --- | \n| Iris-versicolor | http://en.wikipedia.org/wiki/Iris_versicolor | IRVE2 | \n| Iris-virginica | http://en.wikipedia.org/wiki/Iris_virginica | IRVI | \n| Iris-setosa |  | IRSE | ");
});

test('it should return expected output handling empty spaces and unicode characters', async () => {
  let testCase = `text,date,integer,boolean,float,time,datetime,empty_column,_unnamed\nChicago Tribune,1920-01-01,164,False,41800000.01,00:00:00,1920-01-01T00:00:00,,\nChicago Sun-Times,1948-01-01,63,True,1.27,14:57:13,1948-01-01T14:57:13,,Extra data past headers will be trimmed\nChicago Reader,1971-01-01,40,True,1.0,04:14:00,1971-01-01T04:14:00,,\nThis row has blanks,,,,,,,,\nUnicode! Σ,,,,,,,,`;
  const result = await csvAsTable(testCase);
  expect(result).toBe("| text | date | integer | boolean | float | time | datetime | empty_column | _unnamed | \n| --- | --- | --- | --- | --- | --- | --- | --- | --- | \n| Chicago Tribune | 1920-01-01 | 164 | False | 41800000.01 | 00:00:00 | 1920-01-01T00:00:00 |  |  | \n| Chicago Sun-Times | 1948-01-01 | 63 | True | 1.27 | 14:57:13 | 1948-01-01T14:57:13 |  | Extra data past headers will be trimmed | \n| Chicago Reader | 1971-01-01 | 40 | True | 1.0 | 04:14:00 | 1971-01-01T04:14:00 |  |  | \n| This row has blanks |  |  |  |  |  |  |  |  | \n| Unicode! Σ |  |  |  |  |  |  |  |  | ");
});

test('it should return expected output using ; as delimiter', async () => {
  let testCase = `a;b;c\n1;2;3`;
  const result = await csvAsTable(testCase);
  expect(result).toBe("| a | b | c | \n| --- | --- | --- | \n| 1 | 2 | 3 | ");
});

test('it should return expected output correctly even json', async () => {
  let testCase = `id,prop0,prop1,geojson,type,longitude,latitude
  ,value0,,"{""type"": ""Point"", ""coordinates"": [102.0, 0.5]}",Point,102.0,0.5
  ,value0,0.0,"{""type"": ""LineString"", ""coordinates"": [[102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]]}",LineString,,
  ,value0,"{""this"": ""that""}","{""type"": ""Polygon"", ""coordinates"": [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]]]}",Polygon,,`;
  const result = await csvAsTable(testCase);
  expect(result).toBe(`| id | prop0 | prop1 | geojson | type | longitude | latitude | \n| --- | --- | --- | --- | --- | --- | --- | \n|    | value0 |  | {"type": "Point", "coordinates": [102.0, 0.5]} | Point | 102.0 | 0.5 | \n|    | value0 | 0.0 | {"type": "LineString", "coordinates": [[102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]]} | LineString |  |  | \n|    | value0 | {"this": "that"} | {"type": "Polygon", "coordinates": [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]]]} | Polygon |  |  | `);
});

test('it should return expected output including the utf-8 bom', async () => {
  let testCase = `foo,bar,baz\n1,2,3\n4,5,ʤ`;
  const result = await csvAsTable(testCase);
  expect(result).toBe(`| foo | bar | baz | \n| --- | --- | --- | \n| 1 | 2 | 3 | \n| 4 | 5 | ʤ | `);
});

test('it should return expected output using the comma in quotes', async () => {
  let testCase = `first,last,address,city,zip\nJohn,Doe,120 any st.,"Anytown, WW",08123`;
  const result = await csvAsTable(testCase);
  expect(result).toBe(`| first | last | address | city | zip | \n| --- | --- | --- | --- | --- | \n| John | Doe | 120 any st. | Anytown, WW | 08123 | `);
});

test('it should return expected output escaping quotes', async () => {
  let testCase = `a,b\n1,"ha ""ha"" ha"\n3,4`;
  const result = await csvAsTable(testCase);
  expect(result).toBe(`| a | b | \n| --- | --- | \n| 1 | ha "ha" ha | \n| 3 | 4 | `);
});

test('it should return expected output by escaping pipes', async () => {
  let testCase = `h1,h2,h3\nr2c1;r2c2;r2c3\nr2c1|r2c2|r2c3`;
  const result = await csvAsTable(testCase);
  expect(result).toBe(`| h1 | h2 | h3 | \n| --- | --- | --- | \n| r2c1;r2c2;r2c3 | \n| r2c1\\|r2c2\\|r2c3 | `);
});

test('it should return expected output by handling multiple delimiters in single line', async () => {
  let testCase = `h1,h2;h3,h4|;h5 ;,  h6|h7;,`;
  const result = await csvAsTable(testCase);
  expect(result).toBe('| h1 | h2;h3 | h4\\|;h5 ; |   h6\\|h7; |  | \n| --- | --- | --- | --- | --- | ');
});

test('it should return expected output by handling multiple delimiters in multiple line', async () => {
  let testCase = `h1,h2;h3,h4|;h5 ;,  h6|h7;,\nr1  ;\tc1,r1;|||c2,r1;  c3\nr2,c1;r2|c2,;r2|  c3,\nr2  c1;,|;;r2;c2,||r2;|c3,`;
  const result = await csvAsTable(testCase);
  expect(result).toEqual(`| h1 | h2;h3 | h4\\|;h5 ; |   h6\\|h7; |  | \n| --- | --- | --- | --- | --- | \n| r1  ;\tc1 | r1;\\|\\|\\|c2 | r1;  c3 | \n| r2 | c1;r2\\|c2 | ;r2\\|  c3 |  | \n| r2  c1; | \\|;;r2;c2 | \\|\\|r2;\\|c3 |  | `);
});

test('it should return expected output by handling empty or null values', async () => {
  let testCase = '\na,\nb,c,,,';
  const result = await csvAsTable(testCase);
  expect(result).toBe('|  | \n| --- | \n| a |  | \n| b | c |  |  |  | ');
});