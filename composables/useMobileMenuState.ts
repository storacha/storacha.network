/**
 * Manages the global state for the mobile menu's visibility.
 */
export const useMobileMenuState = () => useState<boolean>('mobileMenuActive', () => false)