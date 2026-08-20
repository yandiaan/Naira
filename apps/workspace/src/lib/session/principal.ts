export type PlatformRole = 'user' | 'admin' | 'operator';

export type Principal = {
  subject: string;
  roles: readonly PlatformRole[];
  displayName: string | null;
};

export const anonymousPrincipal: Principal = {
  subject: '',
  roles: [],
  displayName: null,
};
