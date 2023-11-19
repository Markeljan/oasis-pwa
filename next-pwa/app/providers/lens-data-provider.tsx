"use client";

import { LensConfig, LensProvider, development } from '@lens-protocol/react-web';
import { bindings as wagmiBindings } from '@lens-protocol/wagmi';

const lensConfig: LensConfig = {
    bindings: wagmiBindings(),
    environment: development,
};

export function LensDataProvider({ children }: { children: React.ReactNode }) {
    return (
        <LensProvider config={lensConfig}>
            {children}
        </LensProvider>
    );
}