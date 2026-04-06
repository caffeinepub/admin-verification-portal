// @ts-nocheck
import { IDL } from '@icp-sdk/core/candid';

const Submission = IDL.Record({ username: IDL.Text, timestamp: IDL.Int });
const Result = IDL.Variant({ ok: IDL.Text, err: IDL.Text });

export const idlService = IDL.Service({
  submitVerification: IDL.Func([IDL.Text, IDL.Text], [Result], []),
  getSubmissions: IDL.Func([], [IDL.Vec(Submission)], ['query']),
});
export const idlInitArgs = [];
export const idlFactory = ({ IDL }) => {
  const Submission = IDL.Record({ username: IDL.Text, timestamp: IDL.Int });
  const Result = IDL.Variant({ ok: IDL.Text, err: IDL.Text });
  return IDL.Service({
    submitVerification: IDL.Func([IDL.Text, IDL.Text], [Result], []),
    getSubmissions: IDL.Func([], [IDL.Vec(Submission)], ['query']),
  });
};
export const init = ({ IDL }) => [];
