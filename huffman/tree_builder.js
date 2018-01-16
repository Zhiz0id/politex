var __hasProp = Object.prototype.hasOwnProperty;
Huffman.TreeBuilder = function(_a) {
  this.text = _a;
  return this;
};
Huffman.TreeBuilder.prototype.build = function() {
  var combinedList, frequencyTable;
  frequencyTable = this.buildFrequencyTable();
  combinedList = this.combineTable(frequencyTable);
  return Huffman.Tree.decodeTree(this.compressCombinedTable(combinedList), frequencyTable);
};
Huffman.TreeBuilder.prototype.buildFrequencyTable = function() {
  var _a, _b, _c, _d, chr, frequency, table, tableHash;
  tableHash = {};
  _b = this.text.split('');
  for (_a = 0, _c = _b.length; _a < _c; _a++) {
    chr = _b[_a];
    tableHash[chr] = (typeof tableHash[chr] !== "undefined" && tableHash[chr] !== null) ? tableHash[chr] : 0;
    tableHash[chr] += 1;
  }
  table = [];
  _d = tableHash;
  for (chr in _d) {
    if (!__hasProp.call(_d, chr)) continue;
    frequency = _d[chr];
    table.push([frequency, chr]);
  }
  table.sort(this.frequencyAndAlphanumericSorter);
  return table;
};
Huffman.TreeBuilder.prototype.frequencySorter = function(a, b) {
  return a[0] > b[0] ? 1 : (a[0] < b[0] ? -1 : 0);
};
Huffman.TreeBuilder.prototype.frequencyAndAlphanumericSorter = function(a, b) {
  if (a[0] > b[0]) { return 1 }
  else if(a[0] < b[0]) { return -1 }
  else if (a[0] == b[0] && typeof(b[1]) == 'string' && typeof(a[1]) == 'string') {
      if (a[1] > b[1]) { return -1 }
      else if (a[1] < b[1]) { return 1 }
      else {return 0 }
  } else { return 0 }
};
Huffman.TreeBuilder.prototype.combineTable = function(table) {
  var first, second;
  while (table.length > 1) {
    first = table.shift();
    second = table.shift();
    table.push([first[0] + second[0], [first, second]]);
    //table.sort(this.frequencySorter);
    table.sort(this.frequencyAndAlphanumericSorter);
  }
  return table[0];
};
Huffman.TreeBuilder.prototype.compressCombinedTable = function(table) {
  var value;
  value = table[1];
  frequency = table[0]
  return Huffman.CoreHelpers.isArray(value) ? [this.compressCombinedTable(value[0]), this.compressCombinedTable(value[1])] : value;
};
