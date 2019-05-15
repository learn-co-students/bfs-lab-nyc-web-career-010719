function bfs(rootNode, vertices, edges){
  rootNode.distance = 0
  let order = [rootNode]
  let queue = [rootNode]
  while (queue.length != 0) {
    let currentNode = queue.shift()
    let adjacentNodes = findAdjacent(currentNode.name, vertices, edges)
    order = addToList(adjacentNodes, order)
    markDistanceAndPredecessor(currentNode, adjacentNodes)
    queue = addToList(adjacentNodes, queue)
  }
  return order
}

function findAdjacent(node, vertices, edges) {
  let adjacentEdges = edges.filter(edge => edge.includes(node))
  let adjacentNodes = adjacentEdges.map(edge => edge.filter(edgeNode => edgeNode !== node))
  let adjacentVertices = adjacentNodes.map(adjNode => vertices.find(vertex => adjNode[0] === vertex.name))
  let undiscoveredNodes = adjacentVertices.filter(adjVertex => adjVertex.distance === null)
  return undiscoveredNodes
}

function markDistanceAndPredecessor(predecessor, adjacentNodes) {
  adjacentNodes.map(adjNode => {
    adjNode.distance = predecessor.distance + 1
    adjNode.predecessor = predecessor
  })
}

function addToList(node, list) {
  return list.concat(node)
}
