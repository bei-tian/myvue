import { listDiff } from './list-diff'
export function diff(oldVNode, newVNode) {
  let index = 0
  let patches = {}
  dfsWalk(oldVNode, newVNode, index, patches)
  return patches
}


function dfsWalk(oldVNode, newVNode, index, patches) {
  let currentPatch = []
  if(typeof oldVNode === 'string' && typeof newVNode === 'string') { //比较文本节点
    if(oldVNode !== newVNode) {
      currentPatch.push({
        type: 'text',
        context: newVNode
      })
    }
  } else if(oldVNode.tag === newVNode.tag) { //节点类型相同
    
    //比较属性是否相同
    diffProps(oldVNode.props, newVNode.props, currentPatch)
    
    //比较子节点是否相同
    diffChildren(oldVNode.children, newVNode.children, index, patches, currentPatch)
  } else {
    //节点类型不相同，直接替换
    currentPatch.push({
      type:'replace',
      node: newVNode
    })
  }
  console.log(index)
  console.log(oldVNode)
  if (currentPatch.length) {
    patches[index] = currentPatch;
  }
}


function diffProps(oldProps, newProps, currentPatch) {
  let propsPatches = {}
  
  let key,count
  //查找不同的属性
  for(key in oldProps) {
    if (newProps[key] !== oldProps[key]) {
      propsPatches[key] = newProps[key]
      count ++
    }
  }
  //查找新增的属性
  for(key in newProps) {
    if(!oldProps.hasOwnProperty(key)) {
      propsPatches[key] = newProps[key]
      count ++
    }
  }
  
  if (count > 0) {
    currentPatch.push({
      type: 'props',
      props: propsPatches
    })
  }
}


function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {

  let diffs = listDiff(oldChildren, newChildren, 'tag');
  newChildren = diffs.children;
  if (diffs.moves.length) {
    let reorderPatch = {
      type: 'reorder',
      moves: diffs.moves
    };
    currentPatch.push(reorderPatch);
  }
  

  oldChildren.map(function(child, i) {
    let newChild = newChildren[i];
    
    dfsWalk(child, newChild, index + 1, patches);
  })
}