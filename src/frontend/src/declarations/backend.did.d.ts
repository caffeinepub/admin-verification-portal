/* eslint-disable */
// @ts-nocheck
import type { ActorMethod } from '@icp-sdk/core/agent';
import type { IDL } from '@icp-sdk/core/candid';
import type { Principal } from '@icp-sdk/core/principal';

export interface Submission {
    'username': string;
    'timestamp': bigint;
}
export type Result = { 'ok': string } | { 'err': string };
export interface _SERVICE {
    'submitVerification': ActorMethod<[string, string], Result>;
    'getSubmissions': ActorMethod<[], Submission[]>;
}
export declare const idlService: IDL.ServiceClass;
export declare const idlInitArgs: IDL.Type[];
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
