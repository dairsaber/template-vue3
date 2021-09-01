import type { Cell } from '@/components/base-detail/types'

/**
 * 定义详情的配置
 * @param cells
 * @returns
 */
export const defineCells = <T extends Recordable = Recordable>(cells: Record<keyof T & Recordable, Cell>): Recordable<Cell> => {
  return cells
}
