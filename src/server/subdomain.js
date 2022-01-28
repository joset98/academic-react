const defaults = {
  colors: {
    black: "#333333",
    danger: "#ed1623",
    red: "#ed1623",
    bodyBg: "#f5f5f8",
    sideBar: "#1a202e",
    sideBarActive: "#141924",
    sideBarActiveColor: "#fff",
    gray: "#505d69",
    gray100: "#f8f9fa",
    gray200: "#eff2f7",
    gray300: "#f1f5f7",
    gray400: "#ced4da",
    gray500: "#adb5bd",
    gray600: "#74788d",
    gray700: "#505d69",
    gray800: "#343a40",
    gray900: "#212529",
    tableSelectHover: "#f1f5f7",
    tableSelectActive: "#f1f5f7",
    tableSelectColor: "#505d69",
  },
  fonts: {
    primary: "Nunito, sans-serif",
    secondary: "Inter, sans-serif",
  }
}

const subdomain = {
  "localhost:3000": {
    'X-tenant': 'ebe',
    theme: {
      colors: {
        ...defaults.colors,
        primary: "#1d2e7f",
        secondary: "#fad403",
        sideBar: "#505e7f",
        sideBarActive: "#212952",
      },
      fonts: defaults.fonts,
      config: {
        name: "Colegio de prueba",
        nameSidebar: "JBP",
        images: "/images/cp/",
        wsidebar: "280px",
      }
    }
  },
  "plev-front.rdg.pe": {
    'X-tenant': 'ebe',
    theme: {
      colors: {
        ...defaults.colors,
        primary: "#1d2e7f",
        secondary: "#fad403",
      },
      fonts: defaults.fonts,
      config: {
        name: "Colegio de prueba",
        nameSidebar: "Colegio Prueba",
        images: "/images/cp/",
        wsidebar: "280px",
      }
    }
  },
  "intranet.iepjesuselbuenpastor.edu.pe": {
    'X-tenant': 'jbp',
    theme: {
      colors: {
        ...defaults.colors,
        primary: "#ffc107",
        secondary: "#ed1623",
        sideBarActiveColor: "#ffc107",
      },
      fonts: defaults.fonts,
      config: {
        name: "I.E.P. Jesús El Buen Pastor",
        nameSidebar: "JBP",
        images: "/images/jbp/",
        wsidebar: "280px",
      }
    }
  }
};

export default subdomain;