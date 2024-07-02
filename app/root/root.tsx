'use client'

import { type PropsWithChildren, useEffect, useMemo, useState } from "react"
import {
    SDKProvider,
    useLaunchParams,
    useMiniApp,
    useThemeParams,
    useViewport,
    bindMiniAppCSSVars,
    bindThemeParamsCSSVars,
    bindViewportCSSVars,
} from '@tma.js/sdk-react'
import { useDidMount } from "../hooks/useDidMount"
import { AppRoot } from '@telegram-apps/telegram-ui'
import { ErrorBoundary } from '@/app/components/ErrorBoundary'
import { ErrorPage } from '@/app/components/ErrorPage'
import { useTelegramMock } from "../hooks/useTelegramMock"

function App(props: PropsWithChildren) {
    const lp = useLaunchParams()
    const miniApp = useMiniApp()
    const themeParams = useThemeParams()
    const viewPort = useViewport()

    useEffect(() => {
        return bindMiniAppCSSVars(miniApp, themeParams)
    }, [miniApp, themeParams])

    useEffect(() => {
        return bindThemeParamsCSSVars(themeParams)
    }, [themeParams])

    useEffect(() => {
        return viewPort && bindViewportCSSVars(viewPort)
    }, [viewPort])

    return (
        <AppRoot
            appearance={miniApp.isDark ? 'dark' : 'light'}
            platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
        >
            {props.children}
        </AppRoot>
    )
}

function RootInner({ children }: PropsWithChildren) {
    // Mock Telegram environment in development mode if needed.
    if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useTelegramMock();
    }

    return (
        <SDKProvider debug>
            <App>
                {children}
            </App>
        </SDKProvider>
    )
}

export function Root(props: PropsWithChildren) {
    const didMount = useDidMount()

    return didMount ? (
        <ErrorBoundary fallback={ErrorPage}>
            <RootInner {...props} />
        </ErrorBoundary>
    ) : <div className='root__loading'>Loading</div>
}