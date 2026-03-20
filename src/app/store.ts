import { configureStore } from '@reduxjs/toolkit'
import { userStore } from '../entities/User/model/store/userStore.ts'
import { useDispatch, useSelector } from 'react-redux'
import { todosStore } from '../entities/Todo/model/store/todosStore.ts'
import { accordionItemsStore } from '../entities/Accordion/model/store/accordionItemsStore.ts'
import { accordionStateStore } from '../entities/Accordion/model/store/accordionStore.ts'
import { todoApiRTK } from '../entities/Todo/api/todoApi.ts'
import { rtkApi } from '../shared/api/rtkApi.ts'

export const store = configureStore({
	reducer: {
		userSlice: userStore.reducer,
		todosSlice: todosStore.reducer,
		[rtkApi.reducerPath]: todoApiRTK.reducer,
		accordionItemsSlice: accordionItemsStore.reducer,
		accordionStateSlice: accordionStateStore.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoApiRTK.middleware),
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
