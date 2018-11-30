require('@/css/b.less')
(function () {
  function add(a, b) {
    a += 10
    b += 20
    return a * b
  }
  alert('this is b.js')
  console.log(add(1, 2))
})()