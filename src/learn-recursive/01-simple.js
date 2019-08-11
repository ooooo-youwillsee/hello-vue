/* eslint-disable */
/**
 * 1、 1到100相加
 */
function f1 () {
  let sum = 0
  for (let i = 0; i <= 100; i++) {
    sum = i + sum
  }
  console.log(sum)
}

function calcSum (n) {
  if (n === 1) {
    return n
  } else {
    return n + calcSum(n - 1)
  }
}

console.log('calcSum', calcSum(100))

/**
 * 2、请输入一个n值，输出n!的值
 *
 */
function sumOne (n) {
  if (n === 0) {
    return 1
  }

  let sum = 1
  // while (n) {
  //   sum *= n--
  // }
  for (; n >= 1; n--) {
    sum *= n
  }
  return sum
}

function f2 (n) {
  if (n === 0 || n === 1) {
    return 1
  } else {
    return n * f2(n - 1)
  }
}

console.log(sumOne(3), '00000')
console.log(f2(3), '11111')

/**
 * 3、一个人赶着鸭子去每个村庄卖，每经过一个村子卖去所赶鸭子的一半又一只。这样他经过了七个村子后还剩两只鸭子，问他出发时共赶多少只鸭子？经过每个村子卖出多少只鸭子
 */

/**
 * 4、角谷定理。输入一个自然数，若为偶数，则把它除以2，若为奇数，则把它乘以3加1。经过如此有限次运算后，总可以得到自然数值1。求经过多少次可得到自然数1
 */

/**
 * 5、用循环打印下面图形
 *          *
 *         ***
 *        *****
 *       *******
 *        *****
 *         ***
 *          *
 *
 *  用递归打印
 */

/**
 * 6、构造树
 *
 *
 *  --0
 *    --1
 *      --2
 *        --4
 *          --5
 *      --3
 *        --6
 *    --7
 *    --8
 *    --9
 *    --10
 *      --11
 *
 *
 */


var dataList = [
  {id: 1, name: '00000', parentId: 0},
  {id: 2, name: '10000', parentId: 1},
  {id: 3, name: '20000', parentId: 1},
  {id: 4, name: '11000', parentId: 2},
  {id: 5, name: '11200', parentId: 4},
  {id: 6, name: '21000', parentId: 3},
  {id: 7, name: '21000', parentId: 0},
  {id: 8, name: '21000', parentId: 0},
  {id: 9, name: '21000', parentId: 0},
  {id: 10, name: '21000', parentId: 0},
  {id: 11, name: '21000', parentId: 10},
  {id: 12, name: '21000', parentId: 4},
]

// root为0时，root.children = [parentId=0]
// item.id = 0, item.chilren = [parentId = item.id]
function makeTree (data, root) {
  root.children = []
  for (let item of data) {
    if (item.parentId === root.id) {
      root.children.push(item)
      makeTree(data, item)
    }
  }
  // if (root.children.length === 0) {
  //   delete root.children
  // }
}

let root = {id: 0}
makeTree(dataList, root)
console.log(root.children)



