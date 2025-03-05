import main from "../i18n/locales/en-US/main.json";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      translation: typeof main;
    };
  }
}
