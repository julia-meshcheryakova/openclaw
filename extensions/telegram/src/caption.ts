export const TELEGRAM_MAX_CAPTION_LENGTH = 1024;

/**
 * Split text for Telegram captions. If the text exceeds 1024 chars,
 * try to split at the last sentence boundary (`.`, `!`, `?`) that fits
 * within the limit. The first part becomes the caption; the remainder
 * becomes a follow-up text message.
 *
 * If no sentence boundary exists within the limit, the entire text is
 * moved to followUpText (media sent without caption, text sent separately).
 */
export function splitTelegramCaption(text?: string): {
  caption?: string;
  followUpText?: string;
} {
  const trimmed = text?.trim() ?? "";
  if (!trimmed) {
    return { caption: undefined, followUpText: undefined };
  }
  if (trimmed.length <= TELEGRAM_MAX_CAPTION_LENGTH) {
    return { caption: trimmed, followUpText: undefined };
  }

  // Find the last sentence-ending punctuation within the limit.
  const searchRegion = trimmed.slice(0, TELEGRAM_MAX_CAPTION_LENGTH);
  const lastSentenceEnd = Math.max(
    searchRegion.lastIndexOf(". "),
    searchRegion.lastIndexOf("! "),
    searchRegion.lastIndexOf("? "),
    // Handle punctuation at the very end of the search region
    searchRegion.endsWith(".") ? searchRegion.length - 1 : -1,
    searchRegion.endsWith("!") ? searchRegion.length - 1 : -1,
    searchRegion.endsWith("?") ? searchRegion.length - 1 : -1,
  );

  if (lastSentenceEnd > 0) {
    const caption = trimmed.slice(0, lastSentenceEnd + 1).trimEnd();
    const followUpText = trimmed.slice(lastSentenceEnd + 1).trim();
    return {
      caption: caption || undefined,
      followUpText: followUpText || undefined,
    };
  }

  // No sentence boundary found; move everything to follow-up text.
  return { caption: undefined, followUpText: trimmed };
}
