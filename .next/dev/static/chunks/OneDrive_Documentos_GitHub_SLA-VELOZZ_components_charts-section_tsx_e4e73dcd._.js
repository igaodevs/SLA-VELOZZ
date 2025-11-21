(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChartsSection",
    ()=>ChartsSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/lucide-react/dist/esm/icons/trending-down.js [app-client] (ecmascript) <export default as TrendingDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$LabelList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/recharts/es6/component/LabelList.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/recharts/es6/cartesian/ReferenceLine.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Brush$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/recharts/es6/cartesian/Brush.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function CustomTooltip({ active, payload, label }) {
    if (!active || !payload || !payload.length) return null;
    const data = payload[0]?.payload;
    if (!data) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border bg-background/95 px-4 py-3 text-xs shadow-xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-1 text-sm font-semibold",
                children: label
            }, void 0, false, {
                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-1.5 text-muted-foreground",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-2 text-foreground",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-2.5 w-2.5 rounded-full bg-red-500"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                        lineNumber: 39,
                                        columnNumber: 13
                                    }, this),
                                    "Atrasos"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                lineNumber: 38,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold text-foreground",
                                children: [
                                    data.atrasos,
                                    " pedidos"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-2.5 w-2.5 rounded-full bg-emerald-500"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                        lineNumber: 46,
                                        columnNumber: 13
                                    }, this),
                                    "No prazo"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: [
                                    data.noPrazo,
                                    " pedidos"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Média de atraso"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium text-foreground",
                                children: data.mediaDias > 0 ? `${data.mediaDias} dias` : 'Sem atraso'
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Total analisado"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                lineNumber: 58,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium text-foreground",
                                children: [
                                    data.atrasos + data.noPrazo,
                                    " pedidos"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_c = CustomTooltip;
function LegendContent() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap gap-4 text-xs text-muted-foreground",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "h-2.5 w-2.5 rounded-full bg-red-500"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    "Atrasos"
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "h-2.5 w-2.5 rounded-full bg-emerald-500"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    "No prazo"
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "h-2 w-6 rounded-full border border-dashed border-primary/60"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    "Média geral"
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
_c1 = LegendContent;
function ChartsSection({ data, onClose }) {
    _s();
    const [selectedZona, setSelectedZona] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Todas');
    const zonas = Array.from(new Set(data.map((row)=>{
        const raw = row.zona ?? row.zona_matriz;
        const value = typeof raw === 'string' ? raw.trim() : raw;
        return value || 'Sem zona';
    }))).filter(Boolean).sort();
    const filteredData = selectedZona === 'Todas' ? data : data.filter((row)=>{
        const raw = row.zona ?? row.zona_matriz;
        const value = typeof raw === 'string' ? raw.trim() : raw;
        const normalized = value || 'Sem zona';
        return normalized === selectedZona;
    });
    const sellerDelays = filteredData.reduce((acc, row)=>{
        const vendedor = row.vendedor || row.cliente || row.conta || 'Sem vendedor';
        if (!acc[vendedor]) {
            acc[vendedor] = {
                vendedor,
                atrasos: 0,
                total: 0,
                totalDiasAtraso: 0,
                totalPedidos: 0
            };
        }
        acc[vendedor].total++;
        acc[vendedor].totalPedidos++;
        if (row.status === 'Atrasado') {
            acc[vendedor].atrasos++;
            acc[vendedor].totalDiasAtraso += row.dias;
        }
        return acc;
    }, {});
    const chartData = Object.values(sellerDelays).map((seller)=>({
            vendedor: seller.vendedor,
            atrasos: seller.atrasos,
            noPrazo: seller.total - seller.atrasos,
            percentual: seller.total > 0 ? Math.round(seller.atrasos / seller.total * 100) : 0,
            mediaDias: seller.atrasos > 0 ? Math.round(seller.totalDiasAtraso / seller.atrasos) : 0,
            totalPedidos: seller.totalPedidos
        })).sort((a, b)=>b.percentual - a.percentual);
    const topSellers = chartData.slice(0, 10);
    const totalSellers = chartData.length;
    const metrics = chartData.reduce((acc, seller)=>{
        acc.totalAtrasos += seller.atrasos;
        acc.totalPedidos += seller.atrasos + seller.noPrazo;
        acc.mediaPercentual += seller.percentual;
        return acc;
    }, {
        totalAtrasos: 0,
        totalPedidos: 0,
        mediaPercentual: 0
    });
    const avgPercentual = totalSellers ? Math.round(metrics.mediaPercentual / totalSellers) : 0;
    const chartRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [exporting, setExporting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleExport = async (format)=>{
        if (!chartRef.current) return;
        try {
            setExporting(true);
            const html2canvas = (await __turbopack_context__.A("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/html2canvas/dist/html2canvas.js [app-client] (ecmascript, async loader)")).default;
            const canvas = await html2canvas(chartRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: null
            });
            const dataUrl = canvas.toDataURL('image/png');
            if (format === 'png') {
                const a = document.createElement('a');
                a.href = dataUrl;
                a.download = `grafico_atrasos_${Date.now()}.png`;
                document.body.appendChild(a);
                a.click();
                a.remove();
            } else {
                const { jsPDF } = await __turbopack_context__.A("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/jspdf/dist/jspdf.es.min.js [app-client] (ecmascript, async loader)");
                const pdf = new jsPDF({
                    orientation: 'landscape'
                });
                const imgProps = pdf.getImageProperties(dataUrl);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = imgProps.height * pdfWidth / imgProps.width;
                pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save(`grafico_atrasos_${Date.now()}.pdf`);
            }
        } catch (err) {
            console.error('Export failed', err);
            alert('Falha ao exportar. Verifique o console para mais detalhes.');
        } finally{
            setExporting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "fixed inset-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 animate-in fade-in duration-300",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-3 sm:px-4 py-6 md:py-8 h-full overflow-y-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-6xl mx-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-start md:items-center mb-6 md:mb-8 gap-4 flex-wrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl md:text-3xl font-bold mb-1.5 md:mb-2 flex items-center gap-2 md:gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__["TrendingDown"], {
                                                className: "w-7 h-7 md:w-8 md:h-8 text-destructive"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                lineNumber: 193,
                                                columnNumber: 17
                                            }, this),
                                            "Análise de Atrasos"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                        lineNumber: 192,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm md:text-base text-muted-foreground",
                                        children: "Ranking automático e percentual de vendedores com mais atrasos e maior volume de pedidos"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                        lineNumber: 196,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                lineNumber: 191,
                                columnNumber: 13
                            }, this),
                            zonas.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground",
                                        children: "Filtrar por zona:"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                        lineNumber: 202,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: "h-9 rounded-md border bg-background px-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary",
                                        value: selectedZona,
                                        onChange: (e)=>setSelectedZona(e.target.value),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Todas",
                                                children: "Todas"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                lineNumber: 208,
                                                columnNumber: 19
                                            }, this),
                                            zonas.map((zona)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: zona,
                                                    children: zona
                                                }, zona, false, {
                                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                    lineNumber: 210,
                                                    columnNumber: 21
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                        lineNumber: 203,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                lineNumber: 201,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "icon",
                                onClick: onClose,
                                className: "hover:bg-destructive/10",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                    lineNumber: 218,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                lineNumber: 217,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                        lineNumber: 190,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: chartRef,
                        className: "grid md:grid-cols-2 gap-5 md:gap-6 mb-6 md:mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                className: "p-4 md:p-6 shadow-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-1 mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-semibold",
                                                children: "Percentual de atrasos por vendedor"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                lineNumber: 225,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-muted-foreground",
                                                children: "Barras verticais ordenadas por maior percentual de atrasos considerando os pedidos analisados."
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                lineNumber: 226,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                        lineNumber: 224,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                        width: "100%",
                                        height: 380,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                                            data: chartData,
                                            margin: {
                                                top: 20,
                                                right: 16,
                                                left: -10,
                                                bottom: 20
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                    strokeDasharray: "3 3",
                                                    vertical: false,
                                                    stroke: "hsl(var(--border))",
                                                    opacity: 0.25
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                    lineNumber: 232,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                    dataKey: "vendedor",
                                                    tickLine: false,
                                                    axisLine: {
                                                        stroke: 'hsl(var(--border))'
                                                    },
                                                    className: "text-[11px] md:text-xs",
                                                    height: 60,
                                                    angle: -25,
                                                    textAnchor: "end"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                    lineNumber: 233,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                    tickLine: false,
                                                    axisLine: {
                                                        stroke: 'hsl(var(--border))'
                                                    },
                                                    tickFormatter: (value)=>`${value}%`,
                                                    domain: [
                                                        0,
                                                        100
                                                    ]
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                    lineNumber: 242,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                    content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomTooltip, {}, void 0, false, {
                                                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                        lineNumber: 248,
                                                        columnNumber: 37
                                                    }, void 0),
                                                    cursor: {
                                                        fill: 'hsl(var(--muted) / 0.3)'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                    lineNumber: 248,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
                                                    verticalAlign: "top",
                                                    align: "right",
                                                    content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LegendContent, {}, void 0, false, {
                                                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                        lineNumber: 249,
                                                        columnNumber: 70
                                                    }, void 0),
                                                    wrapperStyle: {
                                                        paddingBottom: 16
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                    lineNumber: 249,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                                    y: avgPercentual,
                                                    stroke: "hsl(var(--primary))",
                                                    strokeDasharray: "3 3",
                                                    strokeOpacity: 0.6,
                                                    label: {
                                                        value: `Média ${avgPercentual}%`,
                                                        position: 'right',
                                                        fill: 'hsl(var(--primary))',
                                                        fontSize: 10,
                                                        fontWeight: 600
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                    dataKey: "atrasos",
                                                    stackId: "a",
                                                    fill: "#ef4444",
                                                    radius: [
                                                        8,
                                                        0,
                                                        0,
                                                        8
                                                    ],
                                                    barSize: 26,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$LabelList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LabelList"], {
                                                        dataKey: "atrasos",
                                                        position: "insideTop",
                                                        className: "text-[10px] md:text-xs fill-white font-semibold"
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                        lineNumber: 265,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                    lineNumber: 264,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                    dataKey: "noPrazo",
                                                    stackId: "a",
                                                    fill: "#22c55e",
                                                    radius: [
                                                        0,
                                                        8,
                                                        8,
                                                        0
                                                    ],
                                                    barSize: 26,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$LabelList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LabelList"], {
                                                        dataKey: "noPrazo",
                                                        position: "insideTop",
                                                        className: "text-[10px] md:text-xs fill-white font-semibold"
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                        lineNumber: 268,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                    lineNumber: 267,
                                                    columnNumber: 19
                                                }, this),
                                                chartData.length > 12 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Brush$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Brush"], {
                                                    dataKey: "vendedor",
                                                    height: 18,
                                                    travellerWidth: 12,
                                                    stroke: "hsl(var(--primary))",
                                                    fill: "hsl(var(--muted))",
                                                    className: "[&>rect]:rounded-full"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                    lineNumber: 271,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                            lineNumber: 231,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                        lineNumber: 230,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                lineNumber: 223,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                className: "p-4 md:p-6 shadow-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-base md:text-lg font-semibold mb-1.5",
                                                    children: "Panorama dos atrasos"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                    lineNumber: 288,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: "Métricas consolidadas após aplicar o filtro Mercado Livre."
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                    lineNumber: 289,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                            lineNumber: 287,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-3 text-center text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-xl border bg-muted/30 p-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs uppercase tracking-wide text-muted-foreground",
                                                            children: "Pedidos analisados"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                            lineNumber: 295,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-1 text-2xl font-bold",
                                                            children: metrics.totalPedidos
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                            lineNumber: 296,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                    lineNumber: 294,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-xl border bg-muted/30 p-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs uppercase tracking-wide text-muted-foreground",
                                                            children: "Pedidos atrasados"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                            lineNumber: 299,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-1 text-2xl font-bold text-destructive",
                                                            children: metrics.totalAtrasos
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                            lineNumber: 300,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                    lineNumber: 298,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-xl border bg-muted/30 p-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs uppercase tracking-wide text-muted-foreground",
                                                            children: "Média geral"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                            lineNumber: 303,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-1 text-2xl font-bold",
                                                            children: [
                                                                avgPercentual,
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                            lineNumber: 304,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                    lineNumber: 302,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-xl border bg-muted/30 p-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs uppercase tracking-wide text-muted-foreground",
                                                            children: "Vendedores avaliados"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                            lineNumber: 307,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-1 text-2xl font-bold",
                                                            children: totalSellers
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                            lineNumber: 308,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                    lineNumber: 306,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                            lineNumber: 293,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border-t pt-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-sm font-semibold mb-3",
                                                    children: "Ranking detalhado"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                    lineNumber: 312,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-3",
                                                    children: topSellers.slice(0, 5).map((seller, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-3",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: `h-8 w-8 rounded-full text-sm font-bold flex items-center justify-center ${index === 0 ? 'bg-red-500 text-white' : index === 1 ? 'bg-orange-500 text-white' : index === 2 ? 'bg-amber-500 text-white' : 'bg-muted text-foreground'}`,
                                                                            children: index + 1
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                                            lineNumber: 317,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-sm font-semibold",
                                                                                    children: seller.vendedor
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                                                    lineNumber: 331,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-xs text-muted-foreground",
                                                                                    children: [
                                                                                        seller.atrasos,
                                                                                        " atrasos de ",
                                                                                        seller.atrasos + seller.noPrazo,
                                                                                        " pedidos"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                                                    lineNumber: 332,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                                            lineNumber: 330,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                                    lineNumber: 316,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-right",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm font-bold text-foreground",
                                                                            children: [
                                                                                seller.percentual,
                                                                                "%"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                                            lineNumber: 338,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        seller.mediaDias > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs text-muted-foreground",
                                                                            children: [
                                                                                "Média ",
                                                                                seller.mediaDias,
                                                                                " dias"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                                            lineNumber: 340,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                                    lineNumber: 337,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, seller.vendedor, true, {
                                                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                            lineNumber: 315,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                                    lineNumber: 313,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                            lineNumber: 311,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                    lineNumber: 286,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                lineNumber: 285,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                        lineNumber: 222,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                onClick: ()=>handleExport('png'),
                                className: "gap-2 hover:bg-primary hover:text-primary-foreground transition-colors",
                                disabled: exporting,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                        lineNumber: 358,
                                        columnNumber: 15
                                    }, this),
                                    exporting ? 'Exportando...' : 'Exportar PNG'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                lineNumber: 352,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                onClick: ()=>handleExport('pdf'),
                                className: "gap-2 hover:bg-primary hover:text-primary-foreground transition-colors",
                                disabled: exporting,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                        lineNumber: 367,
                                        columnNumber: 15
                                    }, this),
                                    exporting ? 'Exportando...' : 'Exportar PDF'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                                lineNumber: 361,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                        lineNumber: 351,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
                lineNumber: 189,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
            lineNumber: 188,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx",
        lineNumber: 187,
        columnNumber: 5
    }, this);
}
_s(ChartsSection, "iDNNMZPTsjZZJ6q9RlBTYl/hmNU=");
_c2 = ChartsSection;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "CustomTooltip");
__turbopack_context__.k.register(_c1, "LegendContent");
__turbopack_context__.k.register(_c2, "ChartsSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/charts-section.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=OneDrive_Documentos_GitHub_SLA-VELOZZ_components_charts-section_tsx_e4e73dcd._.js.map