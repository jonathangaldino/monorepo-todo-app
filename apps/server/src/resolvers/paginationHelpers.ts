import { Node, PageInfo } from '@core/schemas/__generated__/graphql'

export function paginate<T extends Node>(data: T[]) {
  const pageInfo: PageInfo = {}

  const edges = data.map((node, index) => {
    const isFirstNode = index === 0
    const isLastNode = data[index + 1] === undefined

    if (isFirstNode) {
      pageInfo.startCursor = node.id
    }

    if (isLastNode) {
      pageInfo.lastCursor = node.id
    }

    return {
      node,
      cursor: isLastNode ? node.id : null,
    }
  })

  return {
    edges: edges,
    pageInfo,
  }
}
