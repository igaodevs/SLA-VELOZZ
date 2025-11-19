(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/ClientOnly.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ClientOnly
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function ClientOnly({ children }) {
    _s();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClientOnly.useEffect": ()=>{
            setMounted(true);
        }
    }["ClientOnly.useEffect"], []);
    if (!mounted) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(ClientOnly, "LrrVfNW3d1raFE0BNzCTILYmIfo=");
_c = ClientOnly;
var _c;
__turbopack_context__.k.register(_c, "ClientOnly");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/ui/page-transition.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageTransition",
    ()=>PageTransition,
    "fadeIn",
    ()=>fadeIn,
    "fadeInUp",
    ()=>fadeInUp,
    "staggerContainer",
    ()=>staggerContainer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function PageTransition({ children }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [isFirstMount, setIsFirstMount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PageTransition.useEffect": ()=>{
            const handleRouteChange = {
                "PageTransition.useEffect.handleRouteChange": ()=>{
                    setIsFirstMount(false);
                }
            }["PageTransition.useEffect.handleRouteChange"];
            // Set a timeout to ensure the initial animation only runs once
            const timer = setTimeout({
                "PageTransition.useEffect.timer": ()=>{
                    setIsFirstMount(false);
                }
            }["PageTransition.useEffect.timer"], 1000);
            return ({
                "PageTransition.useEffect": ()=>clearTimeout(timer)
            })["PageTransition.useEffect"];
        }
    }["PageTransition.useEffect"], []);
    // Initial page load animation
    if (isFirstMount) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            transition: {
                duration: 0.6,
                ease: [
                    0.25,
                    0.1,
                    0.25,
                    1
                ]
            },
            children: children
        }, void 0, false, {
            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/ui/page-transition.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, this);
    }
    // Page transition animation
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        mode: "wait",
        initial: false,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: "initial",
            animate: "animate",
            exit: "exit",
            variants: pageVariants,
            transition: pageTransition,
            children: children
        }, pathname, false, {
            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/ui/page-transition.tsx",
            lineNumber: 40,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/ui/page-transition.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_s(PageTransition, "mGH0VOO0I0+5e7O9wdo80CPmupc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = PageTransition;
// Animation variants
const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.98
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [
                0.25,
                0.1,
                0.25,
                1
            ]
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        scale: 0.98,
        transition: {
            duration: 0.3,
            ease: [
                0.25,
                0.1,
                0.25,
                1
            ]
        }
    }
};
const pageTransition = {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.5
};
const staggerContainer = {
    hidden: {
        opacity: 0
    },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};
const fadeInUp = {
    hidden: {
        opacity: 0,
        y: 20
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [
                0.25,
                0.1,
                0.25,
                1
            ]
        }
    }
};
const fadeIn = {
    hidden: {
        opacity: 0
    },
    show: {
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [
                0.25,
                0.1,
                0.25,
                1
            ]
        }
    }
};
var _c;
__turbopack_context__.k.register(_c, "PageTransition");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/providers/animated-layout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnimatedLayout",
    ()=>AnimatedLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$components$2f$ui$2f$page$2d$transition$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/ui/page-transition.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function AnimatedLayout({ children }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$components$2f$ui$2f$page$2d$transition$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageTransition"], {
        children: children
    }, pathname, false, {
        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/providers/animated-layout.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_s(AnimatedLayout, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = AnimatedLayout;
var _c;
__turbopack_context__.k.register(_c, "AnimatedLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/smooth-scroll.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SmoothScroll",
    ()=>SmoothScroll
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$react$2d$scroll$2f$modules$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/react-scroll/modules/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function SmoothScroll({ children }) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SmoothScroll.useEffect": ()=>{
            const handleRouteChange = {
                "SmoothScroll.useEffect.handleRouteChange": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$react$2d$scroll$2f$modules$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animateScroll"].scrollToTop({
                        duration: 500,
                        smooth: 'easeInOutQuart'
                    });
                }
            }["SmoothScroll.useEffect.handleRouteChange"];
            // Add smooth scroll behavior to all anchor links
            const handleClick = {
                "SmoothScroll.useEffect.handleClick": (e)=>{
                    const target = e.target;
                    if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
                        e.preventDefault();
                        const targetId = target.getAttribute('href');
                        const targetElement = document.querySelector(targetId || '');
                        if (targetElement) {
                            __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$react$2d$scroll$2f$modules$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animateScroll"].scrollTo(targetElement.getBoundingClientRect().top + window.scrollY, {
                                duration: 800,
                                smooth: 'easeInOutQuart'
                            });
                        }
                    }
                }
            }["SmoothScroll.useEffect.handleClick"];
            document.addEventListener('click', handleClick);
            return ({
                "SmoothScroll.useEffect": ()=>document.removeEventListener('click', handleClick)
            })["SmoothScroll.useEffect"];
        }
    }["SmoothScroll.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(SmoothScroll, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = SmoothScroll;
var _c;
__turbopack_context__.k.register(_c, "SmoothScroll");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/app/layout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$components$2f$ClientOnly$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/ClientOnly.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$components$2f$providers$2f$animated$2d$layout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/providers/animated-layout.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$components$2f$smooth$2d$scroll$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/smooth-scroll.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function RootLayout({ children }) {
    _s();
    const { scrollYProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"])();
    const scaleX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(scrollYProgress, {
        stiffness: 120,
        damping: 20,
        restDelta: 0.001
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "pt-BR",
        suppressHydrationWarning: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
            suppressHydrationWarning: true,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$components$2f$ClientOnly$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$components$2f$smooth$2d$scroll$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SmoothScroll"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "fixed left-0 right-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-primary via-orange-400 to-amber-400",
                            style: {
                                scaleX
                            }
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/app/layout.tsx",
                            lineNumber: 28,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$components$2f$providers$2f$animated$2d$layout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatedLayout"], {
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/app/layout.tsx",
                            lineNumber: 32,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/app/layout.tsx",
                    lineNumber: 27,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/app/layout.tsx",
                lineNumber: 26,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/app/layout.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/app/layout.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_s(RootLayout, "UYAOtHxiUth0DU6Git6zGRnUBB4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"],
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"]
    ];
});
_c = RootLayout;
var _c;
__turbopack_context__.k.register(_c, "RootLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=OneDrive_Documentos_GitHub_SLA-VELOZZ_24a1b1a2._.js.map