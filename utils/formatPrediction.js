

function getMedicationNeed(overallStress) {
  if (overallStress >= 70) return "HIGH";
  if (overallStress >= 40) return "MEDIUM";
  return "LOW";
}

function formatPrediction(aiResponse) {
  return {
    traumaStress: aiResponse.external_domains.Trauma,
    relationshipStress: aiResponse.external_domains.Relationship,
    financialStress: aiResponse.external_domains.Financial,
    topIndicators: aiResponse.top_indicators,
    medicationNeed: getMedicationNeed(aiResponse.overall_stress),
  };
}

module.exports = { formatPrediction };