export class TextCleaner {
    preProcessText(text) {
        return text
            .split('\n')
            .filter(line => {
                const trimmed = line.trim().toLowerCase();
                return !(
                    trimmed === 'hashtag' ||
                    trimmed.startsWith('#') ||
                    trimmed.match(/^hashtag\s*#/i) ||
                    trimmed.match(/^#\w+$/i)
                );
            })
            .join('\n')
            .replace(/hashtag\s*#\w+/gi, '')
            .replace(/\bhashtag\b/gi, '')
            .replace(/#\w+/g, '')
            .replace(/\n{3,}/g, '\n\n')
            .replace(/\s{2,}/g, ' ');
    }

    instantClean(text) {
        return text
            .split('\n')
            .map(line => {
                return line
                    .replace(/hashtag\s*#\w+/gi, '')
                    .replace(/\bhashtag\b/gi, '')
                    .replace(/#\w+/g, '')
                    .replace(/[🔥⭐✨💯🚀🙌👏💪🎯⚡🌟💎🏆🎉]{3,}/g, '🔥')
                    .replace(/\b(AMAZING|INCREDIBLE|GAME-CHANGER|THRILLED|EXCITED|DELIGHTED)\b/gi,
                        match => match.toLowerCase().replace(/^./, c => c.toUpperCase()))
                    .replace(/!{3,}/g, '!')
                    .replace(/\.{4,}/g, '...')
                    .replace(/\s+/g, ' ')
                    .trim();
            })
            .filter(line => line.length > 0)
            .join('\n');
    }

    quickClean(text) {
        return text
            .replace(/[🔥⭐✨💯🚀🙌👏💪🎯⚡🌟💎🏆🎉]{3,}/g, '🔥')
            .replace(/\b(AMAZING|INCREDIBLE|GAME-CHANGER|THRILLED|EXCITED|DELIGHTED)\b/gi, match =>
                match.toLowerCase().replace(/^./, c => c.toUpperCase()))
            .replace(/!{3,}/g, '!')
            .replace(/\.{4,}/g, '...')
            .replace(/#\w+\s*/g, '')
            .trim();
    }
}