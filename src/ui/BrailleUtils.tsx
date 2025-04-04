
class Map<ValueType> {

    private readonly ob: Record<string, ValueType> = {};

    public put(key:string, value:ValueType) {
        this.ob[key] = value;
    }

    public getOrDefault(key:string, defValue:any):ValueType|any {
        return this.ob[key] ?? defValue;
    }

}

export class BrailleUtils {
    private static readonly brailleMap = new Map<string>();

    static {
        
        // Letras
        BrailleUtils.brailleMap.put("a", "⠁");
        BrailleUtils.brailleMap.put("b", "⠃");
        BrailleUtils.brailleMap.put("c", "⠉");
        BrailleUtils.brailleMap.put("d", "⠙");
        BrailleUtils.brailleMap.put("e", "⠑");
        BrailleUtils.brailleMap.put("f", "⠋");
        BrailleUtils.brailleMap.put("g", "⠛");
        BrailleUtils.brailleMap.put("h", "⠓");
        BrailleUtils.brailleMap.put("i", "⠊");
        BrailleUtils.brailleMap.put("j", "⠚");
        BrailleUtils.brailleMap.put("k", "⠅");
        BrailleUtils.brailleMap.put("l", "⠇");
        BrailleUtils.brailleMap.put("m", "⠍");
        BrailleUtils.brailleMap.put("n", "⠝");
        BrailleUtils.brailleMap.put("ñ", "⠻");
        BrailleUtils.brailleMap.put("o", "⠕");
        BrailleUtils.brailleMap.put("p", "⠏");
        BrailleUtils.brailleMap.put("q", "⠟");
        BrailleUtils.brailleMap.put("r", "⠗");
        BrailleUtils.brailleMap.put("s", "⠎");
        BrailleUtils.brailleMap.put("t", "⠞");
        BrailleUtils.brailleMap.put("u", "⠥");
        BrailleUtils.brailleMap.put("v", "⠧");
        BrailleUtils.brailleMap.put("w", "⠺");
        BrailleUtils.brailleMap.put("x", "⠭");
        BrailleUtils.brailleMap.put("y", "⠽");
        BrailleUtils.brailleMap.put("z", "⠵");

        // Indicador numérico
        BrailleUtils.brailleMap.put("#", "⠼");

        // Números
        BrailleUtils.brailleMap.put("1", "⠼⠁");
        BrailleUtils.brailleMap.put("2", "⠼⠃");
        BrailleUtils.brailleMap.put("3", "⠼⠉");
        BrailleUtils.brailleMap.put("4", "⠼⠙");
        BrailleUtils.brailleMap.put("5", "⠼⠑");
        BrailleUtils.brailleMap.put("6", "⠼⠋");
        BrailleUtils.brailleMap.put("7", "⠼⠛");
        BrailleUtils.brailleMap.put("8", "⠼⠓");
        BrailleUtils.brailleMap.put("9", "⠼⠊");
        BrailleUtils.brailleMap.put("0", "⠼⠚");

        // Puntuación
        BrailleUtils.brailleMap.put(",", "⠂");
        BrailleUtils.brailleMap.put(";", "⠆");
        BrailleUtils.brailleMap.put(":", "⠒");
        BrailleUtils.brailleMap.put(".", "⠲");
        BrailleUtils.brailleMap.put("?", "⠦");
        BrailleUtils.brailleMap.put("!", "⠖");
        BrailleUtils.brailleMap.put("'", "⠄");
        BrailleUtils.brailleMap.put("\"", "⠄⠶");
        BrailleUtils.brailleMap.put("(", "⠐⠣");
        BrailleUtils.brailleMap.put(")", "⠐⠜");
        BrailleUtils.brailleMap.put("/", "⠸⠌");
        BrailleUtils.brailleMap.put("\\", "⠸⠡");
        BrailleUtils.brailleMap.put("-", "⠤");
        BrailleUtils.brailleMap.put("–", "⠠⠤");
        BrailleUtils.brailleMap.put("—", "⠐⠠⠤");
    }

    public static convertText(text:string): string {

        let result = "";

        for (let i = 0; i < text.length; i++) {
            const textChar = text.charAt(i);
            result += BrailleUtils.brailleMap.getOrDefault(textChar, textChar);
        }

        return result;
    }

}
