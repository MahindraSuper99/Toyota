export const TOTAL_STEPS_WITH_DISSATISFACTION = 5;
export const TOTAL_STEPS_WITHOUT_DISSATISFACTION = 4;

export const VEHICLE_SATISFACTION_OPTIONS = [
  'Very Satisfied',
  'Satisfied',
  'Neutral',
  'Dissatisfied',
  'Very Dissatisfied',
];

export const OSAT_OPTIONS = ['Excellent', 'Good', 'Fair', 'Poor', 'Unacceptable'];

export const OSAT_TRIGGERS_DISSATISFACTION = ['Poor', 'Unacceptable'];

export const FACILITIES_OPTION_KEY = 'facilities';

export const DISSATISFACTION_REASONS = [
  { key: 'no_feature_explanation', label: 'Sales Consultant did not explain vehicle features' },
  { key: 'no_status_updates', label: 'No Updates given on Vehicle delivery status' },
  { key: 'poor_condition_cleanliness', label: 'Poor vehicle condition and cleanliness' },
  { key: 'misinformation_delivery', label: 'Misinformation about delivery status' },
  { key: 'documentation_issues', label: 'Issues with Documentation / Paperwork' },
  {
    key: FACILITIES_OPTION_KEY,
    label: 'Dealership Facilities not satisfactory',
    hasSubOptions: true,
  },
  { key: 'other', label: 'Other', requiresText: true },
];

export const FACILITIES_SUB_OPTIONS = [
  'Parking',
  'Waiting area',
  'Restrooms',
  'Directional Signage',
  'Cleanliness',
];
