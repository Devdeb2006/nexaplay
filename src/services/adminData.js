import { request } from './apiClient'

export function getUsers() {
  return request('/users')
}

export function getSubscriptions() {
  return request('/subscriptions')
}

export function getPayments() {
  return request('/payments')
}
