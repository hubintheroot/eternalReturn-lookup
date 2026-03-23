import { useTranslation } from 'react-i18next';
import * as Styled from './LanguageSwitcher.styled';

const LANGUAGES = [
  { code: 'ko', label: 'Ko' },
  { code: 'en', label: 'En' },
  { code: 'ja', label: 'Ja' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation('coupon');
  const currentLang = i18n.language;

  return (
    <Styled.Container>
      {LANGUAGES.map(({ code, label }) => (
        <Styled.LangButton
          key={code}
          $active={currentLang === code}
          onClick={() => i18n.changeLanguage(code)}
        >
          {label}
        </Styled.LangButton>
      ))}
    </Styled.Container>
  );
}
