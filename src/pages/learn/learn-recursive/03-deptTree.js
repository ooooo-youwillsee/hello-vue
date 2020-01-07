const deptTree = require('./data/deptTree')
import { cloneDeep } from 'lodash'

const makeTree = (item) => {
  if (item.hasOwnProperty('departmentList')) {
    item.children = item.departmentList
    delete item.departmentList
  }
  
  if (item.hasOwnProperty('children')) {
    if (item.hasOwnProperty('personList')) {
      item.children = item.children.concat(item.personList)
      delete item.personList
    }
  }
  
  if (!item.hasOwnProperty('departName') && item.hasOwnProperty('domainName')) {
    item.departName = item.domainName
    delete item.domainName
  }
  
  if (item.children && item.children.length > 0) {
    item.children.forEach(child => makeTree(child))
  }
}

const root = { children: cloneDeep(deptTree) }
makeTree(root)
console.log(111, deptTree)
console.log(222, root.children)
