import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Submission {
    username: string;
    timestamp: bigint;
}
export interface backendInterface {
    submitVerification: (username: string, adminKey: string) => Promise<{ ok: string } | { err: string }>;
    getSubmissions: () => Promise<Submission[]>;
}
