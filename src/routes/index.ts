import { Router } from 'express'

import { auth } from './auth'
import { users } from './users'
import { media } from './media'
import { chat } from './chat'
import { pediatre } from './pediatre'
import { medical } from './medical'
import { geojson } from './geojson'

const router: Router = Router()

const routes: {
  [key: string]: (router: Router) => void
} = { auth, users, media, chat ,pediatre,medical,geojson}

for (const route in routes) {
  routes[route](router)
}

export { router }