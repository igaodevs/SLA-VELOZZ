(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/ui/progress.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Progress",
    ()=>Progress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$progress$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/@radix-ui/react-progress/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
function Progress({ className, value, indicatorClassName, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$progress$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "progress",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-primary/20 relative h-2 w-full overflow-hidden rounded-full', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$progress$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Indicator"], {
            "data-slot": "progress-indicator",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('h-full w-full flex-1 transition-all', indicatorClassName || 'bg-primary'),
            style: {
                transform: `translateX(-${100 - (value || 0)}%)`
            }
        }, void 0, false, {
            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/ui/progress.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/ui/progress.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c = Progress;
;
var _c;
__turbopack_context__.k.register(_c, "Progress");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/hooks/useFileDrop.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFileDrop",
    ()=>useFileDrop
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
// Mapeamento de tipos MIME para extensões
const MIME_TYPES = {
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx'
    ],
    'application/vnd.ms-excel': [
        '.xls'
    ],
    'text/csv': [
        '.csv'
    ]
};
function useFileDrop({ onDrop, acceptedTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
], maxSize = 100 * 1024 * 1024 // Aumentado para 100MB
 }) {
    _s();
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const getFileExtension = (filename)=>{
        return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase();
    };
    const validateFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useFileDrop.useCallback[validateFile]": (file)=>{
            // Reset error state
            setError(null);
            // Verifica se o tipo do arquivo é válido
            const isValidType = acceptedTypes.some({
                "useFileDrop.useCallback[validateFile].isValidType": (type)=>{
                    // Verifica pelo tipo MIME
                    if (file.type === type) return true;
                    // Verifica pela extensão do arquivo
                    const fileExt = getFileExtension(file.name);
                    const validExtensions = MIME_TYPES[type] || [];
                    return validExtensions.some({
                        "useFileDrop.useCallback[validateFile].isValidType": (ext)=>`.${fileExt}` === ext
                    }["useFileDrop.useCallback[validateFile].isValidType"]);
                }
            }["useFileDrop.useCallback[validateFile].isValidType"]);
            if (!isValidType) {
                const allowedExtensions = acceptedTypes.flatMap({
                    "useFileDrop.useCallback[validateFile].allowedExtensions": (type)=>MIME_TYPES[type] || []
                }["useFileDrop.useCallback[validateFile].allowedExtensions"]).join(', ');
                setError(`Tipo de arquivo não suportado. Use: ${allowedExtensions || 'arquivos Excel (.xlsx, .xls)'}`);
                return false;
            }
            // Verifica o tamanho do arquivo
            if (file.size > maxSize) {
                const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
                const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
                setError(`Arquivo muito grande (${fileSizeMB}MB). Tamanho máximo: ${maxSizeMB}MB`);
                return false;
            }
            // Verifica se o arquivo não está vazio
            if (file.size === 0) {
                setError('O arquivo está vazio');
                return false;
            }
            return true;
        }
    }["useFileDrop.useCallback[validateFile]"], [
        acceptedTypes,
        maxSize
    ]);
    const handleDragOver = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useFileDrop.useCallback[handleDragOver]": (e)=>{
            e.preventDefault();
            e.stopPropagation();
            if (!isDragging) setIsDragging(true);
        }
    }["useFileDrop.useCallback[handleDragOver]"], [
        isDragging
    ]);
    const handleDragEnter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useFileDrop.useCallback[handleDragEnter]": (e)=>{
            e.preventDefault();
            e.stopPropagation();
            setError(null);
            setIsDragging(true);
        }
    }["useFileDrop.useCallback[handleDragEnter]"], []);
    const handleDragLeave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useFileDrop.useCallback[handleDragLeave]": (e)=>{
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
        }
    }["useFileDrop.useCallback[handleDragLeave]"], []);
    const handleDrop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useFileDrop.useCallback[handleDrop]": (e)=>{
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
            const files = e.dataTransfer.files;
            // Verifica se há arquivos
            if (!files || files.length === 0) {
                setError('Nenhum arquivo encontrado');
                return;
            }
            // Apenas o primeiro arquivo é processado
            const file = files[0];
            // Valida o arquivo
            if (validateFile(file)) {
                try {
                    onDrop(file);
                } catch (error) {
                    console.error('Erro ao processar o arquivo:', error);
                    setError('Erro ao processar o arquivo. Tente novamente.');
                }
            }
        }
    }["useFileDrop.useCallback[handleDrop]"], [
        onDrop,
        validateFile
    ]);
    return {
        isDragging,
        error,
        resetError: (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
            "useFileDrop.useCallback": ()=>setError(null)
        }["useFileDrop.useCallback"], []),
        dragProps: {
            onDragOver: handleDragOver,
            onDragEnter: handleDragEnter,
            onDragLeave: handleDragLeave,
            onDrop: handleDrop
        }
    };
}
_s(useFileDrop, "ebD/BvIBZ4Ia09qgSTALFXMyGBU=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UploadSection",
    ()=>UploadSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$spreadsheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSpreadsheet$3e$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/lucide-react/dist/esm/icons/file-spreadsheet.js [app-client] (ecmascript) <export default as FileSpreadsheet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$components$2f$ui$2f$progress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/ui/progress.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$hooks$2f$useFileDrop$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/hooks/useFileDrop.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
const UploadCard = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_s(({ title, subtitle, required = false, primary = false, file, progress, error, onDrop, onFileSelect, onRemove, accept, maxSize = 20 * 1024 * 1024 // 20MB
 })=>{
    _s();
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fileInputId = `file-upload-${title.toLowerCase().replace(/\s+/g, '-')}`;
    const { isDragging, error: dropError, dragProps, resetError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$hooks$2f$useFileDrop$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFileDrop"])({
        onDrop,
        acceptedTypes: accept ? [
            accept
        ] : [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
            'text/csv'
        ],
        maxSize
    });
    // Mostrar erro do drop, se houver
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UploadCard.useEffect": ()=>{
            if (dropError) {
                __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(dropError, {
                    position: 'top-center',
                    duration: 5000
                });
                // Limpa o erro após exibir a notificação
                const timer = setTimeout({
                    "UploadCard.useEffect.timer": ()=>{
                        resetError();
                    }
                }["UploadCard.useEffect.timer"], 5000);
                return ({
                    "UploadCard.useEffect": ()=>clearTimeout(timer)
                })["UploadCard.useEffect"];
            }
        }
    }["UploadCard.useEffect"], [
        dropError,
        resetError
    ]);
    // Formatar tamanho do arquivo
    const formatFileSize = (bytes)=>{
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = [
            'Bytes',
            'KB',
            'MB',
            'GB'
        ];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };
    const handleFileSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "UploadCard.useCallback[handleFileSelect]": (e)=>{
            const file = e.target.files?.[0];
            if (file) {
                // Validar arquivo antes de prosseguir
                const fileExt = file.name.split('.').pop()?.toLowerCase();
                const validExtensions = [
                    'xlsx',
                    'xls',
                    'csv'
                ];
                if (fileExt && !validExtensions.includes(fileExt)) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Formato de arquivo não suportado. Use arquivos .xlsx, .xls ou .csv', {
                        position: 'top-center',
                        duration: 5000
                    });
                    return;
                }
                if (file.size > maxSize) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(`Arquivo muito grande (${formatFileSize(file.size)}). Tamanho máximo: ${formatFileSize(maxSize)}`, {
                        position: 'top-center',
                        duration: 5000
                    });
                    return;
                }
                onFileSelect(e);
            }
            // Resetar o input para permitir selecionar o mesmo arquivo novamente
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    }["UploadCard.useCallback[handleFileSelect]"], [
        onFileSelect,
        maxSize
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('p-6 transition-all', primary ? 'border-primary/50 bg-primary/5' : '', isDragging ? 'ring-2 ring-primary' : '', error ? 'border-red-500/50' : ''),
        ...dragProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col h-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start justify-between mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-medium flex items-center gap-2",
                                    children: [
                                        title,
                                        required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-red-500",
                                            children: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                                            lineNumber: 125,
                                            columnNumber: 28
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                                    lineNumber: 123,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-muted-foreground",
                                    children: subtitle
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                                    lineNumber: 127,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                            lineNumber: 122,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        file && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            size: "icon",
                            className: "h-8 w-8",
                            onClick: (e)=>{
                                e.stopPropagation();
                                onRemove();
                            },
                            disabled: progress > 0 && progress < 100,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                                lineNumber: 140,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                            lineNumber: 130,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                    lineNumber: 121,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                !file ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex-1 flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed rounded-lg text-center transition-colors', isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-muted-foreground/50', error ? 'border-red-500/50 bg-red-500/5' : ''),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('p-3 rounded-full transition-colors', error ? 'bg-red-500/10 text-red-500' : isDragging ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'),
                            children: error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                className: "h-5 w-5"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                                lineNumber: 164,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)) : isDragging ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                className: "h-5 w-5 animate-pulse"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                                lineNumber: 166,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                className: "h-5 w-5"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                                lineNumber: 168,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                            lineNumber: 153,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-medium",
                                    children: error ? 'Erro no upload' : isDragging ? 'Solte o arquivo aqui' : 'Arraste e solte o arquivo'
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                                    lineNumber: 172,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-muted-foreground mt-1",
                                    children: error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-red-500",
                                        children: error
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                                        lineNumber: 177,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)) : 'ou clique para selecionar'
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                                    lineNumber: 175,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                            lineNumber: 171,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "file",
                            className: "hidden",
                            accept: accept || ".xlsx, .xls, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, text/csv",
                            onChange: handleFileSelect,
                            id: fileInputId,
                            ref: fileInputRef
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                            lineNumber: 183,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            size: "sm",
                            className: "mt-2",
                            onClick: ()=>document.getElementById(fileInputId)?.click(),
                            children: "Selecionar Arquivo"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                            lineNumber: 191,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                    lineNumber: 146,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 p-3 bg-muted/20 hover:bg-muted/30 rounded-lg transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('p-2 rounded-lg', progress < 100 ? 'bg-primary/10 text-primary' : 'bg-green-500/10 text-green-500'),
                                    children: progress < 100 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$spreadsheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSpreadsheet$3e$__["FileSpreadsheet"], {
                                        className: "h-5 w-5"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                                        lineNumber: 210,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        className: "h-5 w-5"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                                        lineNumber: 212,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                                    lineNumber: 203,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium truncate",
                                            children: file.name
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                                            lineNumber: 217,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: formatFileSize(file.size)
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                                                    lineNumber: 219,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                progress > 0 && progress < 100 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-medium text-primary",
                                                    children: [
                                                        progress,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                                                    lineNumber: 223,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                                            lineNumber: 218,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        progress > 0 && progress < 100 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$components$2f$ui$2f$progress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Progress"], {
                                            value: progress,
                                            className: "h-1.5 mt-1.5 bg-muted",
                                            indicatorClassName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(progress < 30 ? 'bg-amber-500' : progress < 70 ? 'bg-blue-500' : 'bg-green-500')
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                                            lineNumber: 229,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                                    lineNumber: 216,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "icon",
                                    className: "h-8 w-8 text-muted-foreground hover:text-foreground",
                                    onClick: (e)=>{
                                        e.stopPropagation();
                                        onRemove();
                                    },
                                    disabled: progress > 0 && progress < 100,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                                        lineNumber: 251,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                                    lineNumber: 241,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                            lineNumber: 202,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        progress === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-muted-foreground text-right",
                            children: "Aguardando envio"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                            lineNumber: 256,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)),
                        progress === 100 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-green-600 text-right font-medium flex items-center justify-end gap-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                    className: "h-3.5 w-3.5"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                                    lineNumber: 263,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                "Upload concluído"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                            lineNumber: 262,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                    lineNumber: 201,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                (error || dropError) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-2 text-sm text-red-500 flex items-center gap-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                            className: "w-4 h-4 flex-shrink-0"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                            lineNumber: 272,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: error || dropError
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                            lineNumber: 273,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                    lineNumber: 271,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
            lineNumber: 120,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
}, "OSsfTp9RzyQAIdFlEbqLYBU+9ys=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$hooks$2f$useFileDrop$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFileDrop"]
    ];
}));
_c = UploadCard;
UploadCard.displayName = 'UploadCard';
function UploadSectionComponent({ files, uploadProgress, onFileUpload, onMerge, isMerging, className = '' }) {
    _s1();
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        main: null,
        additional1: null,
        additional2: null
    });
    const handleDrop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "UploadSectionComponent.useCallback[handleDrop]": (type, file)=>{
            // Limpa erros ao tentar fazer upload de um novo arquivo
            setErrors({
                "UploadSectionComponent.useCallback[handleDrop]": (prev)=>({
                        ...prev,
                        [type]: null
                    })
            }["UploadSectionComponent.useCallback[handleDrop]"]);
            onFileUpload(type, file);
        }
    }["UploadSectionComponent.useCallback[handleDrop]"], [
        onFileUpload
    ]);
    const handleFileSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "UploadSectionComponent.useCallback[handleFileSelect]": (e, type)=>{
            const file = e.target.files?.[0];
            if (!file) return;
            // Limpa erros ao selecionar um novo arquivo
            setErrors({
                "UploadSectionComponent.useCallback[handleFileSelect]": (prev)=>({
                        ...prev,
                        [type]: null
                    })
            }["UploadSectionComponent.useCallback[handleFileSelect]"]);
            onFileUpload(type, file);
        }
    }["UploadSectionComponent.useCallback[handleFileSelect]"], [
        onFileUpload
    ]);
    const handleRemove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "UploadSectionComponent.useCallback[handleRemove]": (type)=>{
            setErrors({
                "UploadSectionComponent.useCallback[handleRemove]": (prev)=>({
                        ...prev,
                        [type]: null
                    })
            }["UploadSectionComponent.useCallback[handleRemove]"]);
            onFileUpload(type, null);
        }
    }["UploadSectionComponent.useCallback[handleRemove]"], [
        onFileUpload
    ]);
    const canMerge = Boolean(files.main && files.additional1);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `space-y-6 ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-6 md:grid-cols-1 lg:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UploadCard, {
                        title: "Planilha Mãe",
                        subtitle: "Planilha principal com os dados base",
                        required: true,
                        primary: true,
                        file: files.main,
                        progress: uploadProgress.main,
                        error: errors.main,
                        onDrop: (file)=>handleDrop('main', file),
                        onFileSelect: (e)=>handleFileSelect(e, 'main'),
                        onRemove: ()=>handleRemove('main'),
                        accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .xlsx, .xls, .csv, text/csv"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                        lineNumber: 346,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UploadCard, {
                                title: "Planilha Avulsa 1",
                                subtitle: "Primeira planilha adicional (obrigatória)",
                                required: true,
                                file: files.additional1,
                                progress: uploadProgress.additional1,
                                error: errors.additional1,
                                onDrop: (file)=>handleDrop('additional1', file),
                                onFileSelect: (e)=>handleFileSelect(e, 'additional1'),
                                onRemove: ()=>handleRemove('additional1'),
                                accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .xlsx, .xls, .csv, text/csv"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                                lineNumber: 361,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UploadCard, {
                                title: "Planilha Avulsa 2",
                                subtitle: "Segunda planilha adicional (opcional)",
                                file: files.additional2,
                                progress: uploadProgress.additional2,
                                error: errors.additional2,
                                onDrop: (file)=>handleDrop('additional2', file),
                                onFileSelect: (e)=>handleFileSelect(e, 'additional2'),
                                onRemove: ()=>handleRemove('additional2'),
                                accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .xlsx, .xls, .csv, text/csv"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                                lineNumber: 374,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                        lineNumber: 360,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                lineNumber: 345,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-4 pt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full max-w-md",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: ()=>{
                                if (!files.main) {
                                    setErrors((prev)=>({
                                            ...prev,
                                            main: 'A Planilha Mãe é obrigatória'
                                        }));
                                    return;
                                }
                                if (!files.additional1) {
                                    setErrors((prev)=>({
                                            ...prev,
                                            additional1: 'A Planilha Avulsa 1 é obrigatória'
                                        }));
                                    return;
                                }
                                onMerge();
                            },
                            disabled: !canMerge || isMerging,
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-full gap-2 px-8 shadow-lg hover:shadow-xl transition-all duration-300', canMerge && !isMerging ? 'hover:scale-105' : ''),
                            "aria-busy": isMerging,
                            children: isMerging ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "w-5 h-5 animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                                        lineNumber: 411,
                                        columnNumber: 17
                                    }, this),
                                    "Processando..."
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$spreadsheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSpreadsheet$3e$__["FileSpreadsheet"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                                        lineNumber: 416,
                                        columnNumber: 17
                                    }, this),
                                    "Mesclar Planilhas"
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                            lineNumber: 390,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                        lineNumber: 389,
                        columnNumber: 9
                    }, this),
                    !canMerge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-center text-sm text-muted-foreground mt-2",
                        children: !files.main && !files.additional1 ? 'Faça upload da Planilha Mãe e da Planilha Avulsa 1 para continuar' : !files.main ? 'Faça upload da Planilha Mãe (obrigatória)' : 'Faça upload da Planilha Avulsa 1 (obrigatória)'
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                        lineNumber: 424,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
                lineNumber: 388,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx",
        lineNumber: 344,
        columnNumber: 5
    }, this);
}
_s1(UploadSectionComponent, "O3eIvoeuVnj/EXQmywllydw0b4M=");
_c1 = UploadSectionComponent;
const UploadSection = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(UploadSectionComponent);
_c2 = UploadSection;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "UploadCard");
__turbopack_context__.k.register(_c1, "UploadSectionComponent");
__turbopack_context__.k.register(_c2, "UploadSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/components/upload-section-improved.tsx [app-client] (ecmascript)"));
}),
"[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "X",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript)");
}),
"[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>TriangleAlert
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const TriangleAlert = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("TriangleAlert", [
    [
        "path",
        {
            d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
            key: "wmoenq"
        }
    ],
    [
        "path",
        {
            d: "M12 9v4",
            key: "juzpu7"
        }
    ],
    [
        "path",
        {
            d: "M12 17h.01",
            key: "p32p05"
        }
    ]
]);
;
 //# sourceMappingURL=triangle-alert.js.map
}),
"[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertTriangle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript)");
}),
"[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/@radix-ui/react-progress/node_modules/@radix-ui/react-context/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/create-context.tsx
__turbopack_context__.s([
    "createContext",
    ()=>createContext2,
    "createContextScope",
    ()=>createContextScope
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
function createContext2(rootComponentName, defaultContext) {
    const Context = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](defaultContext);
    Context.displayName = rootComponentName + "Context";
    const Provider = (props)=>{
        const { children, ...context } = props;
        const value = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
            "createContext2.Provider.useMemo[value]": ()=>context
        }["createContext2.Provider.useMemo[value]"], Object.values(context));
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(Context.Provider, {
            value,
            children
        });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName) {
        const context = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](Context);
        if (context) return context;
        if (defaultContext !== void 0) return defaultContext;
        throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [
        Provider,
        useContext2
    ];
}
function createContextScope(scopeName, createContextScopeDeps = []) {
    let defaultContexts = [];
    function createContext3(rootComponentName, defaultContext) {
        const BaseContext = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](defaultContext);
        BaseContext.displayName = rootComponentName + "Context";
        const index = defaultContexts.length;
        defaultContexts = [
            ...defaultContexts,
            defaultContext
        ];
        const Provider = (props)=>{
            const { scope, children, ...context } = props;
            const Context = scope?.[scopeName]?.[index] || BaseContext;
            const value = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
                "createContextScope.createContext3.Provider.useMemo[value]": ()=>context
            }["createContextScope.createContext3.Provider.useMemo[value]"], Object.values(context));
            return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(Context.Provider, {
                value,
                children
            });
        };
        Provider.displayName = rootComponentName + "Provider";
        function useContext2(consumerName, scope) {
            const Context = scope?.[scopeName]?.[index] || BaseContext;
            const context = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](Context);
            if (context) return context;
            if (defaultContext !== void 0) return defaultContext;
            throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
        }
        return [
            Provider,
            useContext2
        ];
    }
    const createScope = ()=>{
        const scopeContexts = defaultContexts.map((defaultContext)=>{
            return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](defaultContext);
        });
        return function useScope(scope) {
            const contexts = scope?.[scopeName] || scopeContexts;
            return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
                "createContextScope.createScope.useScope.useMemo": ()=>({
                        [`__scope${scopeName}`]: {
                            ...scope,
                            [scopeName]: contexts
                        }
                    })
            }["createContextScope.createScope.useScope.useMemo"], [
                scope,
                contexts
            ]);
        };
    };
    createScope.scopeName = scopeName;
    return [
        createContext3,
        composeContextScopes(createScope, ...createContextScopeDeps)
    ];
}
function composeContextScopes(...scopes) {
    const baseScope = scopes[0];
    if (scopes.length === 1) return baseScope;
    const createScope = ()=>{
        const scopeHooks = scopes.map((createScope2)=>({
                useScope: createScope2(),
                scopeName: createScope2.scopeName
            }));
        return function useComposedScopes(overrideScopes) {
            const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName })=>{
                const scopeProps = useScope(overrideScopes);
                const currentScope = scopeProps[`__scope${scopeName}`];
                return {
                    ...nextScopes2,
                    ...currentScope
                };
            }, {});
            return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
                "composeContextScopes.createScope.useComposedScopes.useMemo": ()=>({
                        [`__scope${baseScope.scopeName}`]: nextScopes
                    })
            }["composeContextScopes.createScope.useComposedScopes.useMemo"], [
                nextScopes
            ]);
        };
    };
    createScope.scopeName = baseScope.scopeName;
    return createScope;
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/@radix-ui/react-progress/node_modules/@radix-ui/react-primitive/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/primitive.tsx
__turbopack_context__.s([
    "Primitive",
    ()=>Primitive,
    "Root",
    ()=>Root,
    "dispatchDiscreteCustomEvent",
    ()=>dispatchDiscreteCustomEvent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
;
var NODES = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul"
];
var Primitive = NODES.reduce((primitive, node)=>{
    const Slot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSlot"])(`Primitive.${node}`);
    const Node = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"]((props, forwardedRef)=>{
        const { asChild, ...primitiveProps } = props;
        const Comp = asChild ? Slot : node;
        if (typeof window !== "undefined") {
            window[Symbol.for("radix-ui")] = true;
        }
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(Comp, {
            ...primitiveProps,
            ref: forwardedRef
        });
    });
    Node.displayName = `Primitive.${node}`;
    return {
        ...primitive,
        [node]: Node
    };
}, {});
function dispatchDiscreteCustomEvent(target, event) {
    if (target) __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flushSync"](()=>target.dispatchEvent(event));
}
var Root = Primitive;
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/@radix-ui/react-progress/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Indicator",
    ()=>Indicator,
    "Progress",
    ()=>Progress,
    "ProgressIndicator",
    ()=>ProgressIndicator,
    "Root",
    ()=>Root,
    "createProgressScope",
    ()=>createProgressScope
]);
// src/progress.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$progress$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$context$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/@radix-ui/react-progress/node_modules/@radix-ui/react-context/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$progress$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/@radix-ui/react-progress/node_modules/@radix-ui/react-primitive/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documentos/GitHub/SLA-VELOZZ/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
"use client";
;
;
;
;
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext, createProgressScope] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$progress$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$context$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContextScope"])(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"]((props, forwardedRef)=>{
    const { __scopeProgress, value: valueProp = null, max: maxProp, getValueLabel = defaultGetValueLabel, ...progressProps } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
        console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
        console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ProgressProvider, {
        scope: __scopeProgress,
        value,
        max,
        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$progress$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Primitive"].div, {
            "aria-valuemax": max,
            "aria-valuemin": 0,
            "aria-valuenow": isNumber(value) ? value : void 0,
            "aria-valuetext": valueLabel,
            role: "progressbar",
            "data-state": getProgressState(value, max),
            "data-value": value ?? void 0,
            "data-max": max,
            ...progressProps,
            ref: forwardedRef
        })
    });
});
Progress.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"]((props, forwardedRef)=>{
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documentos$2f$GitHub$2f$SLA$2d$VELOZZ$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$progress$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Primitive"].div, {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
    });
});
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
    return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
    return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
    return typeof value === "number";
}
function isValidMaxNumber(max) {
    return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
    return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
    return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
    return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress;
var Indicator = ProgressIndicator;
;
 //# sourceMappingURL=index.mjs.map
}),
]);

//# sourceMappingURL=OneDrive_Documentos_GitHub_SLA-VELOZZ_f8762d19._.js.map