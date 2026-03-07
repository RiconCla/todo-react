import { createSelector } from '@reduxjs/toolkit'
import { selectUser } from '../userStore.ts'

export const selectTokenUser = createSelector([selectUser], (user) => user?.access_token)
