int: n;
var int: x;

constraint x <= n;

solve maximize x;

output["\(x)"];