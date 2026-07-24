# KI-Video-Studio

Eine Webseite, auf der Besucher per Text-Prompt ein KI-Video (Google Veo 3.1
Fast) erstellen lassen können. Bezahlung per Stripe, einmalig pro Video.

## Wie die Seite funktioniert

1. Besucher schreibt einen Prompt und klickt "Video erstellen"
2. Stripe-Checkout öffnet sich (im Testmodus: keine echte Zahlung)
3. Nach erfolgreicher "Zahlung" ruft Stripe unseren Webhook auf
4. Der Webhook startet die Videoerstellung bei Google Veo
5. Die Erfolgsseite fragt alle paar Sekunden nach, ob das Video fertig ist,
   und zeigt es dann an

## Bekannte Einschränkungen (okay für den Test, wichtig vor Live-Betrieb)

- Der Job-Speicher (`lib/store.ts`) ist ein einfacher Arbeitsspeicher-Store,
  keine echte Datenbank. Für den echten Betrieb später durch z.B. Vercel KV
  oder eine Postgres-Datenbank ersetzen.
- Die Video-Generierung läuft im Hintergrund nach der Webhook-Antwort weiter
  — auf Vercel kann das je nach Plan/Timeout-Limits abgeschnitten werden,
  wenn Veo länger als erwartet braucht. Für den Test reicht es meist.
- Modellname/Endpunkt für Veo (`lib/veo.ts`) basiert auf der aktuellen
  Preview-Doku von Google — vor dem Live-Gang bitte gegen
  https://ai.google.dev/gemini-api/docs/video prüfen, falls sich der
  Modellname geändert hat.
