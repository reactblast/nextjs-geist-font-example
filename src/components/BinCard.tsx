import { useState } from "react";

interface BinData {
  bin: string;
  issuingBank: string;
  cardType: string;
  country: string;
  countryCode?: string;
  cardBrand: string;
  cardLevel?: string;
  currency: string;
  fraudRiskScore: number;
  riskLevel: string;
  secureSupport: string;
  timestamp?: string;
  bankUrl?: string;
  bankPhone?: string;
  prepaid?: boolean;
}

interface BinCardProps {
  data: BinData;
  showDetails?: boolean;
}

export default function BinCard({ data, showDetails = true }: BinCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "HIGH": return "text-red-400 border-red-400/50 bg-red-900/10";
      case "MEDIUM": return "text-yellow-400 border-yellow-400/50 bg-yellow-900/10";
      case "LOW": return "text-green-400 border-green-400/50 bg-green-900/10";
      default: return "text-gray-400 border-gray-400/50 bg-gray-900/10";
    }
  };

  const getSecureColor = (secure: string) => {
    if (secure.includes("3D")) return "text-green-400";
    if (secure.includes("2D")) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="bg-black/50 border border-green-400/30 rounded-lg p-6 font-mono transition-all duration-300 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-400/10">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-green-400 mb-1">
            BIN: {data.bin}
          </h3>
          <div className="text-sm text-gray-400">
            {data.timestamp && new Date(data.timestamp).toLocaleString()}
          </div>
        </div>
        
        {/* Risk indicator */}
        <div className={`px-3 py-1 rounded-full border text-xs font-bold ${getRiskColor(data.riskLevel)}`}>
          {data.riskLevel} RISK ({data.fraudRiskScore}%)
        </div>
      </div>

      {/* Main info grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Bank info */}
        <div className="space-y-2">
          <div className="border-l-2 border-cyan-400 pl-3">
            <div className="text-xs text-gray-400 uppercase">Issuing Bank</div>
            <div className="text-cyan-400 font-semibold">{data.issuingBank}</div>
          </div>
          
          <div className="border-l-2 border-blue-400 pl-3">
            <div className="text-xs text-gray-400 uppercase">Card Brand</div>
            <div className="text-blue-400 font-semibold">{data.cardBrand}</div>
          </div>
        </div>

        {/* Location info */}
        <div className="space-y-2">
          <div className="border-l-2 border-purple-400 pl-3">
            <div className="text-xs text-gray-400 uppercase">Country</div>
            <div className="text-purple-400 font-semibold">
              {data.country} {data.countryCode && `(${data.countryCode})`}
            </div>
          </div>
          
          <div className="border-l-2 border-pink-400 pl-3">
            <div className="text-xs text-gray-400 uppercase">Currency</div>
            <div className="text-pink-400 font-semibold">{data.currency}</div>
          </div>
        </div>
      </div>

      {/* Card details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-center p-2 bg-gray-900/50 rounded border border-gray-700">
          <div className="text-xs text-gray-400">TYPE</div>
          <div className="text-green-400 font-semibold">{data.cardType}</div>
        </div>
        
        {data.cardLevel && (
          <div className="text-center p-2 bg-gray-900/50 rounded border border-gray-700">
            <div className="text-xs text-gray-400">LEVEL</div>
            <div className="text-green-400 font-semibold">{data.cardLevel}</div>
          </div>
        )}
        
        <div className="text-center p-2 bg-gray-900/50 rounded border border-gray-700">
          <div className="text-xs text-gray-400">PREPAID</div>
          <div className={`font-semibold ${data.prepaid ? 'text-yellow-400' : 'text-green-400'}`}>
            {data.prepaid ? 'YES' : 'NO'}
          </div>
        </div>
        
        <div className="text-center p-2 bg-gray-900/50 rounded border border-gray-700">
          <div className="text-xs text-gray-400">SECURE</div>
          <div className={`font-semibold text-xs ${getSecureColor(data.secureSupport)}`}>
            {data.secureSupport.replace(' Supported', '').replace(' Only', '')}
          </div>
        </div>
      </div>

      {/* Security analysis */}
      <div className="border-t border-gray-700 pt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">SECURITY ANALYSIS</span>
          {showDetails && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {isExpanded ? 'HIDE DETAILS' : 'SHOW DETAILS'}
            </button>
          )}
        </div>
        
        {/* Risk bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Fraud Risk Score</span>
            <span className={getRiskColor(data.riskLevel).split(' ')[0]}>
              {data.fraudRiskScore}%
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${
                data.riskLevel === 'HIGH' ? 'bg-red-400' :
                data.riskLevel === 'MEDIUM' ? 'bg-yellow-400' : 'bg-green-400'
              }`}
              style={{ width: `${data.fraudRiskScore}%` }}
            />
          </div>
        </div>

        {/* Expanded details */}
        {isExpanded && showDetails && (
          <div className="space-y-2 text-xs animate-fadeIn">
            {data.bankUrl && (
              <div className="flex justify-between">
                <span className="text-gray-400">Bank Website:</span>
                <a href={data.bankUrl} target="_blank" rel="noopener noreferrer" 
                   className="text-cyan-400 hover:text-cyan-300 underline">
                  {data.bankUrl}
                </a>
              </div>
            )}
            {data.bankPhone && (
              <div className="flex justify-between">
                <span className="text-gray-400">Bank Phone:</span>
                <span className="text-green-400">{data.bankPhone}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-400">Security Support:</span>
              <span className={getSecureColor(data.secureSupport)}>
                {data.secureSupport}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Glitch effect overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse" />
      </div>
    </div>
  );
}
