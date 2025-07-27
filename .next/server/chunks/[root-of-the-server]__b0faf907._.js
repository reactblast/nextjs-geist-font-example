module.exports = {

"[project]/.next-internal/server/app/api/bin/bulk/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/app/api/bin/bulk/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
// Reuse the same logic from single lookup
async function lookupSingleBin(bin) {
    try {
        // Validate BIN
        if (!/^\d{6,8}$/.test(bin)) {
            return {
                bin,
                error: "Invalid BIN format"
            };
        }
        const response = await fetch(`https://lookup.binlist.net/${bin}`, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'CyberBIN/1.0'
            }
        });
        if (!response.ok) {
            if (response.status === 404) {
                return {
                    bin,
                    error: "BIN not found"
                };
            }
            throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        // Calculate fraud risk
        const fraudRiskScore = calculateFraudRisk(bin, data.country?.name, data.bank?.name);
        const secureSupport = checkSecureSupport(bin, data.scheme);
        return {
            bin,
            issuingBank: data.bank?.name || "Unknown",
            cardType: data.type ? data.type.charAt(0).toUpperCase() + data.type.slice(1) : "Unknown",
            country: data.country?.name || "Unknown",
            countryCode: data.country?.alpha2 || "XX",
            cardBrand: data.scheme ? data.scheme.toUpperCase() : "Unknown",
            currency: data.country?.currency || "Unknown",
            fraudRiskScore,
            riskLevel: fraudRiskScore >= 70 ? "HIGH" : fraudRiskScore >= 40 ? "MEDIUM" : "LOW",
            secureSupport,
            prepaid: data.prepaid || false,
            status: "success"
        };
    } catch (error) {
        console.error(`Error looking up BIN ${bin}:`, error);
        return {
            bin,
            error: error.message.includes("fetch") ? "Network error" : "Lookup failed",
            status: "error"
        };
    }
}
function calculateFraudRisk(bin, country, bank) {
    let riskScore = 0;
    const firstDigit = parseInt(bin[0]);
    const secondDigit = parseInt(bin[1]);
    // BIN pattern analysis
    if (firstDigit === 4 && secondDigit >= 0 && secondDigit <= 2) riskScore += 20;
    if (firstDigit === 5 && secondDigit >= 5) riskScore += 15;
    if (firstDigit === 3) riskScore += 25;
    // Country risk assessment
    const highRiskCountries = [
        'Unknown',
        'Russia',
        'China',
        'Nigeria',
        'Iran'
    ];
    if (country && highRiskCountries.includes(country)) riskScore += 30;
    // Bank verification
    if (bank === 'Unknown' || !bank) riskScore += 20;
    // Add controlled randomness
    riskScore += Math.floor(Math.random() * 15);
    return Math.min(riskScore, 100);
}
function checkSecureSupport(bin, scheme) {
    const firstDigit = parseInt(bin[0]);
    if (scheme === 'visa' && firstDigit === 4) {
        return bin.length >= 16 ? '3D Secure Supported' : '2D Secure Only';
    }
    if (scheme === 'mastercard' && firstDigit === 5) {
        return '3D Secure Supported';
    }
    if (scheme === 'amex' && firstDigit === 3) {
        return '2D Secure Only';
    }
    return bin.length >= 16 ? '3D Secure Supported' : 'Not Supported';
}
async function POST(request) {
    try {
        const body = await request.json();
        let bins = [];
        // Handle different input formats
        if (body.bins && Array.isArray(body.bins)) {
            bins = body.bins;
        } else if (body.binText && typeof body.binText === 'string') {
            // Parse text input (newline or comma separated)
            bins = body.binText.split(/[\n,\r\n]+/).map((bin)=>bin.trim()).filter((bin)=>bin.length > 0);
        } else {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid request format. Provide 'bins' array or 'binText' string."
            }, {
                status: 400
            });
        }
        // Validate input
        if (bins.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "No valid BINs provided"
            }, {
                status: 400
            });
        }
        if (bins.length > 100) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Maximum 100 BINs allowed per request"
            }, {
                status: 400
            });
        }
        // Remove duplicates
        const uniqueBins = [
            ...new Set(bins)
        ];
        console.log(`[BULK LOOKUP] Processing ${uniqueBins.length} BINs - ${new Date().toISOString()}`);
        // Process BINs concurrently with controlled concurrency
        const batchSize = 10; // Process 10 at a time to avoid rate limiting
        const results = [];
        for(let i = 0; i < uniqueBins.length; i += batchSize){
            const batch = uniqueBins.slice(i, i + batchSize);
            const batchPromises = batch.map((bin)=>lookupSingleBin(bin));
            const batchResults = await Promise.all(batchPromises);
            results.push(...batchResults);
            // Small delay between batches to be respectful to the API
            if (i + batchSize < uniqueBins.length) {
                await new Promise((resolve)=>setTimeout(resolve, 100));
            }
        }
        // Generate statistics
        const stats = generateBulkStats(results);
        // Log completion
        console.log(`[BULK LOOKUP] Completed ${results.length} lookups - Success: ${stats.successCount}, Errors: ${stats.errorCount}`);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            results,
            statistics: stats,
            timestamp: new Date().toISOString(),
            totalProcessed: results.length
        });
    } catch (error) {
        console.error("Bulk lookup error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to process bulk lookup request"
        }, {
            status: 500
        });
    }
}
function generateBulkStats(results) {
    const successResults = results.filter((r)=>r.status === 'success');
    const errorResults = results.filter((r)=>r.status === 'error');
    // Country distribution
    const countryStats = {};
    const cardTypeStats = {};
    const riskStats = {
        HIGH: 0,
        MEDIUM: 0,
        LOW: 0
    };
    const brandStats = {};
    successResults.forEach((result)=>{
        // Country stats
        const country = result.country || 'Unknown';
        countryStats[country] = (countryStats[country] || 0) + 1;
        // Card type stats
        const cardType = result.cardType || 'Unknown';
        cardTypeStats[cardType] = (cardTypeStats[cardType] || 0) + 1;
        // Risk level stats
        if (result.riskLevel) {
            riskStats[result.riskLevel]++;
        }
        // Brand stats
        const brand = result.cardBrand || 'Unknown';
        brandStats[brand] = (brandStats[brand] || 0) + 1;
    });
    // Calculate average fraud risk
    const avgFraudRisk = successResults.length > 0 ? successResults.reduce((sum, r)=>sum + (r.fraudRiskScore || 0), 0) / successResults.length : 0;
    return {
        successCount: successResults.length,
        errorCount: errorResults.length,
        totalCount: results.length,
        averageFraudRisk: Math.round(avgFraudRisk * 100) / 100,
        countryDistribution: Object.entries(countryStats).sort(([, a], [, b])=>b - a).slice(0, 10),
        cardTypeDistribution: cardTypeStats,
        riskDistribution: riskStats,
        brandDistribution: brandStats,
        secureSupport: {
            supported3D: successResults.filter((r)=>r.secureSupport?.includes('3D')).length,
            supported2D: successResults.filter((r)=>r.secureSupport?.includes('2D')).length,
            notSupported: successResults.filter((r)=>r.secureSupport?.includes('Not')).length
        }
    };
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__b0faf907._.js.map