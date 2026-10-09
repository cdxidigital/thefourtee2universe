import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";

const APP_NAME = "fourtee2 — A Brand Universe";

function shareHost() {
  const raw = String(
    import.meta.env.VITE_PUBLIC_HOSTNAME ||
      (typeof process !== "undefined" ? process.env?.VITE_PUBLIC_HOSTNAME : "") ||
      (typeof window !== "undefined" ? window.location.host : "") ||
      "",
  )
    .trim()
    .toLowerCase()
    .replace(/:\d+$/, "");
  if (!raw || !/^[a-z0-9.-]+$/.test(raw) || !raw.includes(".")) return "";
  if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(raw)) return "";
  if (raw === "vercel.app" || raw.endsWith(".vercel.app") || raw === "vercel.com" || raw.endsWith(".vercel.com")) return "";
  return raw;
}

export const Route = createRootRoute({
  head: () => {
    const host = shareHost();
    const xBanner = host ? `https://${host}/x-banner.jpg` : "";
    return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "description", content: "fourtee2 — a brand universe for travel, music and you." },
      { name: "theme-color", content: "#030405" },
      ...(xBanner ? [{ property: "x:game:image", content: xBanner }] : []),
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Manrope:wght@400;500;600&family=Righteous&family=Varela+Round&display=swap",
      },
    ],
    };
  },
  component: () => (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
