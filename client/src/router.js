import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard, authSettled } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage'),
    beforeEnter: authSettled
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/decks',
    name: 'Deck',
    component: loadPage('DecksPage'),
    beforeEnter: authSettled
  },
  {
    path: '/flashcards/:deckId',
    name: 'Flashcard',
    component: loadPage('FlashcardsPage'),
    beforeEnter: authSettled
  },
  {
    path: '/study/:deckId',
    name: 'Study',
    component: loadPage('StudyPage'),
    beforeEnter: authSettled
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
