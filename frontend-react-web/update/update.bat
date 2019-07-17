@echo off

xcopy .\src ..\src /E /H /Y /EXCLUDE:"about.page.component.tsx" "home.page.component.tsx" "loading.gif" "logo_small.png" "router.place.holder.tsx" "cookie.helper.tsx" "glyph.register.tsx" "localization.config.tsx" "links.config.tsx"