export var listaModulos = [
  {
    name : "Administración",
    accesos: [
      {
        funcionalidad: "Administración de Usuarios",
        routerLink: "admin_users",
        icon: "manage_accounts",
        regularAccess: "account.role === Role.SAdmin || account.role === Role.AdminEquivalencia",
      },
      {
        funcionalidad: "Editar Conexiones, Formatos y Catálogos",
        routerLink: "/campaign/catalogo",
        icon: "list_alt",
        regularAccess: "account.role === Role.SAdmin || account.role === Role.AdminEquivalencia",
      },
      {
        funcionalidad: "Editar Proveedores",
        routerLink: "campaign/proveedores",
        icon: "corporate_fare",
        regularAccess: "account.role === Role.SAdmin || account.role === Role.AdminEquivalencia",
      }
    ]
  }
];
