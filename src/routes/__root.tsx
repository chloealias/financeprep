import {
  Outlet,
  Link,
  createRootRoute,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { defaultHomeSearch } from "@/lib/route-search";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { documentLocale, documentTranslator } from "@/lib/i18n/route-head";
import { useT } from "@/hooks/useT";

function NotFoundComponent() {
  const { t } = useT();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          {t("routes.root.notFound.title")}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("routes.root.notFound.body")}</p>
        <div className="mt-6">
          <Link
            to="/"
            search={defaultHomeSearch()}
            className="touch-target-bar justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("routes.root.notFound.cta")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const { t } = useT();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {t("routes.root.error.title")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("routes.root.error.body")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="touch-target-bar justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("routes.root.error.retry")}
          </button>
          <Link
            to="/"
            search={defaultHomeSearch()}
            className="touch-target-bar justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {t("routes.root.error.home")}
          </Link>
        </div>
      </div>
    </div>
  );
}

const SHARE_IMAGE_URL =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ff221957-ef99-400d-8632-c3cab079622b/id-preview-2f9b0169--0e6fe215-6b60-453a-8dd2-46037b9e114c.lovable.app-1778586796895.png";

export const Route = createRootRoute({
  head: () => {
    const translate = documentTranslator();
    const title = translate("routes.root.title");
    const description = translate("routes.root.description");

    return {
      meta: [
        { charSet: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, viewport-fit=cover",
        },
        { name: "theme-color", content: "#1e3a8a" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
        { name: "mobile-web-app-capable", content: "yes" },
        { title },
        { name: "description", content: description },
        { name: "author", content: "FinancePrep" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { property: "og:image", content: SHARE_IMAGE_URL },
        { name: "twitter:image", content: SHARE_IMAGE_URL },
      ],
      links: [
        {
          rel: "stylesheet",
          href: appCss,
        },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang={documentLocale()}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Toaster position="top-center" richColors closeButton />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <LocaleProvider>
      <Outlet />
    </LocaleProvider>
  );
}
