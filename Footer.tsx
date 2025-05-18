import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-secondary py-6 px-4">
      <div className="container mx-auto text-center text-textSecondary text-sm">
        <p>
          {t("footerText")}
        </p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="#" className="text-textSecondary hover:text-accent transition">
            {t("footer.about")}
          </a>
          <a href="#" className="text-textSecondary hover:text-accent transition">
            {t("footer.terms")}
          </a>
          <a href="#" className="text-textSecondary hover:text-accent transition">
            {t("footer.privacy")}
          </a>
        </div>
        <p className="mt-4">
          {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
}
