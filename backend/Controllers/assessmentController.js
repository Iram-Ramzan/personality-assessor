const Assessment = require('../models/Assessment');

const TRAIT_LABELS = {
  O: 'Highly Open to Experience',
  C: 'Highly Conscientious',
  E: 'Highly Extraverted',
  A: 'Highly Agreeable',
  N: 'Emotionally Sensitive',
};

function buildCareerProfile(traits, facets = {}) {
  const entries = Object.entries(traits);
  const [primaryTrait, primaryScore] = entries.reduce(
    (best, current) => current[1] > best[1] ? current : best,
    entries[0]
  );

  return {
    personalityLabel: TRAIT_LABELS[primaryTrait],
    primaryTrait,
    primaryScore,
    topFacetCodes: [],
    careerSuggestions: []
  };
}

const saveAssessment = async (req, res) => {
  try {
    const { traits, facets, answers } = req.body;

    if (!traits) {
      return res.status(400).json({ message: 'Traits required' });
    }

    const required = ['O','C','E','A','N'];
    const valid = required.every(t => typeof traits[t] === 'number');

    if (!valid) {
      return res.status(400).json({ message: 'All traits must be numeric' });
    }

    const profile = buildCareerProfile(traits, facets || {});

    const assessment = new Assessment({
      userId: req.user.id,
      traits,
      facets: facets || {},
      answers,
      personalityLabel: profile.personalityLabel,
      primaryTrait: profile.primaryTrait,
      primaryScore: profile.primaryScore,
      topFacetCodes: profile.topFacetCodes,
      careerSuggestions: profile.careerSuggestions
    });

    await assessment.save();

    res.status(201).json({
      success: true,
      message: 'Assessment saved',
      assessment
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { saveAssessment };
