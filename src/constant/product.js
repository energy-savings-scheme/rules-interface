export const AC_DUCTED_SINGLE_SPLIT_SYSTEM = 'ducted_single_split_system';
export const AC_DUCTED_MULTI_SPLIT_SYSTEM = 'ducted_multi_split_system';
export const AC_DUCTED_UNITARY_SYSTEM = 'ducted_unitary_system';
export const AC_NON_DUCTED_SINGLE_SPLIT_SYSTEM = 'non_ducted_single_split_system';
export const AC_NON_DUCTED_MULTI_SPLIT_SYSTEM = 'non_ducted_multi_split_system';
export const AC_NON_DUCTED_UNITARY_SYSTEM = 'non_ducted_unitary_system';

export const MAP_AIR_CONDITIONER_TYPES = {
  'ducted': {
    'portable': AC_DUCTED_UNITARY_SYSTEM,
    'unitary double duct wall mounted': AC_DUCTED_UNITARY_SYSTEM,
    'window wall': AC_DUCTED_UNITARY_SYSTEM,
    'single split system': AC_DUCTED_SINGLE_SPLIT_SYSTEM,
    'fixed': AC_DUCTED_MULTI_SPLIT_SYSTEM,
    'vrf': AC_DUCTED_MULTI_SPLIT_SYSTEM,
  },
  'non ducted': {
    'portable': AC_NON_DUCTED_UNITARY_SYSTEM,
    'unitary double duct wall mounted': AC_NON_DUCTED_UNITARY_SYSTEM,
    'window wall': AC_NON_DUCTED_UNITARY_SYSTEM,
    'single split system': AC_NON_DUCTED_SINGLE_SPLIT_SYSTEM,
    'fixed': AC_NON_DUCTED_MULTI_SPLIT_SYSTEM,
    'vrf': AC_NON_DUCTED_MULTI_SPLIT_SYSTEM,
  }
}
