import { Application } from './Application'
import {
  ApplicationContext,
  ApplicationRole,
  ApplicationStateSchema,
} from './StateMachine'
import { ApplicationTypes } from './ApplicationTypes'
import { Schema } from './Form'
import { EventObject, MachineConfig } from 'xstate'
import { MachineOptions, StatesConfig } from 'xstate/lib/types'

export interface ApplicationTemplate<
  TContext extends ApplicationContext,
  TStateSchema extends ApplicationStateSchema<TEvents>,
  TEvents extends EventObject
> {
  readonly readyForProduction?: boolean
  readonly type: ApplicationTypes
  readonly name: string
  readonly dataSchema: Schema
  readonly stateMachineConfig: MachineConfig<
    TContext,
    TStateSchema,
    TEvents
  > & {
    states: StatesConfig<TContext, TStateSchema, TEvents> // TODO Extend StatesConfig to completely enforce meta being required attribute
  }
  readonly stateMachineOptions?: Partial<MachineOptions<TContext, TEvents>>
  mapUserToRole(
    id: string,
    application: Application,
  ): ApplicationRole | undefined
}
