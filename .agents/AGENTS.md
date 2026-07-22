# Workspace Customization Rules (.agents/AGENTS.md)

> Данный файл содержит проектные правила для ИИ-агентов рабочей области VibeCode Bitrix.

Подробный регламент архитектуры, авторизации, деплоя и оптимизации VibeCode находится в файле [AGENTS.md](file:///Users/asmadey/AntiGravity/VibeCode%20Bitrix/AGENTS.md).

## Краткая сводка основных правил:
1. **Язык общения и рассуждений**: Русский язык (Русский язык).
2. **Обработка Placements**: Разделять `CRM_COMPANY_DETAIL_TAB` и `LEFT_MENU` в `src/http.ts`.
3. **Vibe Handler URL**: Для регистрации placement всегда задавать handler `https://vibecode.bitrix24.tech/v1/bitrix-handler`.
4. **Vibe Batch API**: Группировать первичные и вторичные запросы к CRM сущностям через Batch API.
5. **Session Cookies**: Подписанная HttpOnly Cookie с `SameSite=None; Secure` для поддержки авторизции внутри iframe.
