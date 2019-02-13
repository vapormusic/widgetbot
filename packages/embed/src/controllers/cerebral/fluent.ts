import {
  ConnectFactory,
  IBranchContext,
  IContext,
  SequenceFactory,
  SequenceWithPropsFactory
} from '@cerebral/fluent'
import { Provider as RouterProvider } from '@cerebral/router'

import { Signals, State } from '../../store/types'

// import Controller from '.'
interface Providers {
  router: RouterProvider
  storage: any
  state: State
}

export type Context<Props = {}> = IContext<Props> & Providers

export type BranchContext<Paths, Props = {}> = IBranchContext<Paths, Props> &
  Providers

export const connect = ConnectFactory<State, Signals>()

export const sequence = SequenceFactory<Context>()

export const sequenceWithProps = SequenceWithPropsFactory<Context>()
