export const permissions = {
  Administrator: {
    canView: true,
    canCreate: true,
    canEdit: true,
    canDelete: true,
  },

  Editor: {
    canView: true,
    canCreate: false,
    canEdit: true,
    canDelete: false,
  },

  Viewer: {
    canView: true,
    canCreate: false,
    canEdit: false,
    canDelete: false,
  },
};

export function getPermissions(role) {
  return (
    permissions[role] || {
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    }
  );
}