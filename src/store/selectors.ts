import { RootState } from './store'

// export const userSelector = createSelector(
//   (state: RootState) => state.user.value,
//   (value) =>
//     value.find(({ products }: Order) => products.find((id) => id))?.title ??
//     'none',
// )

export const userSelector = (state: RootState) => state.user.value
