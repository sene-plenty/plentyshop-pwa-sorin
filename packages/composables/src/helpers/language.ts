import { useRouter } from '@nuxtjs/composition-api';

export class languageHelper {
  public static defaultLang = 'en';

  public static get lang(): string {
    const router: any = useRouter();
    const { locale } = router.app.$i18n;
    return locale;
  }

  public static get languages(): string [] {
    const router: any = useRouter();
    const { locales } = router.app.$i18n;
    return locales;
  }

  public static get langPrefix(): string {
    return this.defaultLang !== this.lang ? this.lang : '';
  }
}
