let a = {a:"1",b:"2",c:"3"}
for (var key in a) {
a[key]=""
}
console.log(a)