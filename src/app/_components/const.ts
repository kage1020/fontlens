import { Font } from "@/app/_components/providers/font-options"

export const ASCII = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
export const SYMBOLS = "!@#$%^&*()_+-=[]{}|;':\",.<>?/`~"
export const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
export const MISTAKES = 'one -> 1\nsmall [él] -> l\nlarge [ái] -> I\npipe -> |\nzero -> 0\nsmall [óu] -> o\nlarge [óu] -> O'
export const LIGATURES = '-> ->> >- >>- ->- ->>- => =>> >= >>= =>= =>>= >>-> >>=> |-> |=> ~> ~~> --> /> //=> |> ||> |||>\n<- <<- -< -<< -<- -<<- <= <<= =< =<<= =<= =<<= <-<< <=<< <-| <=| <~ <~~ </ <=// <!-- <| <|| <|||\n<-> <=> <<=>> <> <~> </> <|>\n/\ \/ _|_\n== === -- --- != !== =~ !~ =/= /= ^= .= :- := =:= .= =!=\n|- ||- |= ||= -| -|| =| =|| |-|-| |--|--| |=|=| || /=/ // ///\n[] [| |] {. .} .. ... ::: <:< ..< ::< !! ?. ?? ++ &&\n## ###'
export const JAPANESE = '日本語のテキストサンプルです。これは、さまざまなフォントやスタイルをテストするために使用されます。'
export const KOREAN = '한국어 텍스트 샘플입니다. 다양한 글꼴과 스타일을 테스트하는 데 사용됩니다.'
export const CHINESE = '中文文本示例。用于测试各种字体和样式。'
export const ARABIC = 'نموذج نص باللغة العربية. يستخدم لاختبار خطوط وأنماط مختلفة.'
export const RUSSIAN = 'Пример текста на русском языке. Используется для тестирования различных шрифтов и стилей.'
export const THAI = 'ตัวอย่างข้อความภาษาไทย ใช้สำหรับทดสอบฟอนต์และสไตล์ต่างๆ'
export const ITALIAN = 'Esempio di testo in italiano. Utilizzato per testare vari caratteri e stili.'
export const FRENCH = 'Exemple de texte en français. Utilisé pour tester différentes polices et styles.'
export const SPANISH = 'Ejemplo de texto en español. Utilizado para probar diferentes fontes e estilos.'
export const GERMAN = 'Beispieltext auf Deutsch. Wird verwendet, um verschiedene Schriftarten und Stile zu testen.'
export const PORTUGUESE = 'Exemplo de texto em português. Usado para testar várias fontes e estilos.'
export const GREEK = 'Παράδειγμα κειμένου στα ελληνικά. Χρησιμοποιείται για τη δοκιμή διαφόρων γραμματοσειρών και στυλ.'
export const HEBREW = 'דוגמת טקסט בעברית. משמש לבדוק גופנים וסגנונות שונים.'
export const HINDI = 'हिंदी में पाठ का उदाहरण। विभिन्न फ़ॉन्ट और शैलियों का परीक्षण करने के लिए उपयोग किया जाता है.'
export const TEXTS = {
  programming: {
    ASCII,
    SYMBOLS,
    LOREM,
    MISTAKES,
    LIGATURES,
  },
  languages: {
    JAPANESE,
    KOREAN,
    CHINESE,
    ARABIC,
    RUSSIAN,
    THAI,
    ITALIAN,
    FRENCH,
    SPANISH,
    GERMAN,
    PORTUGUESE,
    GREEK,
    HEBREW,
    HINDI,
  }
}

export const DefaultFonts: Font[] = [
  {
    family: "Inter",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    italics: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    category: "sans-serif",
    hasLigature: true,
  },
  {
    family: "Roboto",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    italics: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    category: "sans-serif",
  },
  {
    family: "Noto Sans",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    italics: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    category: "sans-serif",
  },
  {
    family: "Noto Sans JP",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    italics: [],
    category: "sans-serif",
  },
]
