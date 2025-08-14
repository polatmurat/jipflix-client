import jwtDecode from 'jwt-decode';

/**
 * JWT token'dan kullanıcı bilgilerini çıkaran utility fonksiyonları
 */

/**
 * Token'dan user ID'sini alır
 * @param {string} token - JWT token
 * @returns {number|null} User ID
 */
export const getUserId = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.uid || null;
  } catch {
    return null;
  }
};

/**
 * Token'dan username'i alır
 * @param {string} token - JWT token
 * @returns {string|null} Username
 */
export const getUsername = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.username || null;
  } catch {
    return null;
  }
};

/**
 * Token'dan display name'i alır (UI'da gösterilecek isim)
 * @param {string} token - JWT token
 * @returns {string|null} Display name
 */
export const getDisplayName = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.name || decoded.username || null;
  } catch {
    return null;
  }
};

/**
 * Token'dan email'i alır
 * @param {string} token - JWT token
 * @returns {string|null} Email
 */
export const getEmail = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.email || null;
  } catch {
    return null;
  }
};

/**
 * Token'dan role'leri alır
 * @param {string} token - JWT token
 * @returns {string[]} Roles array
 */
export const getRoles = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.roles || [];
  } catch {
    return [];
  }
};

/**
 * Kullanıcının admin olup olmadığını kontrol eder
 * @param {string} token - JWT token
 * @returns {boolean} Admin ise true
 */
export const isAdmin = (token) => {
  const roles = getRoles(token);
  return Array.isArray(roles) && roles.includes('ROLE_ADMIN');
};

/**
 * Redux store'dan user bilgilerini alır
 * @param {Object} user - Redux'dan gelen decoded user object
 * @returns {Object} User info object
 */
export const getUserInfo = (user) => {
  if (!user) return null;
  
  return {
    id: user.uid,
    username: user.username,
    displayName: user.name || user.username,
    email: user.email,
    roles: user.roles || [],
    isAdmin: Array.isArray(user.roles) && user.roles.includes('ROLE_ADMIN')
  };
};

