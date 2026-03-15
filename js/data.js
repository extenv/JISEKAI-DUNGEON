/**
 * Jisekai Dungeon - Character Data
 * Contains all Hiragana, Katakana, Kanji, and Daily Phrases data
 */

const HIRAGANA = [
    { japanese: 'あ', romaji: 'a' }, { japanese: 'い', romaji: 'i' }, { japanese: 'う', romaji: 'u' },
    { japanese: 'え', romaji: 'e' }, { japanese: 'お', romaji: 'o' }, { japanese: 'か', romaji: 'ka' },
    { japanese: 'き', romaji: 'ki' }, { japanese: 'く', romaji: 'ku' }, { japanese: 'け', romaji: 'ke' },
    { japanese: 'こ', romaji: 'ko' }, { japanese: 'さ', romaji: 'sa' }, { japanese: 'し', romaji: 'shi' },
    { japanese: 'す', romaji: 'su' }, { japanese: 'せ', romaji: 'se' }, { japanese: 'そ', romaji: 'so' },
    { japanese: 'た', romaji: 'ta' }, { japanese: 'ち', romaji: 'chi' }, { japanese: 'つ', romaji: 'tsu' },
    { japanese: 'て', romaji: 'te' }, { japanese: 'と', romaji: 'to' }, { japanese: 'な', romaji: 'na' },
    { japanese: 'に', romaji: 'ni' }, { japanese: 'ぬ', romaji: 'nu' }, { japanese: 'ね', romaji: 'ne' },
    { japanese: 'の', romaji: 'no' }, { japanese: 'は', romaji: 'ha' }, { japanese: 'ひ', romaji: 'hi' },
    { japanese: 'ふ', romaji: 'fu' }, { japanese: 'へ', romaji: 'he' }, { japanese: 'ほ', romaji: 'ho' },
    { japanese: 'ま', romaji: 'ma' }, { japanese: 'み', romaji: 'mi' }, { japanese: 'む', romaji: 'mu' },
    { japanese: 'め', romaji: 'me' }, { japanese: 'も', romaji: 'mo' }, { japanese: 'や', romaji: 'ya' },
    { japanese: 'ゆ', romaji: 'yu' }, { japanese: 'よ', romaji: 'yo' }, { japanese: 'ら', romaji: 'ra' },
    { japanese: 'り', romaji: 'ri' }, { japanese: 'る', romaji: 'ru' }, { japanese: 'れ', romaji: 're' },
    { japanese: 'ろ', romaji: 'ro' }, { japanese: 'わ', romaji: 'wa' }, { japanese: 'を', romaji: 'wo' },
    { japanese: 'ん', romaji: 'n' }
];

const KATAKANA = [
    { japanese: 'ア', romaji: 'a' }, { japanese: 'イ', romaji: 'i' }, { japanese: 'ウ', romaji: 'u' },
    { japanese: 'エ', romaji: 'e' }, { japanese: 'オ', romaji: 'o' }, { japanese: 'カ', romaji: 'ka' },
    { japanese: 'キ', romaji: 'ki' }, { japanese: 'ク', romaji: 'ku' }, { japanese: 'ケ', romaji: 'ke' },
    { japanese: 'コ', romaji: 'ko' }, { japanese: 'サ', romaji: 'sa' }, { japanese: 'シ', romaji: 'shi' },
    { japanese: 'ス', romaji: 'su' }, { japanese: 'セ', romaji: 'se' }, { japanese: 'ソ', romaji: 'so' },
    { japanese: 'タ', romaji: 'ta' }, { japanese: 'チ', romaji: 'chi' }, { japanese: 'ツ', romaji: 'tsu' },
    { japanese: 'テ', romaji: 'te' }, { japanese: 'ト', romaji: 'to' }, { japanese: 'ナ', romaji: 'na' },
    { japanese: 'ニ', romaji: 'ni' }, { japanese: 'ヌ', romaji: 'nu' }, { japanese: 'ネ', romaji: 'ne' },
    { japanese: 'ノ', romaji: 'no' }, { japanese: 'ハ', romaji: 'ha' }, { japanese: 'ヒ', romaji: 'hi' },
    { japanese: 'フ', romaji: 'fu' }, { japanese: 'ヘ', romaji: 'he' }, { japanese: 'ホ', romaji: 'ho' },
    { japanese: 'マ', romaji: 'ma' }, { japanese: 'ミ', romaji: 'mi' }, { japanese: 'ム', romaji: 'mu' },
    { japanese: 'メ', romaji: 'me' }, { japanese: 'モ', romaji: 'mo' }, { japanese: 'ヤ', romaji: 'ya' },
    { japanese: 'ユ', romaji: 'yu' }, { japanese: 'ヨ', romaji: 'yo' }, { japanese: 'ラ', romaji: 'ra' },
    { japanese: 'リ', romaji: 'ri' }, { japanese: 'ル', romaji: 'ru' }, { japanese: 'レ', romaji: 're' },
    { japanese: 'ロ', romaji: 'ro' }, { japanese: 'ワ', romaji: 'wa' }, { japanese: 'ヲ', romaji: 'wo' },
    { japanese: 'ン', romaji: 'n' }
];

const KANJI = [
    { japanese: '一', romaji: 'ichi', meaning: 'one' },
    { japanese: '二', romaji: 'ni', meaning: 'two' },
    { japanese: '三', romaji: 'san', meaning: 'three' },
    { japanese: '四', romaji: 'shi', meaning: 'four' },
    { japanese: '五', romaji: 'go', meaning: 'five' },
    { japanese: '六', romaji: 'roku', meaning: 'six' },
    { japanese: '七', romaji: 'shichi', meaning: 'seven' },
    { japanese: '八', romaji: 'hachi', meaning: 'eight' },
    { japanese: '九', romaji: 'kyuu', meaning: 'nine' },
    { japanese: '十', romaji: 'juu', meaning: 'ten' },
    { japanese: '人', romaji: 'hito', meaning: 'person' },
    { japanese: '日', romaji: 'hi', meaning: 'sun, day' },
    { japanese: '月', romaji: 'tsuki', meaning: 'moon, month' },
    { japanese: '火', romaji: 'hi', meaning: 'fire' },
    { japanese: '水', romaji: 'mizu', meaning: 'water' },
    { japanese: '木', romaji: 'ki', meaning: 'tree' },
    { japanese: '金', romaji: 'kane', meaning: 'money, gold' },
    { japanese: '土', romaji: 'tsuchi', meaning: 'earth' },
    { japanese: '山', romaji: 'yama', meaning: 'mountain' },
    { japanese: '川', romaji: 'kawa', meaning: 'river' }
];

const DAILY_PHRASES = [
    { japanese: 'おはようございます', romaji: 'ohayou gozaimasu', meaning: 'Good morning' },
    { japanese: 'こんにちは', romaji: 'konnichiwa', meaning: 'Hello/Good afternoon' },
    { japanese: 'こんばんは', romaji: 'konbanwa', meaning: 'Good evening' },
    { japanese: 'ありがとうございます', romaji: 'arigatou gozaimasu', meaning: 'Thank you' },
    { japanese: 'すみません', romaji: 'sumimasen', meaning: 'Excuse me/I\'m sorry' },
    { japanese: 'お願いします', romaji: 'onegaishimasu', meaning: 'Please' },
    { japanese: 'はい', romaji: 'hai', meaning: 'Yes' },
    { japanese: 'いいえ', romaji: 'iie', meaning: 'No' },
    { japanese: 'はじめまして', romaji: 'hajimemashite', meaning: 'Nice to meet you' },
    { japanese: 'さようなら', romaji: 'sayounara', meaning: 'Goodbye' }
];
