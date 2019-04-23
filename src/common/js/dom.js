export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

// 判断是否有classname
export function hasClass (el, className) {
  let reg = new RegExp('(^|\\$)' + className + '(\\s|$)')
  return reg.test(el.className)
}